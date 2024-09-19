// DOM elements
const canvas = document.getElementById("ferrisCanvas");
const ctx = canvas.getContext("2d");
const startButton = document.getElementById('startButton');
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('score');
const liveFPSDisplay = document.getElementById('liveFPS');
const fpsSlider = document.getElementById('fpsSlider');
const fpsValue = document.getElementById('fpsValue');

// Game objects
const ferrisWheel = new FerrisWheel(ctx, canvas.width / 2, canvas.height / 2, 200, 40);
const cloud1 = new Cloud(ctx, -100, 100, 15, 1.5);
const cloud2 = new Cloud(ctx, canvas.width + 100, 200, -35, 0.8);
const cloud3 = new Cloud(ctx, canvas.width + 100, 300, 25, 1);
const leftGrassPatch = new GrassPatch(ctx, 0, 200, canvas.height - 70, 10, 7, 6, 5);
const rightGrassPatch = new GrassPatch(ctx, 410, 610, canvas.height - 70, 10, 7, 6, 5);

const passengerColors = ["#FF0000", "#00FF00", "#0000FF", "#FFA500", "#FF00FF", "#00FFFF", "#8B4513", "#FFD700"];
let passengers = [];

// Web worker setup for clouds
const cloudWorker = setupCloudWorker();

// Game state variables
let gameStarted = false; // Add this to track game state
let countdownTime = 30; // Initial countdown time
let lastTime = performance.now();
let accumulatedTime = 0;
const timeStep = 1000 / 60; // Fixed timeStep for physics
let lastRenderTime = 0;
let frameCount = 0;
let fps = 0;
let maxFps = 60; // We can change this to whatever we want. But visible FPS will cap at device refresh-rate.
let score = 0;

// Event listener for the FPS slider
fpsSlider.addEventListener('input', () => {
    maxFps = parseInt(fpsSlider.value);
    fpsValue.textContent = maxFps;
});

// Initialize slider
fpsSlider.value = maxFps;
fpsValue.textContent = maxFps;

// Key tracking
const isKeyDown = { left: false, right: false };
setupKeyboardListeners();

// Initialize passengers
initializePassengers(10);

// Start the FPS calculation
setInterval(() => {
    fps = frameCount;
    frameCount = 0;
}, 1000);

// Start button event listener
startButton.addEventListener('click', startGame);

// Function to start the game
function startGame() {
    if (!gameStarted) {
        gameStarted = true;

        // Reset the game state
        countdownTime = 30;
        score = 0;
        updateScore();
        updateTimer();

        // Start the cloud movement by initializing the worker
        cloudWorker.postMessage({
            action: "initialize",
            cloudsData: [
                { x: cloud1.x, speed: cloud1.speed },
                { x: cloud2.x, speed: cloud2.speed },
                { x: cloud3.x, speed: cloud3.speed }
            ]
        });

        // Start the main game loop (this will replace the pre-game render loop)
        requestAnimationFrame(mainLoop);
        startCountdown();
    }
}

// Function to start the countdown timer
function startCountdown() {
    const countdownInterval = setInterval(() => {
        if (countdownTime > 0) {
            countdownTime--;
            updateTimer();
        } else {
            clearInterval(countdownInterval);
            gameStarted = false;
            alert("Game Over! Your score: " + score);
        }
    }, 1000); // Every second
}

// Update timer display
function updateTimer() {
    timerDisplay.textContent = `Time: ${countdownTime}`;
}

// Update score display
function updateScore() {
    scoreDisplay.textContent = `Score: ${score}`;
}

// Start the game loop
function mainLoop(timestamp) {
    if (gameStarted) {
        const frameTime = timestamp - lastTime;
        lastTime = timestamp;
        accumulatedTime += frameTime;

        updatePhysicsLoop();
        renderLoop(timestamp);

        // Update the FPS display
        liveFPSDisplay.textContent = `Live FPS: ${fps}`;
        requestAnimationFrame(mainLoop);  // Keep the game loop running
    }
}

// Handle the physics update in a fixed timestep
function updatePhysicsLoop() {
    while (accumulatedTime >= timeStep) {
        delta = timeStep / 1000
        updatePhysics(delta);  // Update Ferris wheel and movement
        accumulatedTime -= timeStep;
    }
}

// Handle the rendering loop and throttle FPS
function renderLoop(timestamp) {
    if (timestamp >= lastRenderTime + (1000 / maxFps)) {
        const interp = accumulatedTime / timeStep;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawScene(interp);

        lastRenderTime = timestamp;
        frameCount++;  // Increment the frame count for FPS calculation
    }
}

// Draw all scene elements
function drawScene(interp) {
    // Cloud movement handled by web-worker
    cloud1.draw();
    cloud2.draw();
    cloud3.draw();

    // Static green gradient
    drawGrass();

    // Interpolation for moving elements
    leftGrassPatch.draw(interp);
    rightGrassPatch.draw(interp);
    ferrisWheel.draw(interp);

    // Draw passengers (keep drawing separate from updates)
    drawPassengers();
}

// Initialize passengers
function initializePassengers(count) {
    for (let i = 0; i < count; i++) {
        addPassenger(i);
    }
}

// Add a passenger with a random color
function addPassenger(i) {
    const randomColor = passengerColors[Math.floor(Math.random() * passengerColors.length)];
    const passenger = new Passenger(ctx, canvas.width / 2 + 40 * i, canvas.height - 90, randomColor);
    passengers.push(passenger);
}

// Update passengers
function updatePassengers(deltaTime) {
    passengers.forEach((passenger, index) => {
        passenger.update(deltaTime);

        ferrisWheel.gondolas.forEach((gondola) => {
            const distance = Math.sqrt(Math.pow(gondola.x - passenger.x, 2) + Math.pow(gondola.y - passenger.y, 2));
            if (distance < 20 && gondola.color === passenger.bodyColor && passenger.x < 340) {
                passengers.splice(index, 1);  // Remove the passenger
                score += 1;
                updateScore();

                // Move remaining passengers to the left
                passengers.forEach(p => p.move());

                // Add a new passenger to the end
                addPassenger(passengers.length);
            }
        });
    });
}

// Handle physics updates based on key input
function updatePhysics(deltaTime) {
    if (isKeyDown.left) {
        ferrisWheel.rotateLeft(deltaTime);
    } else if (isKeyDown.right) {
        ferrisWheel.rotateRight(deltaTime);
    }

    leftGrassPatch.update(deltaTime);
    rightGrassPatch.update(deltaTime);

    updatePassengers(deltaTime);
    ferrisWheel.updateCabins(deltaTime);

    cloudWorker.postMessage({
        action: "update",
        deltaTime: deltaTime,
        canvasWidth: canvas.width
    });
}

// Setup keyboard event listeners
function setupKeyboardListeners() {
    window.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") {
            isKeyDown.left = true;
        } else if (event.key === "ArrowRight") {
            isKeyDown.right = true;
        }
    });

    window.addEventListener("keyup", (event) => {
        if (event.key === "ArrowLeft") {
            isKeyDown.left = false;
        } else if (event.key === "ArrowRight") {
            isKeyDown.right = false;
        }
    });
}

// Setup the cloud worker and handle messages
function setupCloudWorker() {
    const worker = new Worker('worker.js');
    // Don't start cloud movement until the game starts
    worker.onmessage = function (e) {
        const updatedClouds = e.data;
        cloud1.setPosition(updatedClouds[0].x);
        cloud2.setPosition(updatedClouds[1].x);
        cloud3.setPosition(updatedClouds[2].x);
    };
    return worker;
}

// Pre-game rendering loop to show placeholder Ferris wheel
function preGameRenderLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    leftGrassPatch.draw(0);
    rightGrassPatch.draw(0);
    drawGrass();
    ferrisWheel.draw(0);
}

// Call the pre-game render loop immediately when the page loads
preGameRenderLoop();