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
            el: '.projects-carousel-wrapper .swiper-pagination',
            clickable: true,
            type: 'bullets',
        },
        
        navigation: {
            nextEl: '.projects-carousel-wrapper .swiper-button-next',
            prevEl: '.projects-carousel-wrapper .swiper-button-prev',
        },
    });

    // Controle de visibilidade dos cards de publicação
    const viewMoreBtn = document.getElementById('publicacao-view-more-btn');
    const hiddenCards = document.querySelectorAll('.publicacao-card-hidden');
    
    if (viewMoreBtn && hiddenCards.length > 0) {
        let isExpanded = false;
        
        viewMoreBtn.addEventListener('click', () => {
            if (!isExpanded) {
                // Mostrar todos os cards escondidos
                hiddenCards.forEach(card => {
                    card.classList.add('show');
                });
                viewMoreBtn.textContent = 'Ver menos';
                isExpanded = true;
            } else {
                // Esconder os cards extras
                hiddenCards.forEach(card => {
                    card.classList.remove('show');
                });
                viewMoreBtn.textContent = 'Ver mais';
                isExpanded = false;
                
                // Scroll suave para o topo da seção de publicações
                const publicacoesSection = document.getElementById('noticias');
                if (publicacoesSection) {
                    publicacoesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    }
});
