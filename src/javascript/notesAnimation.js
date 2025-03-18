// Array de íconos de notas musicales
const noteIconsAnim = ['fa-music', 'fa-headphones', 'fa-guitar', 'fa-drum'];

// Límite máximo de notas visibles al mismo tiempo
const MAX_NOTES = 40; 

// Contador de notas activas
let activeNotes = 0;

// Función para crear una nota musical
function createMusicNote(container) {
    const note = document.createElement('span');
    note.classList.add('music-note');

    // Ícono aleatorio
    const randomIcon = noteIconsAnim[Math.floor(Math.random() * noteIconsAnim.length)];
    note.innerHTML = `<i class="fa ${randomIcon}"></i>`;

    // Posición aleatoria dentro del contenedor
    const randomX = Math.random() * 100; // Porcentaje del ancho
    const randomY = Math.random() * 100; // Porcentaje del alto
    note.style.left = `${randomX}%`;
    note.style.top = `${randomY}%`;

    // Tamaño y duración aleatorios
    const randomSize = 1 + Math.random() * 1.5;
    const randomDuration = 2 + Math.random() * 3;
    note.style.fontSize = `${randomSize}rem`;
    note.style.animationDuration = `${randomDuration}s`;

    // Color aleatorio
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    note.style.color = randomColor;

    // Agregar la nota al contenedor
    container.appendChild(note);
    activeNotes++; // Incrementar el contador de notas activas

    // Eliminar la nota más antigua si se alcanza el límite
    if (activeNotes > MAX_NOTES) {
        const oldestNote = container.querySelector('.music-note'); // Selecciona la primera nota (la más antigua)
        if (oldestNote) {
            oldestNote.remove(); // Elimina la nota más antigua
            activeNotes--; // Reduce el contador de notas activas
        }
    }

    // Eliminar la nota después de la animación
    note.addEventListener('animationend', () => {
        note.remove();
    });
}

// Función para generar notas continuamente
function generateMusicNotes(container) {
    setInterval(() => {
        createMusicNote(container);
    }, 1500); // Generar una nota cada 500ms
}

// Iniciar la generación de notas en el fondo de la página
const backgroundNotesContainer = document.querySelector('.background-notes');
generateMusicNotes(backgroundNotesContainer);