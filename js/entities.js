// Entidades del juego: plataformas, enemigos, obstáculos

class Platform {
    constructor(x, y, w, h, color = '#8b4513') {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
        this.moving = false;
        this.moveDir = 0;
        this.moveSpeed = 2;
        this.moveRange = 0;
    }

    getBounds() {
        return new Rectangle(this.x, this.y, this.w, this.h);
    }

    update() {
        if (this.moving && this.moveRange > 0) {
            this.x += this.moveDir * this.moveSpeed;
            this.moveRange -= this.moveSpeed;
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);

        // Patrón de textura
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        for (let i = 0; i < this.w; i += 10) {
            ctx.fillRect(this.x + i, this.y, 5, this.h);
        }
    }
}

class Spike {
    constructor(x, y, w = 20, h = 20) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = '#e74c3c';
    }

    getBounds() {
        return new Rectangle(this.x, this.y, this.w, this.h);
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.x + this.w / 2, this.y);
        ctx.lineTo(this.x + this.w, this.y + this.h);
        ctx.lineTo(this.x, this.y + this.h);
        ctx.closePath();
        ctx.fill();
    }
}

class Spring {
    constructor(x, y, w = 30, h = 15) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.active = false;
        this.bounceForce = 15;
    }

    getBounds() {
        return new Rectangle(this.x, this.y, this.w, this.h);
    }

    draw(ctx) {
        ctx.fillStyle = '#ffd700';
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.strokeStyle = '#ff8c00';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x + 2, this.y + 2, this.w - 4, this.h - 4);
    }
}

class Enemy {
    constructor(x, y, w = 20, h = 20, patrolRange = 100) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.patrolRange = patrolRange;
        this.startX = x;
        this.direction = 1;
        this.speed = 1.5;
        this.color = '#8b0000';
    }

    getBounds() {
        return new Rectangle(this.x, this.y, this.w, this.h);
    }

    update() {
        this.x += this.direction * this.speed;

        // Cambiar dirección si alcanza el rango de patrulla
        if (Math.abs(this.x - this.startX) >= this.patrolRange) {
            this.direction *= -1;
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);

        // Ojos
        ctx.fillStyle = 'white';
        ctx.fillRect(this.x + 3, this.y + 3, 5, 5);
        ctx.fillRect(this.x + this.w - 8, this.y + 3, 5, 5);

        ctx.fillStyle = 'black';
        ctx.fillRect(this.x + 4, this.y + 4, 3, 3);
        ctx.fillRect(this.x + this.w - 7, this.y + 4, 3, 3);
    }
}

class GemCollectible {
    constructor(x, y, w = 15, h = 15) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.collected = false;
        this.rotation = 0;
        this.bobOffset = 0;
        this.bobSpeed = 0.1;
    }

    getBounds() {
        return new Rectangle(this.x, this.y - this.bobOffset, this.w, this.h);
    }

    update() {
        if (!this.collected) {
            this.rotation += 0.05;
            this.bobOffset = Math.sin(this.rotation * 2) * 3;
        }
    }

    draw(ctx) {
        if (this.collected) return;

        ctx.save();
        ctx.translate(this.x + this.w / 2, this.y - this.bobOffset + this.h / 2);
        ctx.rotate(this.rotation);

        // Dibuja una gema
        ctx.fillStyle = '#00ff00';
        ctx.beginPath();
        ctx.moveTo(0, -this.h / 2);
        ctx.lineTo(this.w / 2, 0);
        ctx.lineTo(0, this.h / 2);
        ctx.lineTo(-this.w / 2, 0);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = '#00cc00';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.restore();
    }
}

class Checkpoint {
    constructor(x, y, w = 30, h = 30) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.active = false;
        this.animation = 0;
    }

    getBounds() {
        return new Rectangle(this.x, this.y, this.w, this.h);
    }

    update() {
        if (this.active) {
            this.animation += 0.05;
        }
    }

    draw(ctx) {
        // Base
        ctx.fillStyle = this.active ? '#00ff00' : '#cccccc';
        ctx.fillRect(this.x, this.y + this.h * 0.6, this.w, this.h * 0.4);

        // Poste
        ctx.fillStyle = this.active ? '#00cc00' : '#999999';
        ctx.fillRect(this.x + this.w * 0.4, this.y, this.w * 0.2, this.h * 0.6);

        // Bandera
        if (this.active) {
            ctx.fillStyle = '#ff6b6b';
            ctx.beginPath();
            const wave = Math.sin(this.animation) * 5;
            ctx.moveTo(this.x + this.w * 0.6, this.y + 5);
            ctx.lineTo(this.x + this.w * 0.6 + 15 + wave, this.y + 5);
            ctx.lineTo(this.x + this.w * 0.6 + 15 + wave, this.y + 15);
            ctx.closePath();
            ctx.fill();
        }
    }
}

class Door {
    constructor(x, y, w = 40, h = 50) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.open = false;
        this.animation = 0;
    }

    getBounds() {
        if (this.open) return null;
        return new Rectangle(this.x, this.y, this.w, this.h);
    }

    update() {
        if (this.open) {
            this.animation = Math.min(this.animation + 0.05, 1);
        }
    }

    draw(ctx) {
        ctx.fillStyle = '#8b4513';
        ctx.fillRect(this.x, this.y, this.w, this.h * (1 - this.animation));

        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y, this.w, this.h);

        if (!this.open) {
            ctx.fillStyle = '#ffd700';
            ctx.beginPath();
            ctx.arc(this.x + this.w - 8, this.y + this.h / 2, 3, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}
