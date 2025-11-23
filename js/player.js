// Lógica del jugador con mecánicas tipo Celeste

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 16;
        this.h = 24;

        // Física
        this.vel = new Vector2(0, 0);
        this.acc = new Vector2(0, 0.4); // Gravedad
        this.maxVelX = 6;
        this.maxVelY = 15;

        // Movimiento
        this.moveInput = 0;
        this.facing = 1; // 1 = derecha, -1 = izquierda

        // Salto
        this.canJump = false;
        this.jumpBuffer = 0;
        this.jumpBufferTime = 6; // Frames para presionar salto después de salir del suelo
        this.jumpForce = 10;
        this.isJumping = false;
        this.jumpHoldTime = 0;

        // Dash
        this.dashes = 2;
        this.maxDashes = 2;
        this.dashCooldown = 0;
        this.dashDuration = 10;
        this.dashDistance = 160;
        this.isDashing = false;
        this.dashDir = new Vector2(0, 0);

        // Escalada de pared
        this.onWall = false;
        this.wallSlideVel = 1;
        this.wallJumpForce = 10;

        // Estado
        this.lastPos = new Vector2(x, y);
        this.alive = true;
        this.animation = 0;
        this.color = '#ff6b6b';

        // Callbacks
        this.onDash = null;
        this.onJump = null;
    }

    getBounds() {
        return new Rectangle(this.x, this.y, this.w, this.h);
    }

    setInput(moveInput, jump, dash) {
        this.moveInput = moveInput;

        if (jump) {
            this.jumpBuffer = this.jumpBufferTime;
        }

        if (dash && this.dashes > 0 && !this.isDashing && this.dashCooldown <= 0) {
            this.performDash(new Vector2(moveInput, -1).normalize());
        }
    }

    update(solids, springs, checkpoints, enemies) {
        this.lastPos.x = this.x;
        this.lastPos.y = this.y;

        // Aplicar gravedad
        if (!this.isDashing) {
            this.vel.y = Math.min(this.vel.y + this.acc.y, this.maxVelY);
        }

        // Aplicar movimiento horizontal
        if (this.moveInput !== 0) {
            this.facing = Math.sign(this.moveInput);
        }
        this.vel.x = this.moveInput * this.maxVelX;

        // Actualizar posición
        this.x += this.vel.x;
        this.y += this.vel.y;

        // Colisiones
        this.onWall = false;
        this.canJump = false;

        for (let solid of solids) {
            const collision = resolveCollision(this, solid, this.lastPos);
            if (collision) {
                if (collision.side === 'top') {
                    this.canJump = true;
                    this.dashes = this.maxDashes; // Restaurar dashes al tocar suelo
                    this.jumpBuffer = 0;
                } else if (collision.side === 'bottom') {
                    this.vel.y = 0;
                } else if (collision.side === 'left' || collision.side === 'right') {
                    this.onWall = true;
                    if (this.vel.y > 0) {
                        this.vel.y = Math.min(this.vel.y, this.wallSlideVel);
                    }
                }
            }
        }

        // Salto con buffer
        if (this.jumpBuffer > 0) {
            this.jumpBuffer--;
            if (this.canJump || this.onWall) {
                this.jump();
            }
        }

        // Dash
        if (this.isDashing) {
            this.dashDuration--;
            if (this.dashDuration <= 0) {
                this.isDashing = false;
                this.dashCooldown = 5;
            }
        }

        if (this.dashCooldown > 0) {
            this.dashCooldown--;
        }

        // Springs
        for (let spring of springs) {
            if (this.getBounds().intersects(spring.getBounds())) {
                this.vel.y = -spring.bounceForce;
                this.canJump = false;
                this.dashes = this.maxDashes;
            }
        }

        // Colisiones con enemigos
        for (let enemy of enemies) {
            if (this.getBounds().intersects(enemy.getBounds())) {
                this.alive = false;
            }
        }

        // Actualización de animación
        this.animation += 0.1;

        // Límites del mundo
        if (this.y > 600) {
            this.alive = false;
        }

        // Límites laterales
        if (this.x < 0) this.x = 0;
        if (this.x + this.w > 800) this.x = 800 - this.w;
    }

    jump() {
        this.vel.y = -this.jumpForce;
        this.canJump = false;
        this.jumpBuffer = 0;
        this.isJumping = true;
        this.jumpHoldTime = 6;
        if (this.onWall && this.moveInput === 0) {
            this.vel.x = this.facing === 1 ? -this.wallJumpForce : this.wallJumpForce;
        }
        if (this.onDash) this.onDash();
    }

    performDash(dir) {
        this.isDashing = true;
        this.dashDuration = 10;
        const dashSpeed = this.dashDistance / this.dashDuration;
        this.dashDir = dir.magnitude() > 0 ? dir : new Vector2(this.facing, 0);
        this.vel = this.dashDir.mul(dashSpeed);
        this.dashes--;
        if (this.onJump) this.onJump();
    }

    draw(ctx) {
        if (!this.alive) return;

        ctx.save();

        // Cuerpo del jugador
        ctx.fillStyle = this.color;
        const bobbing = Math.sin(this.animation * 0.1) * 1;
        ctx.fillRect(this.x, this.y + bobbing, this.w, this.h);

        // Si está dashing, efecto visual
        if (this.isDashing) {
            ctx.fillStyle = 'rgba(255, 200, 100, 0.5)';
            ctx.fillRect(this.x - 10, this.y, this.w + 20, this.h);
        }

        // Ojos
        ctx.fillStyle = 'white';
        const eyeX1 = this.facing === 1 ? this.x + 4 : this.x + this.w - 8;
        const eyeX2 = this.facing === 1 ? this.x + 10 : this.x + this.w - 2;
        ctx.fillRect(eyeX1, this.y + 6, 4, 4);
        ctx.fillRect(eyeX2, this.y + 6, 4, 4);

        ctx.fillStyle = 'black';
        ctx.fillRect(eyeX1 + 1, this.y + 7, 2, 2);
        ctx.fillRect(eyeX2 + 1, this.y + 7, 2, 2);

        // Boca
        if (this.isDashing) {
            ctx.fillStyle = '#000';
            ctx.fillRect(this.x + 6, this.y + 16, 4, 2);
        }

        ctx.restore();
    }
}
