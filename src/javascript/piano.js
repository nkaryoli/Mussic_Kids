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
