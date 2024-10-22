// Tablero
var bloque = 25;
var filas = 20;
var columnas = 20;

var tablero;
var contexto;

// Serpiente
var serpientex = bloque * 5;
var serpientey = bloque * 5;

var velocidadx = 0;
var velocidady = 0;

var serpienteCuerpo = [];

// Manzana
var manzanax;
var manzanay;

window.onload = function() {
    tablero = document.getElementById("tablero");
    tablero.height = filas * bloque;
    tablero.width = columnas * bloque;
    contexto = tablero.getContext("2d");

    manzana();
    document.addEventListener("keyup", cambiarDireccion);
    setInterval(update, 1000 / 10);
}

function update() {
    contexto.fillStyle = "#1c1e22"; // Color de fondo
    contexto.fillRect(0, 0, tablero.width, tablero.height);

    dibujarCuadricula(); // Dibuja la cuadrícula

    dibujarManzana(); // Dibuja la manzana

    if (serpientex === manzanax && serpientey === manzanay) {
        serpienteCuerpo.push([manzanax, manzanay]);
        manzana();
    }

    for (let i = serpienteCuerpo.length - 1; i > 0; i--) {
        serpienteCuerpo[i] = serpienteCuerpo[i - 1];
    }

    if (serpienteCuerpo.length) {
        serpienteCuerpo[0] = [serpientex, serpientey];
    }

    // Dibuja la serpiente con un estilo
    for (let i = 0; i < serpienteCuerpo.length; i++) {
        dibujarSegmento(serpienteCuerpo[i][0], serpienteCuerpo[i][1], i);
    }

    serpientex += velocidadx * bloque;
    serpientey += velocidady * bloque;
    dibujarCabeza(serpientex, serpientey); // Dibuja la cabeza de la serpiente

    // Fin del juego
    if (serpientex < 0 || serpientex >= columnas * bloque || serpientey < 0 || serpientey >= filas * bloque) {
        alert("Fin del juego.");
        resetGame();
    }

    for (let i = 0; i < serpienteCuerpo.length; i++) {
        if (serpientex === serpienteCuerpo[i][0] && serpientey === serpienteCuerpo[i][1]) {
            alert("Fin del juego.");
            resetGame();
        }
    }
}

function cambiarDireccion(e) {
    if (e.code === "ArrowUp" && velocidady !== 1) {
        velocidadx = 0;
        velocidady = -1;
    } else if (e.code === "ArrowDown" && velocidady !== -1) {
        velocidadx = 0;
        velocidady = 1;
    } else if (e.code === "ArrowLeft" && velocidadx !== 1) {
        velocidadx = -1;
        velocidady = 0;
    } else if (e.code === "ArrowRight" && velocidadx !== -1) {
        velocidadx = 1;
        velocidady = 0;
    }
}

function manzana() {
    manzanax = Math.floor(Math.random() * columnas) * bloque;
    manzanay = Math.floor(Math.random() * filas) * bloque;
}

function resetGame() {
    serpientex = bloque * 5;
    serpientey = bloque * 5;
    velocidadx = 0;
    velocidady = 0;
    serpienteCuerpo = [];
    manzana();
}

// Función para dibujar un segmento de la serpiente
function dibujarSegmento(x, y, index) {
    const gradiente = contexto.createLinearGradient(x, y, x + bloque, y + bloque);
    gradiente.addColorStop(0, "lime"); // Color para el inicio
    gradiente.addColorStop(1, "darkgreen"); // Color para el final

    contexto.fillStyle = gradiente;
    contexto.fillRect(x, y, bloque, bloque);
}

// Función para dibujar la cabeza de la serpiente con un ojo
function dibujarCabeza(x, y) {
    dibujarSegmento(x, y, serpienteCuerpo.length); // Dibuja el cuerpo de la cabeza

    // Dibuja el ojo
    contexto.fillStyle = "white";
    contexto.beginPath();
    contexto.arc(x + bloque / 2, y + bloque / 2, bloque / 4, 0, Math.PI * 2);
    contexto.fill();

    // Dibuja la pupila
    contexto.fillStyle = "black";
    contexto.beginPath();
    contexto.arc(x + bloque / 2, y + bloque / 2, bloque / 8, 0, Math.PI * 2);
    contexto.fill();
}

// Función para dibujar la manzana como un círculo
function dibujarManzana() {
    contexto.fillStyle = "red"; // Color de la manzana
    contexto.beginPath();
    contexto.arc(manzanax + bloque / 2, manzanay + bloque / 2, bloque / 2, 0, Math.PI * 2);
    contexto.fill();
}

// Función para dibujar la cuadrícula
function dibujarCuadricula() {
    contexto.strokeStyle = "rgba(255, 255, 255, 0.5)"; // Color de la cuadrícula
    contexto.lineWidth = 0.5;

    // Dibuja las líneas verticales
    for (let x = 0; x < tablero.width; x += bloque) {
        contexto.beginPath();
        contexto.moveTo(x, 0);
        contexto.lineTo(x, tablero.height);
        contexto.stroke();
    }

    // Dibuja las líneas horizontales
    for (let y = 0; y < tablero.height; y += bloque) {
        contexto.beginPath();
        contexto.moveTo(0, y);
        contexto.lineTo(tablero.width, y);
        contexto.stroke();
    }
}
