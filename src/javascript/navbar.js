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