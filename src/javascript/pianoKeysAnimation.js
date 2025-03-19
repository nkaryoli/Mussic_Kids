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