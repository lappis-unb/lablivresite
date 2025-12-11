// Carrossel de Projetos
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.projects-carousel');
    const prevBtn = document.querySelector('.carousel-btn-prev');
    const nextBtn = document.querySelector('.carousel-btn-next');
    
    if (!carousel || !prevBtn || !nextBtn) return;
    
    let isScrolling = false;
    const cardsPerView = 3;
    
    function scrollCarousel(direction) {
        if (isScrolling) return;
        isScrolling = true;
        
        const carouselWidth = carousel.offsetWidth;
        const gap = 30;
        const cardWidth = (carouselWidth - (gap * 2)) / cardsPerView;
        const scrollAmount = cardWidth + gap;
        const currentScroll = carousel.scrollLeft;
        const maxScroll = carousel.scrollWidth - carousel.offsetWidth;
        const tolerance = 1;
        
        if (direction === 'next') {
            // Verifica se já está no final
            if (currentScroll >= maxScroll - tolerance) {
                // Faz loop: volta para o início
                carousel.style.scrollBehavior = 'auto';
                carousel.scrollLeft = 0;
                void carousel.offsetHeight;
                setTimeout(() => {
                    carousel.style.scrollBehavior = 'smooth';
                    carousel.scrollLeft = scrollAmount;
                    setTimeout(() => { isScrolling = false; }, 600);
                }, 20);
            } else {
                // Rola normalmente
                carousel.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
                setTimeout(() => { isScrolling = false; }, 600);
            }
        } else {
            // Verifica se já está no início
            if (currentScroll <= tolerance) {
                // Faz loop: vai para o final
                carousel.style.scrollBehavior = 'auto';
                carousel.scrollLeft = maxScroll;
                void carousel.offsetHeight;
                setTimeout(() => {
                    carousel.style.scrollBehavior = 'smooth';
                    carousel.scrollLeft = maxScroll - scrollAmount;
                    setTimeout(() => { isScrolling = false; }, 600);
                }, 20);
            } else {
                // Rola normalmente
                carousel.scrollBy({
                    left: -scrollAmount,
                    behavior: 'smooth'
                });
                setTimeout(() => { isScrolling = false; }, 600);
            }
        }
    }
    
    prevBtn.addEventListener('click', () => {
        scrollCarousel('prev');
    });
    
    nextBtn.addEventListener('click', () => {
        scrollCarousel('next');
    });
});

