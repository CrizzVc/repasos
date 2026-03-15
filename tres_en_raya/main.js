let turno = "X";
let juegoActivo = true;
let narrador = document.getElementById("Narrador");
const celdas = document.querySelectorAll(".re1, .re2, .re3");

const combinaciones = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontales
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Verticales
    [0, 4, 8], [2, 4, 6]             // Diagonales
];


const botonReiniciar = document.getElementById("reiniciar");

botonReiniciar.addEventListener("click", function () {
    location.reload();
});


function verificarGanador() {
    for (let combo of combinaciones) {
        let [a, b, c] = combo;

        if (celdas[a].innerHTML !== "" &&
            celdas[a].innerHTML === celdas[b].innerHTML &&
            celdas[a].innerHTML === celdas[c].innerHTML) {
            celdas[a].style.backgroundColor = "#d4edda";
            celdas[b].style.backgroundColor = "#d4edda";
            celdas[c].style.backgroundColor = "#d4edda";

            celdas[a].style.color = "#000000";
            celdas[b].style.color = "#000000";
            celdas[c].style.color = "#000000";

            narrador.style.color = "#d4edda";

            narrador.innerHTML = "¡Felicidades! Ganó el jugador " + celdas[a].innerHTML;
            juegoActivo = false;
            botonReiniciar.style.opacity = "1";
            return;
        }
    }

    const todasLlenas = Array.from(celdas).every(celda => celda.innerHTML !== "");
    if (todasLlenas && juegoActivo) {
        narrador.innerHTML = "¡Es un empate!";
        juegoActivo = false;
        botonReiniciar.style.opacity = "1";
    }
}

celdas.forEach((celda) => {
    celda.addEventListener("click", function () {
        if (this.innerHTML === "" && juegoActivo) {
            this.innerHTML = `<div class="turno">${turno}</div>`;
            this.style.color = "#e0e0e0";
            this.classList.add("marcado");

            verificarGanador();

            turno = (turno === "X") ? "O" : "X";
            if (juegoActivo === true) {
                narrador.innerHTML = "Turno del jugador " + turno;
            }
        }
    });
});

