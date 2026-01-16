/**
 * ES ÉPICO - Base de datos de versos
 * Inspirado en la canción "Es Épico" de Cancerbero ft. Tirone José González
 * Sistema de duelo estilo Monkey Island
 */

// Personajes del juego
const CHARACTERS = {
    cancerbero: {
        name: 'CANCERBERO',
        fullName: 'Tirone González "Cancerbero"',
        sprite: '🎤',
        description: 'El poeta de las calles de Maracay',
        color: '#ffd700'
    },
    tirone: {
        name: 'TIRONE',
        fullName: 'Tirone José',
        sprite: '🎧',
        description: 'La voz del barrio',
        color: '#ff8c00'
    },
    poeta_callejero: {
        name: 'POETA CALLEJERO',
        fullName: 'El Poeta de la Esquina',
        sprite: '📝',
        description: 'Rimas desde el asfalto',
        color: '#9b59b6'
    },
    mc_barrio: {
        name: 'MC BARRIO',
        fullName: 'El MC del Barrio',
        sprite: '🔥',
        description: 'Flow directo de la calle',
        color: '#e74c3c'
    },
    lirico_urbano: {
        name: 'LÍRICO URBANO',
        fullName: 'El Lírico',
        sprite: '⚡',
        description: 'Versos que iluminan',
        color: '#3498db'
    },
    maestro_rimas: {
        name: 'MAESTRO',
        fullName: 'El Maestro de las Rimas',
        sprite: '👑',
        description: 'La leyenda viviente',
        color: '#f39c12'
    }
};

// Oponentes en orden de dificultad
const OPPONENTS = [
    'poeta_callejero',
    'mc_barrio',
    'lirico_urbano',
    'maestro_rimas'
];

/**
 * Sistema de versos estilo Monkey Island
 * Cada verso (attack) tiene UNA respuesta correcta (correctResponse)
 * El jugador debe aprender qué respuesta funciona contra cada verso
 */
const VERSE_BATTLES = {
    // Nivel 1: Poeta Callejero - Versos básicos
    poeta_callejero: {
        verses: [
            {
                attack: "Yo tengo más flow que agua en el río",
                correctResponse: "Pero el río sin lluvia se queda vacío",
                wrongResponses: [
                    "Tu flow es como charco, se seca al momento",
                    "El agua estancada huele a sufrimiento",
                    "Mi lírica es fuego, evapora tu frío"
                ]
            },
            {
                attack: "Mis rimas son balas, mi boca es un arma",
                correctResponse: "Pero sin puntería, no le das ni a tu cama",
                wrongResponses: [
                    "Las balas sin pólvora no causan alarma",
                    "Un arma oxidada ya no tiene fama",
                    "Tu boca dispara pero nadie se alarma"
                ]
            },
            {
                attack: "Soy el rey de esta calle, de esta esquina",
                correctResponse: "Un rey sin corona es pura pantomima",
                wrongResponses: [
                    "La calle no tiene dueño, camina",
                    "Tu reino es pequeño como una vitamina",
                    "Las esquinas cambian, nada se afina"
                ]
            },
            {
                attack: "Mi verbo es veneno para tu oído",
                correctResponse: "Pero ya tengo el antídoto, estoy prevenido",
                wrongResponses: [
                    "El veneno sin dosis es aburrido",
                    "Tu veneno está vencido y podrido",
                    "Mis oídos están sordos, no he sentido"
                ]
            },
            {
                attack: "Escupe fuego cuando agarro el micro",
                correctResponse: "Pero el fuego sin chispa es solo un pico",
                wrongResponses: [
                    "Tu fuego es de mentira, es un típico",
                    "El micro te quema porque eres chico",
                    "Escupes humo, no fuego, te lo explico"
                ]
            }
        ]
    },

    // Nivel 2: MC Barrio - Versos intermedios
    mc_barrio: {
        verses: [
            {
                attack: "Vengo del barrio donde la calle enseña",
                correctResponse: "Pero yo estudié en la vida, ella es mi dueña",
                wrongResponses: [
                    "La calle es dura pero no me empeña",
                    "Tu barrio es pequeño como una reseña",
                    "El que vive en la calle siempre sueña"
                ]
            },
            {
                attack: "Mi rap es medicina pa' los que sufren",
                correctResponse: "Pero una dosis muy alta hace que se hundan",
                wrongResponses: [
                    "Tu medicina es placebo, no funciona",
                    "Los que sufren de verdad no te perdonan",
                    "Mi rap es la cura que todo lo abunda"
                ]
            },
            {
                attack: "Yo rapeo por hambre, tú rapeas por fama",
                correctResponse: "El hambre de verdad no se sacia con drama",
                wrongResponses: [
                    "La fama es pasajera como la llama",
                    "Tu hambre es de ego, no de nada",
                    "Yo rapeo por amor, no por la grama"
                ]
            },
            {
                attack: "Soy profeta en mi tierra, escucha mi mensaje",
                correctResponse: "Pero profeta sin fe es solo un personaje",
                wrongResponses: [
                    "Tu mensaje está perdido en el paisaje",
                    "Los profetas de verdad no cobran peaje",
                    "Tu tierra es pequeña, cabe en un equipaje"
                ]
            },
            {
                attack: "Mi lírica es espada que corta tu ego",
                correctResponse: "Pero una espada sin filo solo es un juego",
                wrongResponses: [
                    "Tu espada está oxidada desde luego",
                    "El ego que cortas vuelve de nuevo",
                    "Mi escudo de rimas te deja ciego"
                ]
            },
            {
                attack: "Represento a los míos, a mi gente",
                correctResponse: "Pero representar sin acción es ser ausente",
                wrongResponses: [
                    "Tu gente no te sigue, eres diferente",
                    "Representas a nadie, eres transparente",
                    "Los míos son los que luchan frente a frente"
                ]
            }
        ]
    },

    // Nivel 3: Lírico Urbano - Versos avanzados
    lirico_urbano: {
        verses: [
            {
                attack: "Pensando en voz alta se piensa mejor",
                correctResponse: "Pero pensar sin actuar no quita el dolor",
                wrongResponses: [
                    "Pensar en silencio trae más valor",
                    "La voz alta asusta al opresor",
                    "Yo pienso en rimas con todo mi amor"
                ]
            },
            {
                attack: "Mi código de honor no bota la noticia",
                correctResponse: "Pero un código sin justicia es solo malicia",
                wrongResponses: [
                    "Tu código está roto, es una caricia",
                    "La noticia que botas es tu avaricia",
                    "El honor verdadero no necesita primicia"
                ]
            },
            {
                attack: "Yo soy el que escribe lo que otros no dicen",
                correctResponse: "Pero escribir sin leer hace que te deslicen",
                wrongResponses: [
                    "Los que no dicen nada te contradicen",
                    "Escribes fantasías que no predicen",
                    "Otros callan porque tú los maldicen"
                ]
            },
            {
                attack: "El arte es mi refugio, mi trinchera",
                correctResponse: "Pero refugiarse sin luchar es que te mueras",
                wrongResponses: [
                    "Tu trinchera es de papel, no es verdadera",
                    "El arte sin mensaje es una quimera",
                    "Mi refugio es la calle, ahí me espera"
                ]
            },
            {
                attack: "Mis palabras son semillas en el viento",
                correctResponse: "Pero semilla sin tierra es solo un cuento",
                wrongResponses: [
                    "El viento se las lleva en un momento",
                    "Tus semillas son promesas sin fundamento",
                    "Yo siembro en concreto, no en el viento"
                ]
            },
            {
                attack: "La música es el grito del que no tiene voz",
                correctResponse: "Pero gritar sin oídos te deja atroz",
                wrongResponses: [
                    "Tu grito es susurro, no tiene arroz",
                    "Los sin voz te escuchan con rapidez",
                    "La voz verdadera viene de Dios"
                ]
            },
            {
                attack: "Yo transformo el dolor en poesía",
                correctResponse: "Pero poesía sin verdad es hipocresía",
                wrongResponses: [
                    "Tu dolor es mentira, pura fantasía",
                    "La poesía del dolor es mi guía",
                    "Transformar sin sanar no es valentía"
                ]
            }
        ]
    },

    // Nivel 4: Maestro de las Rimas - Boss final
    maestro_rimas: {
        verses: [
            {
                attack: "El que no sepa replicar pierde su honor",
                correctResponse: "Pero el honor sin humildad es solo un error",
                wrongResponses: [
                    "Replicar sin sentido no da valor",
                    "Tu honor está manchado de rencor",
                    "Yo replico con arte y con amor"
                ]
            },
            {
                attack: "Es épico, lírico, único, el código",
                correctResponse: "Pero lo único sin comunidad es un prólogo",
                wrongResponses: [
                    "Tu código es antiguo como un monólogo",
                    "Lo épico se acaba, es un epílogo",
                    "Yo tengo mi propio catálogo"
                ]
            },
            {
                attack: "Yo rapeo por hambre de justicia verdadera",
                correctResponse: "Pero justicia sin paz es una hoguera",
                wrongResponses: [
                    "Tu justicia es selectiva y pasajera",
                    "El hambre de justicia no espera",
                    "Mi hambre es más grande, es primera"
                ]
            },
            {
                attack: "Mi voz es el eco de mil generaciones",
                correctResponse: "Pero un eco sin origen son solo ilusiones",
                wrongResponses: [
                    "Mil generaciones con mil contradicciones",
                    "Tu eco se pierde entre las canciones",
                    "Yo hablo por los que no tienen opciones"
                ]
            },
            {
                attack: "Soy hijo del asfalto, de la calle fría",
                correctResponse: "Pero hijo sin raíces pierde la vía",
                wrongResponses: [
                    "El asfalto caliente quema tu vía",
                    "La calle fría no te da alegría",
                    "Yo soy hijo del sol que sale cada día"
                ]
            },
            {
                attack: "Mi lengua es machete que corta la mentira",
                correctResponse: "Pero cortar sin sembrar solo conspira",
                wrongResponses: [
                    "Tu machete está oxidado y expira",
                    "La mentira que cortas te mira",
                    "Mi lengua es más filosa, te admira"
                ]
            },
            {
                attack: "El rap es mi religión, el beat mi templo",
                correctResponse: "Pero religión sin fe es mal ejemplo",
                wrongResponses: [
                    "Tu templo está vacío, es un ejemplo",
                    "La religión del rap no tiene tiempo",
                    "Mi fe es más grande, no la contemplo"
                ]
            },
            {
                attack: "Yo cargo las penas de todo un pueblo entero",
                correctResponse: "Pero cargar sin soltar te hace prisionero",
                wrongResponses: [
                    "Tu pueblo no te sigue, eres un cero",
                    "Las penas ajenas no dan dinero",
                    "Yo cargo las mías, soy más sincero"
                ]
            }
        ]
    }
};

// Frases de victoria y derrota
const BATTLE_PHRASES = {
    playerWin: [
        "¡Tu verso fue épico!",
        "¡Le diste donde más duele!",
        "¡Esa rima fue mortal!",
        "¡El público enloquece!",
        "¡Verso perfecto!"
    ],
    playerLose: [
        "Esa respuesta no funcionó...",
        "Tu oponente sonríe...",
        "El público abuchea...",
        "Necesitas otra estrategia...",
        "Eso no le hizo ni cosquillas..."
    ],
    battleVictory: [
        "¡Has demostrado tu dominio lírico!",
        "¡Victoria total en el escenario!",
        "¡Eres el nuevo campeón de los versos!",
        "¡Tu oponente se retira derrotado!"
    ],
    battleDefeat: [
        "La batalla fue dura, pero caíste...",
        "Tu oponente demostró ser superior...",
        "Esta vez no fue tu día...",
        "Vuelve cuando tengas mejores rimas..."
    ]
};

// Frases de introducción de batalla
const INTRO_PHRASES = {
    poeta_callejero: [
        "¡Otro que viene a perder el tiempo!",
        "Veamos qué tienes, novato...",
        "La calle me enseñó a destruir egos."
    ],
    mc_barrio: [
        "Del barrio vengo, al barrio defiendo.",
        "Mis rimas son forjadas en el asfalto.",
        "¿Crees que puedes con el MC del pueblo?"
    ],
    lirico_urbano: [
        "El arte de la palabra es mi espada.",
        "Bienvenido al verdadero lirismo.",
        "Aquí las rimas tienen peso real."
    ],
    maestro_rimas: [
        "Has llegado lejos, pero aquí terminas.",
        "Soy la prueba final, el último verso.",
        "Demuestra que mereces el título de campeón."
    ]
};

// Mensajes de transición entre oponentes
const TRANSITION_MESSAGES = [
    "Tu fama se extiende por las calles...",
    "Un nuevo retador aparece...",
    "La leyenda del MC crece...",
    "El siguiente oponente te espera..."
];

// Función para obtener un verso aleatorio de un oponente
function getRandomVerse(opponentId) {
    const opponent = VERSE_BATTLES[opponentId];
    if (!opponent) return null;

    const randomIndex = Math.floor(Math.random() * opponent.verses.length);
    return opponent.verses[randomIndex];
}

// Función para mezclar las respuestas (correcta + incorrectas)
function shuffleResponses(verse) {
    const allResponses = [verse.correctResponse, ...verse.wrongResponses];

    // Fisher-Yates shuffle
    for (let i = allResponses.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allResponses[i], allResponses[j]] = [allResponses[j], allResponses[i]];
    }

    return allResponses;
}

// Función para verificar si una respuesta es correcta
function isCorrectResponse(verse, response) {
    return verse.correctResponse === response;
}

// Función para obtener frase aleatoria
function getRandomPhrase(phraseArray) {
    return phraseArray[Math.floor(Math.random() * phraseArray.length)];
}

// Exportar para uso global
window.CHARACTERS = CHARACTERS;
window.OPPONENTS = OPPONENTS;
window.VERSE_BATTLES = VERSE_BATTLES;
window.BATTLE_PHRASES = BATTLE_PHRASES;
window.INTRO_PHRASES = INTRO_PHRASES;
window.TRANSITION_MESSAGES = TRANSITION_MESSAGES;
window.getRandomVerse = getRandomVerse;
window.shuffleResponses = shuffleResponses;
window.isCorrectResponse = isCorrectResponse;
window.getRandomPhrase = getRandomPhrase;
