class FerrisWheel {
    constructor(ctx, centerX, centerY, radius, cabinSize) {
        this.ctx = ctx;
        this.centerX = centerX;
        this.centerY = centerY;
        this.radius = radius;
        this.cabinSize = cabinSize;
        this.wheelAngle = 0;
        this.lastWheelAngle = 0;
        this.swayAmplitude = 0.4;
        this.rotationSpeed = 1.5;
        this.swayAngle = 0;
        this.swaySpeed = 2;

        this.gondolas = this.initializeGondolas();
    }

    // Initialize gondolas with colors and angles
    initializeGondolas() {
        const numberOfCabins = 8;
        const cabinColors = ["#FF0000", "#00FF00", "#0000FF", "#FFA500", "#FF00FF", "#00FFFF", "#8B4513", "#FFD700"];
        return cabinColors.map((color, i) => ({
            color,
            angle: (i * Math.PI * 2) / numberOfCabins,
            x: 0,
            y: 0
        }));
    }

    // Draw the entire Ferris wheel
    draw(interp) {
        this.drawBase();
        this.drawWheel(interp);
        this.drawCenterCircle();
    }

    // Draw the base structure
    drawBase() {
        this.ctx.save();
        this.ctx.strokeStyle = "#000";
        this.ctx.lineWidth = 8;

        // Base stilts
        this.drawStilts();

        // Base rectangle
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.rect(this.centerX - 100, this.centerY + this.radius + 20, 200, 10);
        this.ctx.fillStyle = "#d4af37";
        this.ctx.fill();
        this.ctx.stroke();

        this.ctx.restore();
    }

    // Draw stilts of the Ferris wheel
    drawStilts() {
        this.ctx.beginPath();
        this.ctx.moveTo(this.centerX - 50, this.centerY + this.radius + 20);
        this.ctx.lineTo(this.centerX, this.centerY);
        this.ctx.lineTo(this.centerX + 50, this.centerY + this.radius + 20);
        this.ctx.stroke();
    }

    // Draw the center circle with a face
    drawCenterCircle() {
        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.centerY, 20, 0, 2 * Math.PI);
        this.ctx.fillStyle = "#d4af37";
        this.ctx.fill();
        this.ctx.strokeStyle = "#000";
        this.ctx.stroke();

        this.drawFace();
    }

    // Draw a smiley face on the center of the Ferris wheel
    drawFace() {
        this.drawEyes();
        this.drawSmile();
    }

    drawEyes() {
        this.drawEye(this.centerX - 7, this.centerY - 5);  // Left eye
        this.drawEye(this.centerX + 7, this.centerY - 5);  // Right eye
    }

    drawEye(x, y) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, 2, 0, 2 * Math.PI);
        this.ctx.fillStyle = "#000";
        this.ctx.fill();
    }

    drawSmile() {
        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.centerY + 3, 7, 0, Math.PI, false);  // Smile (arc)
        this.ctx.strokeStyle = "#000";
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
    }

    // Draw the Ferris wheel's rotating structure
    drawWheel(interp) {
        this.ctx.save();
        this.ctx.translate(this.centerX, this.centerY);

        const interpolatedAngle = this.lastWheelAngle + (this.wheelAngle - this.lastWheelAngle) * interp;
        this.ctx.rotate(interpolatedAngle);

        this.drawOuterWheel();
        this.drawInnerCircles();
        this.drawSpokes();
        this.drawCabins();

        this.ctx.restore();
    }

    // Draw the outer circle of the Ferris wheel
    drawOuterWheel() {
        this.ctx.beginPath();
        this.ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        this.ctx.strokeStyle = "#333";
        this.ctx.lineWidth = 10;
        this.ctx.stroke();
    }

    // Draw the inner circles of the Ferris wheel
    drawInnerCircles() {
        const innerRadii = [this.radius * 0.75, this.radius * 0.5, this.radius * 0.25];
        this.ctx.lineWidth = 3;
        innerRadii.forEach(radius => {
            this.ctx.beginPath();
            this.ctx.arc(0, 0, radius, 0, Math.PI * 2);
            this.ctx.strokeStyle = "#333";
            this.ctx.stroke();
        });
    }

    // Draw the spokes of the Ferris wheel
    drawSpokes() {
        const numberOfSpokes = 8;
        for (let i = 0; i < numberOfSpokes; i++) {
            const angle = (i * Math.PI * 2) / numberOfSpokes;
            this.ctx.beginPath();
            this.ctx.moveTo(0, 0);
            this.ctx.lineTo(Math.cos(angle) * this.radius, Math.sin(angle) * this.radius);
            this.ctx.stroke();
        }
    }

    // Draw the gondolas and apply sway
    drawCabins() {
        this.gondolas.forEach((gondola, index) => {
            this.ctx.save();
            this.ctx.rotate(gondola.angle);
            this.ctx.translate(0, -this.radius);

            const baseAngle = (index * Math.PI * 2) / this.gondolas.length - Math.PI / 2;

            gondola.x = this.centerX + Math.cos(this.wheelAngle + baseAngle) * this.radius;
            gondola.y = this.centerY + Math.sin(this.wheelAngle + baseAngle) * this.radius;

            this.applySway(gondola);

            this.drawGondola(gondola);
            this.ctx.restore();
        });
    }

    updateCabins(delta) {
        this.swayAngle += this.swaySpeed * delta;
    }

    // Apply the swaying effect to the gondolas
    applySway(gondola) {
        this.ctx.rotate(-this.wheelAngle - gondola.angle);
        const sway = Math.sin(this.swayAngle) * this.swayAmplitude;
        this.ctx.rotate(sway);
    }

    // Draw an individual gondola
    drawGondola(gondola) {
        const cabinHeight = this.cabinSize;
        const cabinWidth = this.cabinSize * 0.75;

        // Draw the gondola triangle
        this.ctx.strokeStyle = "#d4af37";
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(cabinWidth / 2, cabinHeight / 2);
        this.ctx.lineTo(-cabinWidth / 2, cabinHeight / 2);
        this.ctx.lineTo(0, 0);
        this.ctx.stroke();

        // Draw the gondola color base
        this.ctx.beginPath();
        this.ctx.arc(0, cabinHeight / 2, cabinWidth / 2, 0, Math.PI);
        this.ctx.fillStyle = gondola.color;
        this.ctx.fill();
        this.ctx.strokeStyle = "#333";
        this.ctx.stroke();
    }

    // Rotate the Ferris wheel to the left
    rotateLeft(deltaTime) {
        this.lastWheelAngle = this.wheelAngle;
        this.wheelAngle -= this.rotationSpeed * deltaTime;
    }

    // Rotate the Ferris wheel to the right
    rotateRight(deltaTime) {
        this.lastWheelAngle = this.wheelAngle;
        this.wheelAngle += this.rotationSpeed * deltaTime;
    }
}