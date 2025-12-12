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
                slidesPerView: 3,
                spaceBetween: 30,
                allowTouchMove: false, // Desabilita arrastar no desktop
            }
        },
        
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
});
