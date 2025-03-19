// Detectar si el dispositivo es móvil
function isMobileDevice() {
    return window.innerWidth <= 834;
}

onload = function () {
    if (!isMobileDevice()) {
        document.addEventListener("mousemove", startAnimation, { once: true });
    }
};

let animationStarted = false;
let canvas, ctx, particles = [], spawnTimer = 0, spawnInterval = 10;
let gravityStrength = 10;
let time = 0;
let mouse = { x: 0, y: 0, out: false };

function startAnimation(event) {
    if (!animationStarted) {
        animationStarted = true;
        init(event.clientX, event.clientY);
    }
}

function init(startX, startY) {
    if (isMobileDevice()) return;

    canvas = document.createElement("canvas");
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    canvas.style.pointerEvents = "none"; // Permite interacción con otros elementos
    canvas.style.zIndex = "9999"; // Siempre visible
    document.body.appendChild(canvas);

    ctx = canvas.getContext("2d");

    // Ajustar tamaño del canvas al cambiar el tamaño de la ventana
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    mouse = { x: startX, y: startY, out: false };

    // Escuchar eventos en `document` en lugar de `canvas`
    document.addEventListener("mousemove", function (e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        mouse.out = false;
    });

    document.addEventListener("mouseout", function () {
        mouse.out = true;
    });

    requestAnimationFrame(startLoop);
}

function newParticle() {
    particles.push({
        x: mouse.x,
        y: mouse.y,
        xv: 6 * Math.random() - 3, // Movimiento horizontal aleatorio
        yv: 6 * Math.random() - 3, // Movimiento vertical aleatorio
        c: `hsl(${Math.random() * 360}, 100%, 50%)`, // Color aleatorio (arcoíris)
        s: 5 + 10 * Math.random(), // Tamaño de la partícula
        a: 1, // Opacidad inicial
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
    for (let p of particles) {
        ctx.globalAlpha = p.a;
        ctx.fillStyle = p.c;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.s, 0, 2 * Math.PI);
        ctx.fill();
    }
}

function calculate(newTime) {
    let dt = newTime - time;
    time = newTime;

    if (!mouse.out) {
        spawnTimer += dt < 100 ? dt : 100;
        while (spawnTimer > 0) {
            newParticle();
            spawnTimer -= spawnInterval;
        }
    }

    const particleOverflow = particles.length - 700;
    if (particleOverflow > 0) {
        particles.splice(0, particleOverflow);
    }

    for (let p of particles) {
        if (!mouse.out) {
            let x = mouse.x - p.x;
            let y = mouse.y - p.y;
            let a = x * x + y * y;
            a = a > 100 ? gravityStrength / a : gravityStrength / 100;
            p.xv = (p.xv + a * x) * 0.97;
            p.yv = (p.yv + a * y) * 0.97;
        }
        p.x += p.xv;
        p.y += p.yv;
        p.a *= 0.98;
    }
}