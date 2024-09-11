class FerrisWheel {
    constructor(ctx, centerX, centerY, radius, cabinSize) {
        this.ctx = ctx;
        this.centerX = centerX;
        this.centerY = centerY;
        this.radius = radius;
        this.cabinSize = cabinSize;
        this.wheelAngle = 0;
        this.swayAmplitude = 0.4;
    }

    drawBase() {
        this.ctx.save();
        this.ctx.strokeStyle = "#000";
        this.ctx.lineWidth = 8;

        // Base Stilts
        this.ctx.beginPath();
        this.ctx.moveTo(this.centerX - 50, this.centerY + this.radius + 20);
        this.ctx.lineTo(this.centerX, this.centerY);
        this.ctx.lineTo(this.centerX + 50, this.centerY + this.radius + 20);
        this.ctx.stroke();

        // Base Rectangle
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.rect(this.centerX - 100, this.centerY + this.radius + 20, 200, 10);
        this.ctx.fillStyle = "#d4af37";
        this.ctx.fill();
        this.ctx.stroke();

        this.ctx.restore();
    }

    drawCircle() {
        // Center gold circle
        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.centerY, 20, 0, 2 * Math.PI);
        this.ctx.fillStyle = "#d4af37";
        this.ctx.fill();
        this.ctx.strokeStyle = "#000";
        this.ctx.stroke();

        // Draw the left eye
        this.ctx.beginPath();
        this.ctx.arc(this.centerX - 7, this.centerY - 5, 2, 0, 2 * Math.PI);  // Left eye
        this.ctx.fillStyle = "#000";  // Black color for eyes
        this.ctx.fill();

        // Draw the right eye
        this.ctx.beginPath();
        this.ctx.arc(this.centerX + 7, this.centerY - 5, 2, 0, 2 * Math.PI);  // Right eye
        this.ctx.fillStyle = "#000";  // Black color for eyes
        this.ctx.fill();

        // Draw the smile
        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.centerY + 3, 7, 0, Math.PI, false);  // Smile (arc)
        this.ctx.strokeStyle = "#000";  // Black color for the smile
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
    }

    drawWheel() {
        this.ctx.save();
        this.ctx.translate(this.centerX, this.centerY);
        this.ctx.rotate(this.wheelAngle);

        // Draw outer circles
        this.ctx.beginPath();
        this.ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        this.ctx.strokeStyle = "#333";
        this.ctx.lineWidth = 10;
        this.ctx.stroke();

        // Draw inner circles
        const innerRadii = [this.radius * 0.75, this.radius * 0.5, this.radius * 0.25];
        this.ctx.lineWidth = 3;
        innerRadii.forEach(radius => {
            this.ctx.beginPath();
            this.ctx.arc(0, 0, radius, 0, Math.PI * 2);
            this.ctx.strokeStyle = "#333";
            this.ctx.stroke();
        });

        // Draw spokes
        const numberOfSpokes = 8;
        for (let i = 0; i < numberOfSpokes; i++) {
            const angle = (i * Math.PI * 2) / numberOfSpokes;
            this.ctx.beginPath();
            this.ctx.moveTo(0, 0);
            this.ctx.lineTo(Math.cos(angle) * this.radius, Math.sin(angle) * this.radius);
            this.ctx.stroke();
        }

        this.drawCabins();
        this.ctx.restore();
    }

    drawCabins() {
        const numberOfCabins = 8;
        const cabinPositions = [];
        for (let i = 0; i < numberOfCabins; i++) {
            const angle = (i * Math.PI * 2) / numberOfCabins;
            cabinPositions.push({ angle });
        }

        const cabinColors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF8800", "#00FFFF", "#8800FF", "#FFFF88"];

        cabinPositions.forEach((pos, index) => {
            this.ctx.save();
            this.ctx.rotate(pos.angle);
            this.ctx.translate(0, -this.radius);

            // Keep cabins upright
            this.ctx.rotate(-this.wheelAngle - pos.angle);
            const sway = Math.sin(this.wheelAngle * 3) * this.swayAmplitude;
            this.ctx.rotate(sway);

            const cabinHeight = this.cabinSize;
            const cabinWidth = this.cabinSize * 0.75;

            // Draw the two lines forming the triangle
            this.ctx.strokeStyle = "#d4af37";
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.moveTo(0, 0);
            this.ctx.lineTo(cabinWidth / 2, cabinHeight / 2);
            this.ctx.stroke();

            this.ctx.beginPath();
            this.ctx.moveTo(0, 0);
            this.ctx.lineTo(-cabinWidth / 2, cabinHeight / 2);
            this.ctx.stroke();

            // Draw the semicircle at the base of the triangle
            this.ctx.beginPath();
            this.ctx.arc(0, cabinHeight / 2, cabinWidth / 2, 0, Math.PI);
            this.ctx.fillStyle = cabinColors[index];
            this.ctx.fill();
            this.ctx.strokeStyle = "#333";
            this.ctx.stroke();

            this.ctx.beginPath();
            this.ctx.moveTo(-cabinWidth / 2, cabinHeight / 2);
            this.ctx.lineTo(cabinWidth / 2, cabinHeight / 2);
            this.ctx.stroke();

            this.ctx.restore();
        });
    }

    update() {
        this.wheelAngle += 0.01;
    }

    draw() {
        this.drawBase();
        this.drawWheel();
        this.drawCircle();
        this.update();
    }
}