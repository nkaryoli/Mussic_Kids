/* ==================== NavBar ===================== */

const navbar = document.getElementById('navbar');
const openButton = document.getElementById('open-btn');

const media = window.matchMedia('(max-width: 900px)');
media.addEventListener('change', (e) => updateNavbar(e));

function updateNavbar(e) {
    const isMobile = e.matches;
    console.log(isMobile);

    if (isMobile) {
        navbar.setAttribute('inert', '');
    } else {
        navbar.removeAttribute('inert');
    }
}

function openMenu() {
    navbar.classList.add('show');
    openButton.setAttribute('aria-expanded', 'true');
    navbar.removeAttribute('inert');
}

function closeMenu() {
    navbar.classList.remove('show');
    openButton.setAttribute('aria-expanded', 'false');
    navbar.setAttribute('inert', '');
}

updateNavbar(media);

/* ==================== Notes Background ===================== */

const noteIconsBg = ['fa-music', 'fa-headphones', 'fa-guitar', 'fa-drum'];

const notePositions = [];

function generateRandomPosition() {
    return {
        x: Math.random() * 100,
        y: Math.random() * 100
    };
}

function checkCollision(newPos, size) {
    return notePositions.some(pos => {
        const distance = Math.sqrt(Math.pow(newPos.x - pos.x, 2) + Math.pow(newPos.y - pos.y, 2));
        return distance < size * 3;
    });
}

function createStaticMusicNotes(container, numNotes = 20) {
    for (let i = 0; i < numNotes; i++) {
        const note = document.createElement('span');
        note.classList.add('static-note');

        const randomIcon = noteIconsBg[Math.floor(Math.random() * noteIconsBg.length)];
        note.innerHTML = `<i class="fa ${randomIcon}"></i>`;

        const randomSize = 2 + Math.random() * 10;
        note.style.fontSize = `${randomSize}rem`;

        const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FFD700'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        note.style.color = randomColor;

        let newPos;
        let attempts = 0;
        do {
            newPos = generateRandomPosition();
            attempts++;
            if (attempts > 50) break;
        } while (checkCollision(newPos, randomSize));

        note.style.left = `${newPos.x}%`;
        note.style.top = `${newPos.y}%`;

        container.appendChild(note);
        notePositions.push(newPos);
    }
}

const instrumentsNotesContainer = document.querySelector('.fixed-notes');
createStaticMusicNotes(instrumentsNotesContainer, 15);

/* ==================== Cursor Animation ===================== */

let inactivityTimer, animationRunning = true;

function isMobileDevice() {
    return window.innerWidth <= 834;
}

document.addEventListener("DOMContentLoaded", () => {
    updateNavbar(media);
    if (!isMobileDevice()) {
        document.addEventListener("mousemove", initializeBubbleAnimation, { once: true });
    }
});

let animationStarted = false;
let canvas, ctx, particles = [], spawnTimer = 0, spawnInterval = 10;
let gravityStrength = 10;
let time = 0;
let mouse = { x: 0, y: 0, out: false };
let spawnParticles = true;

function initializeBubbleAnimation(event) {
    if (!animationStarted) {
        animationStarted = true;
        initCursorAnimation(event.clientX, event.clientY);
    }
}

function initCursorAnimation
(startX, startY) {
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

    particles = particles.filter(p => p.a > 0.05);

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

function stopLoop() {
    spawnParticles = false;
    setTimeout(() => {
        if (particles.length === 0) {
            animationRunning = false;
        }
    }, 100);
}

function restartLoop() {
    if (!animationRunning) {
        animationRunning = true;
        requestAnimationFrame(animateBubbles);
    }
}

function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
        spawnParticles = false;
        setTimeout(() => {
            if (particles.length === 0) {
                stopLoop();
            }
        }, 1);
    }, 5);
}

/* ==================== back btn =====================  */

const backBtn = document.querySelector('.btn-back');

if (backBtn) {
    backBtn.addEventListener('click', goBack);
}

function goBack() {
    if (document.referrer) {
        window.history.back();
    } else {
        window.location.href = '../../index.html';
    }
}