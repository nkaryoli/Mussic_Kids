const context = new AudioContext();

function jsNota(frecuencia) {

    const o = context.createOscillator();

    const g = context.createGain();

    o.connect(g);

    o.type = "triangle";
    o.frequency.value = frecuencia;
    g.connect(context.destination);
    o.start(0);
    g.gain.exponentialRampToValueAtTime(0.00010, context.currentTime + 1.5);
}

const keyToPianoKey = {
        // Black keys
        "1": "piano__key--black-1", "2": "piano__key--black-2", "3": "piano__key--black-3", "4": "piano__key--black-4", "5": "piano__key--black-5",
        "6": "piano__key--black-6", "7": "piano__key--black-7", "8": "piano__key--black-8", "9": "piano__key--black-9", "0": "piano__key--black-0",
        "q": "piano__key--black-q", "w": "piano__key--black-w", "e": "piano__key--black-e", "r": "piano__key--black-r", "t": "piano__key--black-t", "y": "piano__key--black-y",

        // White keys
        "a": "piano__key--white-a", "s": "piano__key--white-s", "d": "piano__key--white-d", "f": "piano__key--white-f", "g": "piano__key--white-g",
        "h": "piano__key--white-h", "j": "piano__key--white-j", "k": "piano__key--white-k", "l": "piano__key--white-l", "z": "piano__key--white-z",
        "x": "piano__key--white-x", "c": "piano__key--white-c", "v": "piano__key--white-v", "b": "piano__key--white-b", "n": "piano__key--white-n",
        "m": "piano__key--white-m", ",": "piano__key--white-w1", ".": "piano__key--white-w2", "-": "piano__key--white-w3", "u": "piano__key--white-w4",
        "i": "piano__key--white-w5", "o": "piano__key--white-w6", "p": "piano__key--white-w7"
};

function getFrequency(key) {
    const frequencies = {
        // Black keys
        "1": 291.353, "2": 346.479, "3": 388.909, "4": 462.493, "5": 519.130,
        "6": 582.705, "7": 692.957, "8": 777.817, "9": 924.986, "0": 103.826,
        "q": 116.547, "w": 138.591, "e": 155.997, "r": 184.997, "t": 207.652, "y": 223.082,

        // White keys
        "a": 275.000, "s": 308.677, "d": 327.032, "f": 367.081, "g": 412.035,
        "h": 436.536, "j": 489.995, "k": 550.000, "l": 617.354, "z": 654.064,
        "x": 734.162, "c": 824.069, "v": 873.071, "b": 979.989, "n": 110.000,
        "m": 123.471, ",": 130.813, ".": 146.832, "-": 164.814, "u": 174.614,
        "i": 195.998, "o": 220.000, "p": 246.942
    };

    return frequencies[key] || 0;
}

document.addEventListener('keydown', function (event) {
    const keyClass = keyToPianoKey[event.key];

    if (keyClass) {
        jsNota(getFrequency(event.key));

        
        const keyElement = document.querySelector(`.${keyClass}`);

        if (keyElement) {
            createNoteAnimation(keyElement);
            if ([...keyElement.classList].some(cls => cls.startsWith("piano__key--black"))) {
                keyElement.classList.add("press-black");
                setTimeout(() => {
                    keyElement.classList.remove("press-black");
                }, 100);
            } else {
                keyElement.classList.add("press-white");
                setTimeout(() => {
                    keyElement.classList.remove("press-white");
                }, 100);
            }
        }
    }
    
});

function handlePianoClick(element, frecuencia) {
    const keyType = element.getAttribute("data-key").trim();

    jsNota(frecuencia);

    if (keyType) {
        if (keyType === "black") {
            element.classList.add("press-black");
            setTimeout(() => {
                element.classList.remove("press-black");
            }, 100);
        } else {
            element.classList.add("press-white");
            setTimeout(() => {
                element.classList.remove("press-white");
            }, 100);
        }
    }
};

/* key Animation */

document.querySelectorAll(".piano__key").forEach(key => {
    key.addEventListener("click", (event) => {
        createNoteAnimation(event.target);
    });
});

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