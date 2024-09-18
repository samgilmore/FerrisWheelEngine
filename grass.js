class GrassBlade {
    constructor(ctx, x, stemLength, tipLength) {
        this.ctx = ctx;
        this.x = x;
        this.stemLength = stemLength;
        this.tipLength = tipLength;
    }

    draw(y, swayAmplitude, grassSwayAngle, interp) {
        // Interpolate the sway angle for smoother motion
        const interpolatedSwayAngle = grassSwayAngle + (interp * 0.05);

        // Sway the bottom part of the blade (stem)
        const swayStem = Math.sin(interpolatedSwayAngle + this.x * 0.1) * swayAmplitude;

        // Calculate the tip's sway based on the stem's sway
        const swayTip = Math.sin(interpolatedSwayAngle + this.x * 0.15) * swayAmplitude * 0.7;

        // Draw the stem
        const stemEndX = this.x + swayStem;
        const stemEndY = y - this.stemLength;
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, y);
        this.ctx.lineTo(stemEndX, stemEndY);
        this.ctx.stroke();

        // Draw the tip
        const tipEndX = stemEndX + swayTip;
        const tipEndY = stemEndY - this.tipLength;
        this.ctx.beginPath();
        this.ctx.moveTo(stemEndX, stemEndY);
        this.ctx.lineTo(tipEndX, tipEndY);
        this.ctx.stroke();
    }
}

class GrassPatch {
    constructor(ctx, xStart, xEnd, y, stemLength, tipLength, bladeSpacing, swayAmplitude) {
        this.ctx = ctx;
        this.y = y;
        this.swayAmplitude = swayAmplitude;
        this.grassSwayAngle = 0;
        this.blades = [];

        for (let i = xStart; i < xEnd; i += bladeSpacing) {
            const variableStemLength = stemLength + (Math.random() * 10 - 5);
            const variableTipLength = tipLength + (Math.random() * 5 - 2.5);
            this.blades.push(new GrassBlade(ctx, i, variableStemLength, variableTipLength));
        }
    }

    draw(interp) {
        this.ctx.strokeStyle = "#3f9b0b";
        this.ctx.lineWidth = 2;

        this.blades.forEach(blade => {
            blade.draw(this.y, this.swayAmplitude, this.grassSwayAngle, interp);
        });

        this.grassSwayAngle += 0.05;  // Increment the angle for animation
    }
}

// Function to draw the static grass gradient background
function drawGrass() {
    ctx.save();

    // Create a green gradient for the grass
    const grad = ctx.createLinearGradient(0, canvas.height - 70, 0, canvas.height);
    grad.addColorStop(0, "#3f9b0b");   // Light green at the top
    grad.addColorStop(1, "darkgreen"); // Dark green at the bottom

    ctx.fillStyle = grad;

    // Draw the rectangle that represents the grass
    ctx.beginPath();
    ctx.rect(0, canvas.height - 70, canvas.width, 70);
    ctx.fill();

    ctx.restore();
}