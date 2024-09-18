class Passenger {
    constructor(ctx, x, y, bodyColor) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.bodyColor = bodyColor;
        this.targetX = x;
        this.speed = 2;
    }

    draw() {
        this.ctx.save();

        // Draw body (ellipse)
        this.ctx.beginPath();
        this.ctx.ellipse(this.x, this.y + 13, 7, 10, 0, 0, Math.PI * 2);
        this.ctx.fillStyle = this.bodyColor;
        this.ctx.fill();
        this.ctx.stroke();

        // Draw head (small ellipse)
        this.ctx.beginPath();
        this.ctx.ellipse(this.x, this.y + 2, 5, 5, 0, 0, Math.PI * 2);
        this.ctx.fillStyle = this.bodyColor;
        this.ctx.fill();
        this.ctx.stroke();

        this.ctx.restore();
    }

    move() {
        this.targetX -= 40;
    }

    update(deltaTime) {
        const movementSpeed = this.speed * deltaTime * 60;
        if (Math.abs(this.targetX - this.x) > 0.1) {
            this.x += (this.targetX - this.x) * 0.1 * movementSpeed;
        } else {
            this.x = this.targetX;
        }
    }
}

function drawPassengers() {
    passengers.forEach(passenger => {
        passenger.draw();
    });
}