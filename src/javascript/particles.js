let inactivityTimer, animationRunning = true;

// Detectar si el dispositivo es móvil
function isMobileDevice() {
    return window.innerWidth <= 834;
}

onload = function () {
    if (!isMobileDevice()) {
        document.addEventListener("mousemove", initializeBubbleAnimation, { once: true });
    }
};

let animationStarted = false;
let canvas, ctx, particles = [], spawnTimer = 0, spawnInterval = 10;
let gravityStrength = 10;
let time = 0;
let mouse = { x: 0, y: 0, out: false };
let spawnParticles = true; // Controla si se generan partículas

function initializeBubbleAnimation(event) {
    if (!animationStarted) {
        animationStarted = true;
        initCursorAnimation(event.clientX, event.clientY);
    }
}

function initCursorAnimation(startX, startY) {
    if (isMobileDevice()) return;

    canvas = document.createElement("canvas");
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "9999";
    document.body.appendChild(canvas);

    ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    mouse = { x: startX, y: startY, out: false };

    document.addEventListener("mousemove", function (e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        mouse.out = false;
        spawnParticles = true;
        restartLoop();
        resetInactivityTimer();
    });

    document.addEventListener("mouseout", function () {
        mouse.out = true;
        stopLoop();
    });

    requestAnimationFrame(startBubbleLoop);
}

function createBubble() {
    if (!spawnParticles) return;
    particles.push({
        x: mouse.x,
        y: mouse.y,
        xv: 6 * Math.random() - 3,
        yv: 6 * Math.random() - 3,
        c: `hsl(${Math.random() * 360}, 100%, 50%)`,
        s: 5 + 10 * Math.random(),
        a: 1,
    });
}

function startBubbleLoop(newTime) {
    time = newTime;
    animationRunning = true;
    requestAnimationFrame(animateBubbles);
}

function animateBubbles(newTime) {
    if (!animationRunning) return;

    drawBubbles();
    updateBubblePositions(newTime);

    if (particles.length > 0) {
        requestAnimationFrame(animateBubbles);
    } else {
        animationRunning = false;
    }
}

function drawBubbles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let p of particles) {
        ctx.globalAlpha = p.a;
        ctx.fillStyle = p.c;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.s, 0, 2 * Math.PI);
        ctx.fill();
    }
}

function updateBubblePositions(newTime) {
    let dt = newTime - time;
    time = newTime;

    if (spawnParticles) {
        spawnTimer += dt < 100 ? dt : 100;
        while (spawnTimer > 0) {
            createBubble();
            spawnTimer -= spawnInterval;
        }
    }

    particles = particles.filter(p => p.a > 0.05); // Elimina partículas invisibles

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

// Detener el loop si no hay partículas
function stopLoop() {
    spawnParticles = false;
    setTimeout(() => {
        if (particles.length === 0) {
            animationRunning = false;
        }
    }, 100);
}

// Reiniciar el loop si está detenido
function restartLoop() {
    if (!animationRunning) {
        animationRunning = true;
        requestAnimationFrame(animateBubbles);
    }
}

// Manejo de inactividad
function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
        spawnParticles = false; // Detener la generación de partículas
        setTimeout(() => {
            if (particles.length === 0) {
                stopLoop(); // Detener la animación cuando las partículas desaparezcan
            }
        }, 1);
    }, 5); // Reduzco el tiempo de inactividad a 300ms
}
