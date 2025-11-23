// Utilidades generales del juego

class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    add(v) {
        return new Vector2(this.x + v.x, this.y + v.y);
    }

    sub(v) {
        return new Vector2(this.x - v.x, this.y - v.y);
    }

    mul(n) {
        return new Vector2(this.x * n, this.y * n);
    }

    dot(v) {
        return this.x * v.x + this.y * v.y;
    }

    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize() {
        const mag = this.magnitude();
        if (mag === 0) return new Vector2(0, 0);
        return new Vector2(this.x / mag, this.y / mag);
    }

    clone() {
        return new Vector2(this.x, this.y);
    }
}

class Rectangle {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    intersects(rect) {
        return this.x < rect.x + rect.w &&
               this.x + this.w > rect.x &&
               this.y < rect.y + rect.h &&
               this.y + this.h > rect.y;
    }

    contains(x, y) {
        return x >= this.x && x < this.x + this.w &&
               y >= this.y && y < this.y + this.h;
    }

    getOverlap(rect) {
        if (!this.intersects(rect)) return null;

        const left = Math.max(this.x, rect.x);
        const right = Math.min(this.x + this.w, rect.x + rect.w);
        const top = Math.max(this.y, rect.y);
        const bottom = Math.min(this.y + this.h, rect.y + rect.h);

        return {
            x: left,
            y: top,
            w: right - left,
            h: bottom - top
        };
    }
}

// Detección de colisiones con respuesta
function resolveCollision(mover, solid, lastPos) {
    const overlap = mover.getBounds().getOverlap(solid.getBounds());
    if (!overlap) return false;

    // Determinar lado de colisión basado en última posición
    const prevBounds = new Rectangle(lastPos.x, lastPos.y, mover.w, mover.h);

    // Diferencia de penetración en cada eje
    const dx = (mover.x + mover.w / 2) - (solid.x + solid.w / 2);
    const dy = (mover.y + mover.h / 2) - (solid.y + solid.h / 2);

    const overlapX = overlap.w;
    const overlapY = overlap.h;

    if (overlapX < overlapY) {
        // Colisión horizontal
        if (dx > 0) {
            mover.x = solid.x + solid.w; // Derecha
            mover.vel.x = 0;
            return { side: 'right' };
        } else {
            mover.x = solid.x - mover.w; // Izquierda
            mover.vel.x = 0;
            return { side: 'left' };
        }
    } else {
        // Colisión vertical
        if (dy > 0) {
            mover.y = solid.y + solid.h; // Abajo
            mover.vel.y = 0;
            return { side: 'bottom' };
        } else {
            mover.y = solid.y - mover.h; // Arriba
            if (mover.vel.y > 0) mover.vel.y = 0;
            return { side: 'top' };
        }
    }
}
