const canvas = document.getElementById("ferrisCanvas");
const ctx = canvas.getContext("2d");

// Instantiate FerrisWheel, Cloud, and GrassPatch objects
const ferrisWheel = new FerrisWheel(ctx, canvas.width / 2, canvas.height / 2, 200, 40);

const cloud1 = new Cloud(ctx, -100, 100, 0.3, 1.5);
const cloud2 = new Cloud(ctx, canvas.width + 100, 200, -0.7, 0.8);
const cloud3 = new Cloud(ctx, canvas.width + 100, 300, 0.5, 1);

const leftGrassPatch = new GrassPatch(ctx, 0, 200, canvas.height - 70, 10, 7, 6, 5);
const rightGrassPatch = new GrassPatch(ctx, 410, 610, canvas.height - 70, 10, 7, 6, 5);

// Animation loop
function drawScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawGrass();

    // Draw background and grass
    leftGrassPatch.draw();
    rightGrassPatch.draw();

    // Draw clouds
    cloud1.draw();
    cloud2.draw();
    cloud3.draw();

    // Draw the Ferris wheel
    ferrisWheel.draw();

    // Update cloud positions
    cloud1.update();
    cloud2.update();
    cloud3.update();

    requestAnimationFrame(drawScene);
}

// Start the animation loop
drawScene();