// Carrossel de Projetos com Swiper
document.addEventListener('DOMContentLoaded', () => {
    // Carrossel de Projetos com Swiper
    const projectsSwiper = new Swiper('.projects-carousel', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        allowTouchMove: true, // Permite arrastar no mobile
        
        breakpoints: {
            769: {
                slidesPerView: 2,
                spaceBetween: 30,
                allowTouchMove: false, // Desabilita arrastar no desktop
            }
        },
        
        pagination: {
            el: '.projects-carousel-wrapper .swiper-pagination',
            clickable: true,
            type: 'bullets',
        },
        
        navigation: {
            nextEl: '.projects-carousel-wrapper .swiper-button-next',
            prevEl: '.projects-carousel-wrapper .swiper-button-prev',
        },
    });
});
