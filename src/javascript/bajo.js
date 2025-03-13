// console.log("hello")

const context = new AudioContext();

function jsNota(frecuencia) {

    const o = context.createOscillator();

    g = context.createGain();

    o.connect(g);

    o.type = "triangle";
    o.frequency.value = frecuencia;
    g.connect(context.destination);
    o.start(0);
    g.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 1.5);
}

document.addEventListener('keydown', function (event) {
    switch (event.key) {
        case '1':
            jsNota(103, 8262);
            break;
        case '2':
            jsNota(110.0000);
            break;
        case '3':
            jsNota(116.5409);
            break;
        case '4':
            jsNota(123.4708);
            break;
        case '5':
            jsNota(130.8128);
            break;
        case '6':
            jsNota(138.5913);
            break;
        case '7':
            jsNota(146.8324);
            break;
        case '8':
            jsNota(155.5635);
            break;
        case '9':
            jsNota(164.8138);
            break;
        case '0':
            jsNota(174.6141);
        //Notas de D 
        case 'q':
            jsNota(77.7817);
            break;
        case 'w':
            jsNota(82.4069);
            break;
        case 'e':
            jsNota(87.3071);
            break;
        case 'r':
            jsNota(92.4986);
            break;
        case 't':
            jsNota(97.9989);
            break;
        case 'y':
            jsNota(103.8262);
            break;
        case 'u':
            jsNota(110.0000);
            break;
        case 'i':
            jsNota(116.5409);
            break;
        case 'o':
            jsNota(123.4708);
            break;
        case 'p':
            jsNota(130.8128);

        //Notas de A

        case 'a':
            jsNota(58.2705);
            break;
        case 's':
            jsNota(61.7354);
            break;
        case 'd':
            jsNota(65.4064);
            break;
        case 'f':
            jsNota(69.2957);
            break;
        case 'g':
            jsNota(73.4162);
            break;
        case 'h':
            jsNota(77.7817);
            break;
        case 'j':
            jsNota(82.4069);
            break;
        case 'k':
            jsNota(87.3071);
            break;
        case 'l':
            jsNota(92.4986);
            break;
        case ';':
            jsNota(97.9989);

        //Notas de E

        case '<':
            jsNota(43.6536);
            break;
        case 'z':
            jsNota(46.2493);
            break;
        case 'x':
            jsNota(48.9995);
            break;
        case 'c':
            jsNota(51.9130);
            break;
        case 'v':
            jsNota(55.0000);
            break;
        case 'b':
            jsNota(58.2705);
            break;
        case 'n':
            jsNota(61.7354);
            break;
        case 'm':
            jsNota(65.4064);
            break;
        case 'l':
            jsNota(69.2957);
            break;
        case ',':
            jsNota(73.4162);
    }
});
