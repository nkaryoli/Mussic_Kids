document.addEventListener("DOMContentLoaded", function () {
    const radios = document.querySelectorAll('input[type="radio"]');
    
    document.addEventListener("click", function (event) {
        let clickedInside = false;

        radios.forEach(radio => {
            if (radio.checked && (radio.nextElementSibling.contains(event.target) || radio === event.target)) {
                clickedInside = true;
            } else {
                radio.checked = false;
            }
        });

        if (!clickedInside) {
            radios.forEach(radio => radio.checked = false);
        }
    });

    window.addEventListener("scroll", function () {
        radios.forEach(radio => radio.checked = false);
    });
});