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

document.addEventListener('keydown', function (event) {
    switch (event.key) {
        // Notas de G (cuerda 4 - más aguda)
        case '0': jsNota(103.8262); break;
        case '1': jsNota(110.0000); break;
        case '2': jsNota(116.5409); break;
        case '3': jsNota(123.4708); break;
        case '4': jsNota(130.8128); break;
        case '5': jsNota(138.5913); break;
        case '6': jsNota(146.8324); break;
        case '7': jsNota(155.5635); break;
        case '8': jsNota(164.8138); break;
        case '9': jsNota(174.6141); break;
        case 'Q': jsNota(184.9972); break;
        case 'W': jsNota(195.9977); break;
        case 'A': jsNota(207.6524); break;
        case 'S': jsNota(220.0000); break;
        case 'Z': jsNota(233.0819); break;
        case 'X': jsNota(246.9417); break;


        // Notas de D (cuerda 3)
        case 'q': jsNota(77.7817); break;
        case 'w': jsNota(82.4069); break;
        case 'e': jsNota(87.3071); break;
        case 'r': jsNota(92.4986); break;
        case 't': jsNota(97.9989); break;
        case 'y': jsNota(103.8262); break;
        case 'u': jsNota(110.0000); break;
        case 'i': jsNota(116.5409); break;
        case 'o': jsNota(123.4708); break;
        case 'p': jsNota(130.8128); break;
        case 'E': jsNota(138.5913); break;
        case 'R': jsNota(146.8324); break;
        case 'D': jsNota(155.5635); break;
        case 'F': jsNota(164.8138); break;
        case 'C': jsNota(174.6141); break;
        case 'V': jsNota(184.9972); break;


        // Notas de A (cuerda 2)
        case 'a': jsNota(58.2705); break;
        case 's': jsNota(61.7354); break;
        case 'd': jsNota(65.4064); break;
        case 'f': jsNota(69.2957); break;
        case 'g': jsNota(73.4162); break;
        case 'h': jsNota(77.7817); break;
        case 'j': jsNota(82.4069); break;
        case 'k': jsNota(87.3071); break;
        case 'l': jsNota(92.4986); break;
        case '+': jsNota(97.9989); break;
        case 'T': jsNota(103.8262); break;
        case 'Y': jsNota(110.0000); break;
        case 'G': jsNota(116.5409); break;
        case 'H': jsNota(123.4708); break;
        case 'B': jsNota(130.8128); break;
        case 'N': jsNota(138.5913); break;


        // Notas de E (cuerda 1)
        case 'z': jsNota(43.6536); break;
        case 'x': jsNota(46.2493); break;
        case 'c': jsNota(48.9995); break;
        case 'v': jsNota(51.9130); break;
        case 'b': jsNota(55.0000); break;
        case 'n': jsNota(58.2705); break;
        case 'm': jsNota(61.7354); break;
        case ',': jsNota(65.4064); break;
        case '.': jsNota(69.2957); break;
        case '-': jsNota(73.4162); break;
        case 'U': jsNota(77.7817); break;
        case 'I': jsNota(82.4069); break;
        case 'O': jsNota(87.3071); break;
        case 'J': jsNota(92.4986); break;
        case 'K': jsNota(97.9989); break;
        case 'L': jsNota(103.8262); break;
    }
});
