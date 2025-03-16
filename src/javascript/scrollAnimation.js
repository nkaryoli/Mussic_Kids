document.addEventListener("DOMContentLoaded", () => {
    const instruments = document.querySelectorAll(".instrumentsBox");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const visibility = entry.intersectionRatio; // Cuánto % del elemento es visible

            if (visibility > 0.5) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = `translateY(0) scale(1)`;
            } else {
                entry.target.style.opacity = visibility; // Disminuye suavemente
                entry.target.style.transform = `translateY(20px) scale(0.9)`;
            }
        });
    }, { threshold: [0, 0.25, 0.5, 0.75, 1] }); // Varias medidas de visibilidad

    instruments.forEach(instrumentsBox => observer.observe(instrumentsBox));
});
