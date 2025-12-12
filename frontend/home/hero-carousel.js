// Hero Carousel com Swiper
document.addEventListener('DOMContentLoaded', () => {
    // Função para animar elementos do slide
    function animateSlideElements(slide) {
        const title = slide.querySelector('.hero-title');
        const texts = slide.querySelectorAll('.hero-text');
        const btn = slide.querySelector('.hero-btn');
        
        // Remove classes anteriores
        if (title) {
            title.classList.remove('animate-in');
            title.style.opacity = '0';
            title.style.transform = 'translateX(30px)';
        }
        texts.forEach(text => {
            text.classList.remove('animate-in');
            text.style.opacity = '0';
            text.style.transform = 'translateX(30px)';
        });
        if (btn) {
            btn.classList.remove('animate-in');
            btn.style.opacity = '0';
            btn.style.transform = 'translateX(30px)';
        }
        
        // Força reflow
        void slide.offsetWidth;
        
        // Adiciona animação com delay
        setTimeout(() => {
            if (title) {
                title.classList.add('animate-in');
            }
            texts.forEach((text, index) => {
                setTimeout(() => {
                    text.classList.add('animate-in');
                }, index * 100);
            });
            if (btn) {
                setTimeout(() => {
                    btn.classList.add('animate-in');
                }, 400);
            }
        }, 100);
    }
    
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
        
        on: {
            init: function() {
                // Anima o primeiro slide ao carregar
                const firstSlide = this.slides[this.activeIndex];
                if (firstSlide) {
                    animateSlideElements(firstSlide);
                }
            },
            slideChangeTransitionStart: function() {
                // Anima o slide ativo quando muda
                const activeSlide = this.slides[this.activeIndex];
                if (activeSlide) {
                    animateSlideElements(activeSlide);
                }
            }
        }
    });
});

