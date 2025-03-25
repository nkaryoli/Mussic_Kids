const context = new AudioContext();

function jsNota(frecuencia) {
    const o = context.createOscillator();
    const g = context.createGain();

    o.connect(g);
    o.type = "triangle";
    o.frequency.value = frecuencia;
    g.connect(context.destination);
    o.start(0);
    g.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 1.5);
}

const keyToStringMap = {
    // G String
    "0": "string-g", "1": "string-g", "2": "string-g", "3": "string-g", "4": "string-g", 
    "5": "string-g", "6": "string-g", "7": "string-g", "8": "string-g", "9": "string-g",
    "Q": "string-g", "W": "string-g", "A": "string-g", "S": "string-g", "Z": "string-g", "X": "string-g",

    // D String
    "q": "string-d", "w": "string-d", "e": "string-d", "r": "string-d", "t": "string-d",
    "y": "string-d", "u": "string-d", "i": "string-d", "o": "string-d", "p": "string-d",
    "E": "string-d", "R": "string-d", "D": "string-d", "F": "string-d", "C": "string-d", "V": "string-d",

    // A String
    "a": "string-a", "s": "string-a", "d": "string-a", "f": "string-a", "g": "string-a",
    "h": "string-a", "j": "string-a", "k": "string-a", "l": "string-a", "+": "string-a",
    "T": "string-a", "Y": "string-a", "G": "string-a", "H": "string-a", "B": "string-a", "N": "string-a",

    // E String
    "z": "string-e", "x": "string-e", "c": "string-e", "v": "string-e", "b": "string-e",
    "n": "string-e", "m": "string-e", ",": "string-e", ".": "string-e", "-": "string-e",
    "U": "string-e", "I": "string-e", "O": "string-e", "J": "string-e", "K": "string-e", "L": "string-e"
};

function getFrequency(key) {
    const frequencies = {
        // G String
        "0": 103.8262, "1": 110.0000, "2": 116.5409, "3": 123.4708, "4": 130.8128, 
        "5": 138.5913, "6": 146.8324, "7": 155.5635, "8": 164.8138, "9": 174.6141,
        "Q": 184.9972, "W": 195.9977, "A": 207.6524, "S": 220.0000, "Z": 233.0819, "X": 246.9417,

        // D String
        "q": 77.7817, "w": 82.4069, "e": 87.3071, "r": 92.4986, "t": 97.9989,
        "y": 103.8262, "u": 110.0000, "i": 116.5409, "o": 123.4708, "p": 130.8128,
        "E": 138.5913, "R": 146.8324, "D": 155.5635, "F": 164.8138, "C": 174.6141, "V": 184.9972,

        // A String
        "a": 58.2705, "s": 61.7354, "d": 65.4064, "f": 69.2957, "g": 73.4162,
        "h": 77.7817, "j": 82.4069, "k": 87.3071, "l": 92.4986, "+": 97.9989,
        "T": 103.8262, "Y": 110.0000, "G": 116.5409, "H": 123.4708, "B": 130.8128, "N": 138.5913,

        // E String
        "z": 43.6536, "x": 46.2493, "c": 48.9995, "v": 51.9130, "b": 55.0000,
        "n": 58.2705, "m": 61.7354, ",": 65.4064, ".": 69.2957, "-": 73.4162,
        "U": 77.7817, "I": 82.4069, "O": 87.3071, "J": 92.4986, "K": 97.9989, "L": 103.8262
    };

    return frequencies[key] || 0;
}

document.addEventListener('keydown', function (event) {
    const stringClass = keyToStringMap[event.key];

    console.log(stringClass)
    if (stringClass) {
        jsNota(getFrequency(event.key));

        const stringElement = document.querySelector(`.${stringClass}`);

        if (stringElement) {
            stringElement.classList.add("shake");
            createNoteAnimation(stringElement);
            setTimeout(() => {
                stringElement.classList.remove("shake");
            }, 100);
        }
    }
});

function handleNoteClick(element, frecuencia) {
    jsNota(frecuencia);

    const stringElement = element.closest(".string-wrap").querySelector(".string");
    if (stringElement) {
        stringElement.classList.add("shake");
        createNoteAnimation(element);
        setTimeout(() => {
            stringElement.classList.remove("shake");
        }, 300);
    }
}

function createNoteAnimation(key) {
    const notes = ["♪", "♫", "♬", "♩"];
    const note = document.createElement("div");
    note.classList.add("floatNote");
    note.textContent = notes[Math.floor(Math.random() * notes.length)];

    const keyRect = key.getBoundingClientRect();
    const x = keyRect.left + keyRect.width / 2;
    const y = keyRect.top;

    note.style.left = `${x}px`;
    note.style.top = `${y}px`;

    note.style.color = getRandomColor();

    document.body.appendChild(note);

    setTimeout(() => {
        note.remove();
    }, 1000);
}

function getRandomColor() {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FFD700', '#8A2BE2'];
    return colors[Math.floor(Math.random() * colors.length)];
}