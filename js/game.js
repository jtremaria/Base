// Motor principal del juego

class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;

        this.player = null;
        this.level = null;
        this.currentLevelNum = 1;
        this.maxLevels = 3;

        this.gameState = 'menu'; // menu, playing, levelComplete, gameOver
        this.deaths = 0;
        this.gemsCollected = 0;

        // Input
        this.keys = {};
        this.setupInput();

        // Control de FPS
        this.fps = 60;
        this.frameTime = 1000 / this.fps;
        this.lastTime = 0;
    }

    setupInput() {
        document.addEventListener('keydown', (e) => {
            this.keys[e.key] = true;
            if (e.key === 'r' || e.key === 'R') {
                if (this.gameState === 'playing') {
                    this.resetLevel();
                }
            }
        });

        document.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
        });
    }

    startGame() {
        this.currentLevelNum = 1;
        this.deaths = 0;
        this.gemsCollected = 0;
        this.loadLevel(this.currentLevelNum);
        this.gameState = 'playing';
        this.hideMenus();
        this.gameLoop();
    }

    nextLevel() {
        this.currentLevelNum++;
        if (this.currentLevelNum > this.maxLevels) {
            this.showGameOver();
            return;
        }
        this.loadLevel(this.currentLevelNum);
        this.gameState = 'playing';
        this.hideMenus();
        this.gameLoop();
    }

    loadLevel(num) {
        this.level = new Level(num);
        this.player = new Player(
            this.level.playerStart.x,
            this.level.playerStart.y
        );

        // Callbacks para efectos de sonido (simulados)
        this.player.onDash = () => this.makeSound('dash');
        this.player.onJump = () => this.makeSound('jump');
    }

    resetLevel() {
        this.deaths++;
        this.loadLevel(this.currentLevelNum);
    }

    gameLoop() {
        const currentTime = Date.now();
        const elapsed = currentTime - this.lastTime;

        if (elapsed >= this.frameTime) {
            this.update();
            this.draw();
            this.lastTime = currentTime;
        }

        if (this.gameState === 'playing') {
            requestAnimationFrame(() => this.gameLoop());
        }
    }

    update() {
        if (this.gameState !== 'playing') return;

        // Input del jugador
        let moveInput = 0;
        if (this.keys['ArrowLeft'] || this.keys['a'] || this.keys['A']) moveInput = -1;
        if (this.keys['ArrowRight'] || this.keys['d'] || this.keys['D']) moveInput = 1;

        const jump = this.keys[' '] || this.keys['w'] || this.keys['W'];
        const dash = this.keys['z'] || this.keys['Z'] || this.keys['c'] || this.keys['C'];

        this.player.setInput(moveInput, jump, dash);

        // Actualizar física del juego
        const allSolids = [
            ...this.level.platforms,
            ...(this.level.door?.getBounds() ? [this.level.door] : [])
        ];

        this.player.update(allSolids, this.level.springs, this.level.checkpoints, this.level.enemies);
        this.level.update();

        // Coleccionar gemas
        for (let i = this.level.collectibles.length - 1; i >= 0; i--) {
            const gem = this.level.collectibles[i];
            if (!gem.collected && this.player.getBounds().intersects(gem.getBounds())) {
                gem.collected = true;
                this.gemsCollected++;
                this.makeSound('collect');
            }
        }

        // Activar checkpoints
        for (let checkpoint of this.level.checkpoints) {
            if (this.player.getBounds().intersects(checkpoint.getBounds())) {
                checkpoint.active = true;
                this.level.playerStart = new Vector2(checkpoint.x, checkpoint.y);
            }
        }

        // Abrir puerta
        if (this.level.door && this.player.getBounds().intersects(this.level.door.getBounds())) {
            this.level.door.open = true;
            setTimeout(() => {
                if (this.gameState === 'playing') {
                    this.gameState = 'levelComplete';
                    this.showLevelComplete();
                }
            }, 500);
        }

        // Mort del jugador
        if (!this.player.alive) {
            this.deaths++;
            this.loadLevel(this.currentLevelNum);
            this.makeSound('death');
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Dibujar nivel
        if (this.level) {
            this.level.draw(this.ctx);
        }

        // Dibujar jugador
        if (this.player) {
            this.player.draw(this.ctx);
        }

        // Dibujar dashes disponibles
        this.drawDashIndicator();
    }

    drawDashIndicator() {
        const ctx = this.ctx;
        ctx.fillStyle = this.player.dashes > 0 ? '#00ff00' : '#ff0000';

        for (let i = 0; i < this.player.maxDashes; i++) {
            const x = 20 + i * 30;
            const y = 520;
            if (i < this.player.dashes) {
                ctx.fillRect(x, y, 20, 20);
            } else {
                ctx.strokeStyle = this.player.color;
                ctx.lineWidth = 2;
                ctx.strokeRect(x, y, 20, 20);
            }
        }
    }

    makeSound(type) {
        // Los sonidos se simularían aquí
        // Por ahora solo registramos
        console.log('Sound:', type);
    }

    hideMenus() {
        document.getElementById('menu').classList.add('hidden');
        document.getElementById('levelComplete').classList.add('hidden');
        document.getElementById('gameOver').classList.add('hidden');
    }

    showLevelComplete() {
        const menu = document.getElementById('levelComplete');
        menu.classList.remove('hidden');
        document.getElementById('levelStats').textContent =
            `Nivel ${this.currentLevelNum} completado con ${this.deaths} muertes y ${this.gemsCollected} gemas.`;
    }

    showGameOver() {
        const menu = document.getElementById('gameOver');
        menu.classList.remove('hidden');
        document.getElementById('gameOverStats').textContent =
            `¡Completaste el juego! Total de muertes: ${this.deaths}, Gemas recogidas: ${this.gemsCollected}`;
    }

    backToMenu() {
        this.gameState = 'menu';
        this.hideMenus();
        document.getElementById('menu').classList.remove('hidden');
    }
}

// Instanciar juego global
const game = new Game();

// Mostrar menú inicial
window.addEventListener('load', () => {
    document.getElementById('menu').classList.remove('hidden');
});
