/**
 * ES ÉPICO - Motor del Juego
 * Duelo de Versos estilo Monkey Island
 */

class Game {
    constructor() {
        // Estado del juego
        this.state = 'title'; // title, instructions, credits, character-select, battle, result, victory, defeat, complete
        this.player = null;
        this.currentOpponentIndex = 0;
        this.currentOpponent = null;

        // Puntuación de batalla
        this.playerWins = 0;
        this.enemyWins = 0;
        this.winsNeeded = 3;
        this.round = 1;

        // Verso actual
        this.currentVerse = null;
        this.usedVerses = [];
        this.lastResult = null;

        // Estadísticas
        this.totalBattlesWon = 0;
        this.totalRoundsWon = 0;
        this.totalRoundsLost = 0;

        // Referencias DOM
        this.screens = {};
        this.elements = {};

        this.init();
    }

    init() {
        // Cachear pantallas
        this.screens = {
            title: document.getElementById('title-screen'),
            instructions: document.getElementById('instructions-screen'),
            credits: document.getElementById('credits-screen'),
            characterSelect: document.getElementById('character-select'),
            battle: document.getElementById('battle-screen'),
            result: document.getElementById('round-result'),
            victory: document.getElementById('victory-screen'),
            defeat: document.getElementById('defeat-screen'),
            complete: document.getElementById('game-complete')
        };

        // Cachear elementos
        this.elements = {
            playerName: document.getElementById('player-name'),
            enemyName: document.getElementById('enemy-name'),
            playerHealth: document.getElementById('player-health'),
            enemyHealth: document.getElementById('enemy-health'),
            playerWins: document.getElementById('player-wins'),
            enemyWins: document.getElementById('enemy-wins'),
            playerSprite: document.getElementById('player-sprite'),
            enemySprite: document.getElementById('enemy-sprite'),
            playerTag: document.getElementById('player-tag'),
            enemyTag: document.getElementById('enemy-tag'),
            dialogueBox: document.getElementById('dialogue-box'),
            speakerName: document.getElementById('speaker-name'),
            dialogueText: document.getElementById('dialogue-text'),
            responseOptions: document.getElementById('response-options'),
            roundNumber: document.getElementById('round-number'),
            resultTitle: document.getElementById('result-title'),
            resultVerse: document.getElementById('result-verse'),
            resultResponse: document.getElementById('result-response'),
            resultMessage: document.getElementById('result-message'),
            victoryMessage: document.getElementById('victory-message'),
            victoryStats: document.getElementById('victory-stats'),
            defeatMessage: document.getElementById('defeat-message')
        };

        console.log('🎤 ES ÉPICO - Duelo de Versos inicializado');
    }

    // Navegación de pantallas
    showScreen(screenName) {
        // Ocultar todas las pantallas
        Object.values(this.screens).forEach(screen => {
            if (screen) screen.classList.remove('active');
        });

        // Mostrar la pantalla solicitada
        if (this.screens[screenName]) {
            this.screens[screenName].classList.add('active');
        }

        this.state = screenName;
    }

    // Menú principal
    backToTitle() {
        this.resetGame();
        this.showScreen('title');
    }

    showInstructions() {
        this.showScreen('instructions');
    }

    showCredits() {
        this.showScreen('credits');
    }

    // Iniciar nuevo juego
    startNewGame() {
        this.resetGame();
        this.showScreen('characterSelect');
    }

    resetGame() {
        this.currentOpponentIndex = 0;
        this.totalBattlesWon = 0;
        this.totalRoundsWon = 0;
        this.totalRoundsLost = 0;
        this.resetBattle();
    }

    resetBattle() {
        this.playerWins = 0;
        this.enemyWins = 0;
        this.round = 1;
        this.currentVerse = null;
        this.usedVerses = [];
        this.lastResult = null;
    }

    // Selección de personaje
    selectCharacter(characterId) {
        this.player = CHARACTERS[characterId];
        this.startBattle();
    }

    // Iniciar batalla
    startBattle() {
        this.resetBattle();

        // Obtener oponente actual
        const opponentId = OPPONENTS[this.currentOpponentIndex];
        this.currentOpponent = CHARACTERS[opponentId];

        if (!this.currentOpponent) {
            this.showGameComplete();
            return;
        }

        // Configurar UI
        this.updateBattleUI();
        this.showScreen('battle');

        // Mostrar introducción del oponente
        this.showIntro();
    }

    updateBattleUI() {
        // Nombres
        this.elements.playerName.textContent = this.player.name;
        this.elements.enemyName.textContent = this.currentOpponent.name;

        // Sprites
        this.elements.playerSprite.querySelector('.sprite').textContent = this.player.sprite;
        this.elements.enemySprite.querySelector('.sprite').textContent = this.currentOpponent.sprite;

        // Tags
        this.elements.playerTag.textContent = this.player.name;
        this.elements.enemyTag.textContent = this.currentOpponent.name;

        // Puntuación
        this.updateScore();

        // Ronda
        this.elements.roundNumber.textContent = `Ronda ${this.round}`;
    }

    updateScore() {
        this.elements.playerWins.textContent = `${this.playerWins}/${this.winsNeeded}`;
        this.elements.enemyWins.textContent = `${this.enemyWins}/${this.winsNeeded}`;

        // Actualizar barras de vida (visual)
        const playerHealthPercent = ((this.winsNeeded - this.enemyWins) / this.winsNeeded) * 100;
        const enemyHealthPercent = ((this.winsNeeded - this.playerWins) / this.winsNeeded) * 100;

        this.elements.playerHealth.style.width = `${playerHealthPercent}%`;
        this.elements.enemyHealth.style.width = `${enemyHealthPercent}%`;
    }

    // Mostrar introducción del oponente
    showIntro() {
        const opponentId = OPPONENTS[this.currentOpponentIndex];
        const introPhrase = getRandomPhrase(INTRO_PHRASES[opponentId]);

        this.setSpeaker(this.currentOpponent.name);
        this.setDialogue(introPhrase);
        this.setCharacterSpeaking('enemy');

        // Ocultar opciones mientras habla el oponente
        this.elements.responseOptions.innerHTML = '';

        // Después de un momento, iniciar el duelo
        setTimeout(() => {
            this.nextVerse();
        }, 2000);
    }

    // Obtener siguiente verso
    nextVerse() {
        const opponentId = OPPONENTS[this.currentOpponentIndex];
        const opponentVerses = VERSE_BATTLES[opponentId].verses;

        // Filtrar versos no usados
        const availableVerses = opponentVerses.filter(v => !this.usedVerses.includes(v.attack));

        if (availableVerses.length === 0) {
            // Si ya usamos todos, reiniciar
            this.usedVerses = [];
            this.currentVerse = opponentVerses[Math.floor(Math.random() * opponentVerses.length)];
        } else {
            this.currentVerse = availableVerses[Math.floor(Math.random() * availableVerses.length)];
        }

        this.usedVerses.push(this.currentVerse.attack);

        // Mostrar el verso del oponente
        this.showOpponentVerse();
    }

    showOpponentVerse() {
        this.setSpeaker(this.currentOpponent.name);
        this.setDialogue(`"${this.currentVerse.attack}"`);
        this.setCharacterSpeaking('enemy');

        // Mostrar opciones de respuesta después de un momento
        setTimeout(() => {
            this.showResponseOptions();
        }, 1500);
    }

    showResponseOptions() {
        this.setCharacterSpeaking(null);
        this.setSpeaker('TU RESPUESTA');
        this.setDialogue('Elige tu verso para contraatacar...');

        // Mezclar respuestas
        const responses = shuffleResponses(this.currentVerse);

        // Crear botones de respuesta
        this.elements.responseOptions.innerHTML = '';
        this.elements.responseOptions.classList.add('visible');

        responses.forEach(response => {
            const button = document.createElement('button');
            button.className = 'response-option';
            button.textContent = response;
            button.addEventListener('click', () => this.selectResponse(response));
            this.elements.responseOptions.appendChild(button);
        });
    }

    selectResponse(response) {
        // Deshabilitar más clics
        const buttons = this.elements.responseOptions.querySelectorAll('.response-option');
        buttons.forEach(btn => btn.disabled = true);

        // Mostrar la respuesta del jugador
        this.setSpeaker(this.player.name);
        this.setDialogue(`"${response}"`);
        this.setCharacterSpeaking('player');

        // Verificar si es correcta
        const isCorrect = isCorrectResponse(this.currentVerse, response);

        setTimeout(() => {
            this.resolveRound(isCorrect, response);
        }, 1500);
    }

    resolveRound(playerWon, response) {
        this.setCharacterSpeaking(null);

        if (playerWon) {
            this.playerWins++;
            this.totalRoundsWon++;

            // Animación de golpe al enemigo
            this.elements.enemySprite.querySelector('.sprite').parentElement.classList.add('hit');
            setTimeout(() => {
                this.elements.enemySprite.querySelector('.sprite').parentElement.classList.remove('hit');
            }, 500);

            this.lastResult = {
                won: true,
                verse: this.currentVerse.attack,
                response: response,
                message: getRandomPhrase(BATTLE_PHRASES.playerWin)
            };
        } else {
            this.enemyWins++;
            this.totalRoundsLost++;

            // Animación de golpe al jugador
            this.elements.playerSprite.querySelector('.sprite').parentElement.classList.add('hit');
            setTimeout(() => {
                this.elements.playerSprite.querySelector('.sprite').parentElement.classList.remove('hit');
            }, 500);

            this.lastResult = {
                won: false,
                verse: this.currentVerse.attack,
                response: response,
                correctResponse: this.currentVerse.correctResponse,
                message: getRandomPhrase(BATTLE_PHRASES.playerLose)
            };
        }

        this.updateScore();

        // Mostrar resultado
        setTimeout(() => {
            this.showRoundResult();
        }, 600);
    }

    showRoundResult() {
        // Configurar pantalla de resultado
        this.elements.resultTitle.textContent = this.lastResult.won ? '✓ ¡PUNTO PARA TI!' : '✗ PUNTO PARA EL RIVAL';
        this.elements.resultTitle.style.color = this.lastResult.won ? '#4ade80' : '#ff6b6b';

        this.elements.resultVerse.textContent = `"${this.lastResult.verse}"`;
        this.elements.resultResponse.textContent = `Tu respuesta: "${this.lastResult.response}"`;

        if (!this.lastResult.won) {
            this.elements.resultResponse.textContent += `\n\nLa respuesta correcta era:\n"${this.lastResult.correctResponse}"`;
        }

        this.elements.resultMessage.textContent = this.lastResult.message;

        this.showScreen('result');
    }

    continueAfterResult() {
        // Verificar si alguien ganó la batalla
        if (this.playerWins >= this.winsNeeded) {
            this.showBattleVictory();
            return;
        }

        if (this.enemyWins >= this.winsNeeded) {
            this.showBattleDefeat();
            return;
        }

        // Continuar con la siguiente ronda
        this.round++;
        this.elements.roundNumber.textContent = `Ronda ${this.round}`;
        this.showScreen('battle');
        this.nextVerse();
    }

    showBattleVictory() {
        this.totalBattlesWon++;

        this.elements.victoryMessage.textContent = getRandomPhrase(BATTLE_PHRASES.battleVictory);
        this.elements.victoryStats.textContent =
            `Ganaste ${this.playerWins}-${this.enemyWins} contra ${this.currentOpponent.name}`;

        this.showScreen('victory');
    }

    showBattleDefeat() {
        this.elements.defeatMessage.textContent = getRandomPhrase(BATTLE_PHRASES.battleDefeat);
        this.showScreen('defeat');
    }

    // Siguiente oponente
    nextOpponent() {
        this.currentOpponentIndex++;

        if (this.currentOpponentIndex >= OPPONENTS.length) {
            this.showGameComplete();
            return;
        }

        // Mostrar transición
        this.setSpeaker('NARRADOR');
        this.setDialogue(getRandomPhrase(TRANSITION_MESSAGES));
        this.showScreen('battle');

        setTimeout(() => {
            this.startBattle();
        }, 2000);
    }

    // Reintentar batalla
    retryBattle() {
        this.startBattle();
    }

    // Juego completado
    showGameComplete() {
        this.showScreen('complete');
    }

    // Utilidades de UI
    setSpeaker(name) {
        this.elements.speakerName.textContent = name;
    }

    setDialogue(text) {
        this.elements.dialogueText.textContent = text;
    }

    setCharacterSpeaking(who) {
        // Remover clase speaking de ambos
        const playerChar = this.elements.playerSprite.querySelector('.sprite').parentElement;
        const enemyChar = this.elements.enemySprite.querySelector('.sprite').parentElement;

        playerChar.classList.remove('speaking');
        enemyChar.classList.remove('speaking');

        // Añadir a quien corresponda
        if (who === 'player') {
            playerChar.classList.add('speaking');
        } else if (who === 'enemy') {
            enemyChar.classList.add('speaking');
        }
    }
}

// Instanciar juego global
const game = new Game();

// Mostrar pantalla de título al cargar
window.addEventListener('load', () => {
    game.showScreen('title');
    console.log('🎤 ¡ES ÉPICO! - Duelo de Versos cargado');
    console.log('Inspirado en Cancerbero ft. Tirone José González');
    console.log('Mecánica: The Secret of Monkey Island');
});
