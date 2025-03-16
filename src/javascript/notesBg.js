// Array de íconos de notas musicales
const noteIcons = ['fa-music', 'fa-headphones', 'fa-guitar', 'fa-drum'];

// Almacenar posiciones para evitar superposiciones
const notePositions = [];

// Función para generar una posición aleatoria
function generateRandomPosition() {
    return {
        x: Math.random() * 100, // En porcentaje
        y: Math.random() * 100
    };
}

// Función para verificar colisiones
function checkCollision(newPos, size) {
    return notePositions.some(pos => {
        const distance = Math.sqrt(Math.pow(newPos.x - pos.x, 2) + Math.pow(newPos.y - pos.y, 2));
        return distance < size * 3; // Evita solapamiento (ajusta el 3 según el tamaño de las notas)
    });
}

// Función para crear notas musicales fijas
function createStaticMusicNotes(container, numNotes = 20) {
    for (let i = 0; i < numNotes; i++) {
        const note = document.createElement('span');
        note.classList.add('static-note');

        // Ícono aleatorio
        const randomIcon = noteIcons[Math.floor(Math.random() * noteIcons.length)];
        note.innerHTML = `<i class="fa ${randomIcon}"></i>`;

        // Posición aleatoria dentro del contenedor
        // const randomX = Math.random() * 100; // Porcentaje del ancho
        // const randomY = Math.random() * 100; // Porcentaje del alto
        // note.style.left = `${randomX}%`;
        // note.style.top = `${randomY}%`;

        // Tamaño aleatorio más grande
        const randomSize = 2 + Math.random() * 10;
        note.style.fontSize = `${randomSize}rem`;

        // Color aleatorio
        const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FFD700'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        note.style.color = randomColor;

        // Intentar encontrar una posición libre
        let newPos;
        let attempts = 0;
        do {
            newPos = generateRandomPosition();
            attempts++;
            if (attempts > 50) break; // Si no encuentra una posición en 50 intentos, usa la última generada
        } while (checkCollision(newPos, randomSize));

        // Aplicar la posición
        note.style.left = `${newPos.x}%`;
        note.style.top = `${newPos.y}%`;

        // Agregar la nota al contenedor
        container.appendChild(note);
        notePositions.push(newPos);
    }
}

// Iniciar la generación de notas fijas en la página de instrumentos
const instrumentsNotesContainer = document.querySelector('.fixed-notes');
createStaticMusicNotes(instrumentsNotesContainer, 15);