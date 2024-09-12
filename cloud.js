class Cloud {
    constructor(ctx, x, y, speed, sizeMultiplier = 1) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sizeMultiplier = sizeMultiplier;
    }

    draw() {
        const shadowOffset = 7;

        // Draw shadow
        this.ctx.fillStyle = "#D3D3D3";
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y + shadowOffset, 30 * this.sizeMultiplier, 0, Math.PI * 2);
        this.ctx.arc(this.x + 40 * this.sizeMultiplier, this.y + shadowOffset, 20 * this.sizeMultiplier, 0, Math.PI * 2);
        this.ctx.arc(this.x - 40 * this.sizeMultiplier, this.y + shadowOffset, 20 * this.sizeMultiplier, 0, Math.PI * 2);
        this.ctx.arc(this.x, this.y - 20 * this.sizeMultiplier + shadowOffset, 25 * this.sizeMultiplier, 0, Math.PI * 2);
        this.ctx.fill();

        // Draw white cloud
        this.ctx.fillStyle = "#ffffff";
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, 30 * this.sizeMultiplier, 0, Math.PI * 2);
        this.ctx.arc(this.x + 40 * this.sizeMultiplier, this.y, 20 * this.sizeMultiplier, 0, Math.PI * 2);
        this.ctx.arc(this.x - 40 * this.sizeMultiplier, this.y, 20 * this.sizeMultiplier, 0, Math.PI * 2);
        this.ctx.arc(this.x, this.y - 20 * this.sizeMultiplier, 25 * this.sizeMultiplier, 0, Math.PI * 2);
        this.ctx.fill();
    }

    update() {
        this.x += this.speed;
        if (this.x > canvas.width + 100) {
            this.x = -100;
        }

        if (this.x < -100) {
            this.x = canvas.width + 100;
        }
    }
}