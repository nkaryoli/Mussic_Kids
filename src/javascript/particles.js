window.requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;

onload = function () {
    document.addEventListener("mousemove", startAnimation);
};

let animationStarted = false;

function startAnimation() {
    if (!animationStarted) {
        animationStarted = true;
        init(); // Llama a la función que inicia la animación
    }
}

// Escucha el primer movimiento del mouse para iniciar la animación
document.addEventListener("mousemove", startAnimation);

function initParticles() {
    // Aquí va el código de tu animación
    console.log("Animación iniciada"); 
}


function init() {
    canvas = document.querySelector("canvas");
    ctx = canvas.getContext("2d");

    onresize = function () {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
    };
    onresize();

    mouse = { x: canvas.width / 2, y: canvas.height / 2, out: false };

    canvas.onmouseout = function () {
        mouse.out = true;
    };

    canvas.onmousemove = function (e) {
        var rect = canvas.getBoundingClientRect();
        mouse = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        out: false,
        };
    };

    gravityStrength = 10;
    particles = [];
    spawnTimer = 0;
    spawnInterval = 10;
    type = 0;
    requestAnimationFrame(startLoop);
}

function newParticle() {
    type = type ? 0 : 1;
    particles.push({
        x: mouse.x,
        y: mouse.y,
        xv: type ? 6 * Math.random() - 3 : 8 * Math.random() - 4, // Velocidad más lenta
        yv: type ? 6 * Math.random() - 3 : 8 * Math.random() - 4,
        c: "hsl(" + Math.random() * 360 + ", 100%, 50%)", // Colores del arcoíris
        s: type ? 5 + 10 * Math.random() : 2, // Tamaño de las partículas
        a: 1,
    });
}

function startLoop(newTime) {
    time = newTime;
    requestAnimationFrame(loop);
}

function loop(newTime) {
    draw();
    calculate(newTime);
    requestAnimationFrame(loop);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        ctx.globalAlpha = p.a;
        ctx.fillStyle = p.c;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.s, 0, 2 * Math.PI);
        ctx.fill();
    }
}

function calculate(newTime) {
    var dt = newTime - time;
    time = newTime;

    if (!mouse.out) {
        spawnTimer += dt < 100 ? dt : 100;
        for (; spawnTimer > 0; spawnTimer -= spawnInterval) {
        newParticle();
        }
    }

    var particleOverflow = particles.length - 700;
    if (particleOverflow > 0) {
        particles.splice(0, particleOverflow);
    }

    for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        if (!mouse.out) {
        var x = mouse.x - p.x;
        var y = mouse.y - p.y;
        var a = x * x + y * y;
        a = a > 100 ? gravityStrength / a : gravityStrength / 100;
        p.xv = (p.xv + a * x) * 0.97; // Más fricción para ralentizar las partículas
        p.yv = (p.yv + a * y) * 0.97;
        }
        p.x += p.xv;
        p.y += p.yv;
        p.a *= 0.98;
    }
}