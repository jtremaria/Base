// Niveles temáticos de los Llanos Venezolanos

class Level {
    constructor(levelNum) {
        this.levelNum = levelNum;
        this.platforms = [];
        this.spikes = [];
        this.springs = [];
        this.enemies = [];
        this.collectibles = [];
        this.checkpoints = [];
        this.door = null;
        this.playerStart = new Vector2(50, 500);
        this.skyColor = '#87ceeb';
        this.groundColor = '#d4a574';

        this.loadLevel(levelNum);
    }

    loadLevel(num) {
        switch (num) {
            case 1:
                this.createLevel1();
                break;
            case 2:
                this.createLevel2();
                break;
            case 3:
                this.createLevel3();
                break;
            default:
                this.createLevel1();
        }
    }

    createLevel1() {
        // Nivel 1: Introducción en la llanura
        this.skyColor = '#87ceeb';
        this.groundColor = '#d4a574';

        // Piso base
        this.platforms.push(new Platform(0, 580, 800, 20, '#8b6f47'));

        // Plataformas iniciales
        this.platforms.push(new Platform(50, 500, 120, 20, '#a0826d'));
        this.platforms.push(new Platform(200, 450, 80, 20, '#a0826d'));
        this.platforms.push(new Platform(320, 400, 100, 20, '#a0826d'));

        // Salto con spikes debajo
        this.spikes.push(new Spike(200, 470, 20, 20));
        this.spikes.push(new Spike(220, 470, 20, 20));

        // Sección de muro
        this.platforms.push(new Platform(500, 300, 30, 150, '#8b4513'));

        // Plataforma antes de la puerta
        this.platforms.push(new Platform(600, 450, 150, 20, '#a0826d'));

        // Puerta final
        this.door = new Door(700, 350, 40, 50);

        // Checkpoint
        this.checkpoints.push(new Checkpoint(400, 380, 30, 30));

        // Gemas
        this.collectibles.push(new GemCollectible(120, 470));
        this.collectibles.push(new GemCollectible(280, 410));
        this.collectibles.push(new GemCollectible(650, 430));
    }

    createLevel2() {
        // Nivel 2: Cruzando el río
        this.skyColor = '#87ceeb';
        this.groundColor = '#d4a574';

        // Plataforma inicial
        this.platforms.push(new Platform(0, 500, 100, 20, '#a0826d'));

        // Saltos sobre el "río"
        this.platforms.push(new Platform(140, 480, 60, 20, '#8b6f47'));
        this.platforms.push(new Platform(240, 450, 80, 20, '#8b6f47'));
        this.platforms.push(new Platform(360, 420, 70, 20, '#8b6f47'));

        // Spikes peligrosos
        for (let i = 0; i < 5; i++) {
            this.spikes.push(new Spike(200 + i * 30, 520, 20, 20));
        }

        // Plataformas más altas
        this.platforms.push(new Platform(500, 300, 100, 20, '#a0826d'));
        this.platforms.push(new Platform(650, 350, 90, 20, '#a0826d'));

        // Enemigos
        this.enemies.push(new Enemy(150, 440, 20, 20, 150));
        this.enemies.push(new Enemy(500, 270, 20, 20, 120));

        // Springs
        this.springs.push(new Spring(600, 380, 30, 15));

        // Checkpoint
        this.checkpoints.push(new Checkpoint(350, 400, 30, 30));

        // Door
        this.door = new Door(700, 400, 40, 50);

        // Gemas
        this.collectibles.push(new GemCollectible(200, 430));
        this.collectibles.push(new GemCollectible(380, 390));
        this.collectibles.push(new GemCollectible(700, 320));
    }

    createLevel3() {
        // Nivel 3: La montaña de los Llanos
        this.skyColor = '#ff9933';
        this.groundColor = '#d4a574';

        // Base
        this.platforms.push(new Platform(0, 550, 800, 50, '#8b6f47'));

        // Comienzo
        this.platforms.push(new Platform(50, 500, 80, 20, '#a0826d'));

        // Primera sección de escalada
        this.platforms.push(new Platform(150, 420, 30, 100, '#8b4513')); // Muro
        this.platforms.push(new Platform(200, 380, 80, 20, '#a0826d'));
        this.platforms.push(new Platform(320, 300, 30, 120, '#8b4513')); // Muro

        // Segunda sección
        this.platforms.push(new Platform(380, 270, 100, 20, '#a0826d'));
        this.platforms.push(new Platform(520, 200, 30, 100, '#8b4513')); // Muro

        // Sección final
        this.platforms.push(new Platform(600, 150, 100, 20, '#a0826d'));
        this.platforms.push(new Platform(750, 100, 50, 20, '#a0826d'));

        // Enemigos patrullando
        this.enemies.push(new Enemy(250, 350, 20, 20, 100));
        this.enemies.push(new Enemy(400, 250, 20, 20, 150));
        this.enemies.push(new Enemy(650, 120, 20, 20, 100));

        // Spikes
        for (let i = 0; i < 3; i++) {
            this.spikes.push(new Spike(210 + i * 25, 400, 20, 20));
        }

        // Springs para saltos largos
        this.springs.push(new Spring(450, 250, 30, 15));
        this.springs.push(new Spring(680, 180, 30, 15));

        // Checkpoints
        this.checkpoints.push(new Checkpoint(200, 360, 30, 30));
        this.checkpoints.push(new Checkpoint(520, 170, 30, 30));

        // Door final
        this.door = new Door(750, 50, 40, 50);

        // Gemas
        this.collectibles.push(new GemCollectible(150, 390));
        this.collectibles.push(new GemCollectible(380, 240));
        this.collectibles.push(new GemCollectible(650, 110));
        this.collectibles.push(new GemCollectible(760, 70));
    }

    update() {
        for (let platform of this.platforms) {
            platform.update();
        }
        for (let enemy of this.enemies) {
            enemy.update();
        }
        for (let collectible of this.collectibles) {
            collectible.update();
        }
        for (let checkpoint of this.checkpoints) {
            checkpoint.update();
        }
        if (this.door) {
            this.door.update();
        }
    }

    drawBackground(ctx) {
        // Cielo
        ctx.fillStyle = this.skyColor;
        ctx.fillRect(0, 0, 800, 600);

        // Nubes decorativas
        this.drawClouds(ctx);

        // Árboles de los Llanos (iconográfico)
        this.drawTrees(ctx);
    }

    drawClouds(ctx) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.beginPath();
        ctx.arc(100, 50, 30, 0, Math.PI * 2);
        ctx.arc(130, 40, 35, 0, Math.PI * 2);
        ctx.arc(160, 50, 30, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(600, 80, 25, 0, Math.PI * 2);
        ctx.arc(630, 70, 30, 0, Math.PI * 2);
        ctx.arc(660, 80, 25, 0, Math.PI * 2);
        ctx.fill();
    }

    drawTrees(ctx) {
        // Árbol 1 (izquierda)
        ctx.fillStyle = '#654321';
        ctx.fillRect(700, 300, 15, 280);

        ctx.fillStyle = '#228b22';
        ctx.beginPath();
        ctx.arc(707.5, 250, 40, 0, Math.PI * 2);
        ctx.fill();

        // Árbol 2 (derecha)
        ctx.fillStyle = '#654321';
        ctx.fillRect(50, 350, 12, 230);

        ctx.fillStyle = '#2d5a2d';
        ctx.beginPath();
        ctx.arc(56, 310, 35, 0, Math.PI * 2);
        ctx.fill();
    }

    draw(ctx) {
        this.drawBackground(ctx);

        // Plataformas
        for (let platform of this.platforms) {
            platform.draw(ctx);
        }

        // Spikes
        for (let spike of this.spikes) {
            spike.draw(ctx);
        }

        // Springs
        for (let spring of this.springs) {
            spring.draw(ctx);
        }

        // Enemigos
        for (let enemy of this.enemies) {
            enemy.draw(ctx);
        }

        // Gemas
        for (let collectible of this.collectibles) {
            collectible.draw(ctx);
        }

        // Checkpoints
        for (let checkpoint of this.checkpoints) {
            checkpoint.draw(ctx);
        }

        // Door
        if (this.door) {
            this.door.draw(ctx);
        }
    }
}
