const context = new AudioContext();

function jsNota(frecuencia) {

    const o = context.createOscillator();

    g = context.createGain();

    o.connect(g);

    o.type = "triangle";
    o.frequency.value = frecuencia;
    g.connect(context.destination);
    o.start(0);
    g.gain.exponentialRampToValueAtTime(0.00010, context.currentTime + 1.5);
}

document.addEventListener('keydown', function (event) {
    switch (event.key) {
        case 'a':
            jsNota(174.614);
            break;
        case 'w':
            jsNota(184.997);
            break;
        case 's':
            jsNota(195.998);
            break;
        case 'e':
            jsNota(207.652);
            break;
        case 'd':
            jsNota(220.000);
            break;
        case 'r':
            jsNota(233.082);
            break;
        case 'f':
            jsNota(261.626);
            break;
        case 'g':
            jsNota(261.626);
            break;
        case 'y':
            jsNota(277.183);
            break;
        case 'h':
            jsNota(293.665);
            break;
        case 'u':
            jsNota(311.127);
            break;
        case 'j':
            jsNota(329.628);
            break;
    }
});

/* key Animation */

document.querySelectorAll(".piano__key").forEach(key => {
    key.addEventListener("click", (event) => {
        createNoteAnimation(event.target);
    });
});

function createNoteAnimation(key) {
    const notes = ["♪", "♫", "♬", "♩"]; // Diferentes símbolos de notas
    const note = document.createElement("div");
    note.classList.add("floatNote");
    note.textContent = notes[Math.floor(Math.random() * notes.length)];

    // Obtener la posición de la tecla presionada
    const keyRect = key.getBoundingClientRect();
    const x = keyRect.left + keyRect.width / 2; // Centrar en la tecla
    const y = keyRect.top; // Posicionar arriba de la tecla

    note.style.left = `${x}px`;
    note.style.top = `${y}px`;

    // Color aleatorio
    note.style.color = getRandomColor();

    document.body.appendChild(note);

    // Eliminar la nota después de la animación
    setTimeout(() => {
        note.remove();
    }, 1000);
}

function getRandomColor() {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FFD700', '#8A2BE2'];
    return colors[Math.floor(Math.random() * colors.length)];
}