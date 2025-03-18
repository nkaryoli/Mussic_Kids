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

function startAnimation(event) {
    if (!animationStarted) {
        animationStarted = true;
        init(event.clientX, event.clientY); // Llama a la función que inicia la animación
    }
}

// Escucha el primer movimiento del mouse para iniciar la animación (solo si no es móvil)
if (!isMobileDevice()) {
    document.addEventListener("mousemove", startAnimation);
}

function init(startX, startY) {
    if (isMobileDevice()) return; // Si es móvil, no se inicia la animación

    canvas = document.querySelector("canvas");
    ctx = canvas.getContext("2d");

    // Ajustar el tamaño del canvas
    onresize = function () {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
    };
    onresize();

    let mouse = { x: startX, y: startY, out: false };

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

        const particleOverflow = particles.length - 700;
        if (particleOverflow > 0) {
            particles.splice(0, particleOverflow);
        }

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            if (!mouse.out) {
                const x = mouse.x - p.x;
                const y = mouse.y - p.y;
                let a = x * x + y * y;
                a = a > 100 ? gravityStrength / a : gravityStrength / 100;
                p.xv = (p.xv + a * x) * 0.97; // Más fricción para ralentizar las partículas
                p.yv = (p.yv + a * y) * 0.97;
            }
            p.x += p.xv;
            p.y += p.yv;
            p.a *= 0.98;
        }
    }

}