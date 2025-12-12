// Hero Carousel com Swiper
document.addEventListener('DOMContentLoaded', () => {
    // Hero Carousel
    const heroSwiper = new Swiper('.hero-carousel', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        speed: 1000,
        allowTouchMove: true,
        
        pagination: {
            el: '.hero-pagination',
            clickable: true,
        },
        
        navigation: {
            nextEl: '.hero-nav-next',
            prevEl: '.hero-nav-prev',
        },
    });
});

