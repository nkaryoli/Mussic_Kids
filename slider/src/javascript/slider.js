$('.owl-carousel').owlCarousel({
    autoplay: true,
    center: true,
    loop: true,
    nav: true,
    navText: ["<span class='icon icon-arrow-left7'></span>", 
                "<span class='icon icon-arrow-right7'></span>"],
    items: 1,
    responsive: {
        768: {
            items: 3,
        }
    }
});