// Palabras para adivinar
const palabras = [
  'gato', 'perro', 'mesa', 'silla', 'libro', 'casa', 'jardin', 'flor', 'arbol', 'sol',
  'luna', 'agua', 'tierra', 'aire', 'fuego', 'cuchillo', 'tenedor', 'cuchara', 'plato',
  'taza', 'vaso', 'puerta', 'ventana', 'pared', 'techo', 'piso', 'zapato', 'calcetin',
  'pantalon', 'camisa', 'vestido', 'sombrero', 'bufanda', 'guantes', 'reloj', 'anillo',
  'collar', 'pulsera', 'cadena', 'llave', 'maleta', 'mochila', 'bolso', 'carro', 'bicicleta',
  'avion', 'barco', 'tren', 'autobus', 'taxi', 'helicoptero', 'pajaro', 'pez', 'leon',
  'tigre', 'oso', 'elefante', 'jirafa', 'ballena', 'delfin', 'tortuga', 'lagarto', 'serpiente',
  'abeja', 'mariposa', 'mosquito', 'hormiga', 'rana', 'conejo', 'raton', 'oso',
  'ardilla', 'ciervo', 'gallina', 'gallo', 'pato', 'cerdo', 'vaca', 'caballo', 'oveja',
  'camello', 'rinoceronte', 'hipopotamo', 'pinguino', 'gorila', 'koala', 'panda', 'mapache', 'zorro'
];



// Seleccionar una palabra al azar
let palabra = '';
let palabraOculta = '';

// Función para seleccionar una palabra al azar al inicio del juego
function seleccionarPalabra() {
    palabra = palabras[Math.floor(Math.random() * palabras.length)];
    // Mostrar solo una letra si la palabra tiene menos de 5 letras
    if (palabra.length < 5) {
        palabraOculta = palabra.charAt(0) + '_'.repeat(palabra.length - 1);
    } else {
        palabraOculta = palabra.substring(0, 3) + '_'.repeat(palabra.length - 3);
    }
    mostrarPalabra();
}

// Llamar a la función al inicio del juego
seleccionarPalabra();

// Función para mostrar la palabra oculta en la interfaz
function mostrarPalabra() {
    const wordContainer = document.getElementById('word-container');
    wordContainer.textContent = palabraOculta;
}

// Función para mostrar letras disponibles para adivinar
function mostrarLetras() {
    const lettersContainer = document.getElementById('letters-container');
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    for (let letra of alphabet) {
        const button = document.createElement('button');
        button.textContent = letra;
        button.setAttribute('data-letter', letra);
        button.addEventListener('click', () => {
            adivinarLetra(letra);
            button.disabled = true;
        });
        lettersContainer.appendChild(button);
    }
}

// Función para adivinar una letra
function adivinarLetra(letra) {
    let acierto = false;
    for (let i = 0; i < palabra.length; i++) {
        if (palabra[i] === letra) {
            palabraOculta = palabraOculta.substring(0, i) + letra + palabraOculta.substring(i + 1);
            acierto = true;
        }
    }
    if (!acierto) {
        // Manejar el dibujo del ahorcado
    }
    mostrarPalabra();
    verificarVictoria();
}

// agregamos un score
let score = document.querySelector('.score')
function verificarVictoria() {
    if (!palabraOculta.includes('_')) {
        score = score ++;
        


        reiniciarJuego();
    }
}

// Función para reiniciar el juego
function reiniciarJuego() {
    seleccionarPalabra();
    reiniciarBotones();
}

// Función para reiniciar los botones de letras
function reiniciarBotones() {
    const lettersContainer = document.getElementById('letters-container');
    lettersContainer.innerHTML = '';
    mostrarLetras();
}

// Función para manejar la entrada de teclado
function manejarEntradaTeclado(event) {
    const letra = event.key.toLowerCase();
    // Verificar si la tecla presionada es una letra
    if (letra >= 'a' && letra <= 'z') {
        adivinarLetra(letra);
        // Deshabilitar el botón correspondiente a la letra
        const button = document.querySelector(`#letters-container button[data-letter='${letra}']`);
        if (button) {
            button.disabled = true;
        }
    }
}

// Agregar evento de escucha para la entrada de teclado
document.addEventListener('keydown', manejarEntradaTeclado);

// Iniciar el juego al cargar la página
mostrarLetras();
