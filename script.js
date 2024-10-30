// Variáveis de controle
let sessionLength = 25; // Duração da sessão em minutos
let breakLength = 5;    // Duração do intervalo em minutos
let timeLeft = sessionLength * 60; // Tempo restante em segundos
let isSession = true;   // Define se é tempo de sessão ou intervalo
let timer;              // Armazena o ID do setInterval para controle do temporizador
const titulo = document.querySelector("h1");


// Seletores de elementos do DOM
const contador = document.getElementById("contador");
const sessionLengthDisplay = document.getElementById("session-length");
const breakLengthDisplay = document.getElementById("break-length");
const startButton = document.querySelector(".botao");
const resetButton = document.querySelectorAll(".botao")[1]; // segundo botão é o reset

// Atualiza o visor com o tempo formatado
function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    contador.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Inicializa o visor com o tempo da sessão
updateDisplay();

// Função para iniciar/pausar o temporizador
function startTimer() {
    if (timer) {
        clearInterval(timer);
        timer = null;
        startButton.textContent = "Iniciar";
    } else {
        timer = setInterval(() => {
            timeLeft--;
            updateDisplay();

            if (timeLeft < 0) {
                if (isSession) {
                    // Quando a sessão termina, muda o título para "Intervalo"
                    isSession = false;
                    titulo.textContent = "Intervalo";
                    timeLeft = breakLength * 60;
                } else {
                    // Quando o intervalo termina, volta o título para "Temporizador" e pausa
                    clearInterval(timer);
                    timer = null;
                    isSession = true;
                    titulo.textContent = "Temporizador";
                    timeLeft = sessionLength * 60; // Reseta para o valor inicial da sessão
                    updateDisplay();
                    startButton.textContent = "Iniciar";
                    return;
                }
            }
        }, 1000);
        startButton.textContent = "Pausar";
    }
}

// Função para resetar o temporizador
function resetTimer() {
    clearInterval(timer);
    timer = null;
    isSession = true;
    timeLeft = sessionLength * 60;
    updateDisplay();
    startButton.textContent = "Iniciar";
}

// Funções para incrementar e decrementar a duração do intervalo e sessão
function incrementBreak() {
    breakLength++;
    breakLengthDisplay.textContent = breakLength;
}

function decrementBreak() {
    if (breakLength > 1) {
        breakLength--;
        breakLengthDisplay.textContent = breakLength;
    }
}

function incrementSession() {
    sessionLength++;
    sessionLengthDisplay.textContent = sessionLength;
    if (isSession) {
        timeLeft = sessionLength * 60;
        updateDisplay();
    }
}

function decrementSession() {
    if (sessionLength > 1) {
        sessionLength--;
        sessionLengthDisplay.textContent = sessionLength;
        if (isSession) {
            timeLeft = sessionLength * 60;
            updateDisplay();
        }
    }
}

// Event listeners para os botões de incremento e decremento
document.querySelectorAll('.increment').forEach(button => {
    button.addEventListener('click', (event) => {
        if (event.target.parentNode.nextElementSibling.textContent === "Intervalo") {
            incrementBreak();
        } else {
            incrementSession();
        }
    });
});

document.querySelectorAll('.decrement').forEach(button => {
    button.addEventListener('click', (event) => {
        if (event.target.parentNode.nextElementSibling.textContent === "Intervalo") {
            decrementBreak();
        } else {
            decrementSession();
        }
    });
});

// Event listeners para os botões de iniciar e resetar
startButton.addEventListener("click", startTimer);
resetButton.addEventListener("click", resetTimer);

// Listener de teclado para controle do intervalo e sessão
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case '+': // Tecla "+" para aumentar o intervalo
            incrementBreak();
            break;
        case '-': // Tecla "-" para diminuir o intervalo
            decrementBreak();
            break;
        case 'ArrowUp': // Seta para cima para aumentar a sessão
            incrementSession();
            break;
        case 'ArrowDown': // Seta para baixo para diminuir a sessão
            decrementSession();
            break;
    }
});
