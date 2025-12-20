// Clona os cards do marquee para criar loop infinito e anima com JavaScript
document.addEventListener('DOMContentLoaded', () => {
    const tracks = document.querySelectorAll('.team-track');
    
    tracks.forEach(track => {
        // Adiciona lazy loading em todas as imagens originais
        const originalImages = track.querySelectorAll('.team-card img');
        originalImages.forEach(img => {
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
        });
        
        // Clona todos os cards originais
        const cards = track.querySelectorAll('.team-card');
        const clonedCards = Array.from(cards).map(card => card.cloneNode(true));
        
        // Adiciona os cards clonados ao final do track
        clonedCards.forEach(clonedCard => {
            track.appendChild(clonedCard);
        });
    });

    // Animação de entrada para a seção de contato
    const contactSection = document.querySelector('.sobre-contact');
    if (contactSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target); // Para de observar após animar uma vez
                }
            });
        }, {
            threshold: 0.2, // Dispara quando 20% da seção estiver visível
            rootMargin: '0px 0px -100px 0px' // Adiciona um pequeno offset
        });

        observer.observe(contactSection);
    }

    // Animação JavaScript para velocidade constante - otimizada
    const marquees = document.querySelectorAll('.team-marquee');
    const speed = 30; // pixels por segundo - velocidade constante
    
    marquees.forEach(marquee => {
        const track = marquee.querySelector('.team-track');
        if (!track) return;
        
        let position = 0;
        let animationId = null;
        let lastTime = null;
        let trackWidth = 0; // Cache da largura
        let isAnimating = false;
        const isReverse = marquee.classList.contains('marquee-bottom');
        
        // Calcula a largura total do conteúdo original (metade do total, já que está duplicado)
        // Cacheado para evitar recálculos
        const calculateTrackWidth = () => {
            const cards = track.querySelectorAll('.team-card');
            const cardCount = cards.length / 2; // Metade são originais
            let width = 0;
            for (let i = 0; i < cardCount; i++) {
                width += cards[i].offsetWidth + 16; // 16px é o gap
            }
            return width;
        };
        
        const animate = (currentTime) => {
            if (!lastTime) {
                lastTime = currentTime;
            }
            
            const deltaTime = (currentTime - lastTime) / 1000; // converter para segundos
            lastTime = currentTime;
            
            if (isReverse) {
                position += speed * deltaTime;
                if (position >= 0) {
                    position = -trackWidth;
                }
            } else {
                position -= speed * deltaTime;
                if (position <= -trackWidth) {
                    position = 0;
                }
            }
            
            track.style.transform = `translateX(${position}px)`;
            animationId = requestAnimationFrame(animate);
        };
        
        // Inicia a animação
        const startAnimation = () => {
            if (isAnimating) return;
            isAnimating = true;
            trackWidth = calculateTrackWidth();
            position = isReverse ? -trackWidth : 0;
            lastTime = null;
            animationId = requestAnimationFrame(animate);
        };
        
        // Para a animação quando não visível
        const stopAnimation = () => {
            if (animationId) {
                cancelAnimationFrame(animationId);
                animationId = null;
            }
            isAnimating = false;
        };
        
        // Usa IntersectionObserver para só animar quando visível
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Aguarda um pouco para garantir que as imagens estejam carregadas
                    const images = track.querySelectorAll('img');
                    let loadedImages = 0;
                    const totalImages = images.length;
                    
                    if (totalImages === 0) {
                        startAnimation();
                        return;
                    }
                    
                    // Conta imagens já carregadas
                    images.forEach(img => {
                        if (img.complete) loadedImages++;
                    });
                    
                    // Se a maioria já carregou, inicia imediatamente
                    if (loadedImages >= totalImages * 0.7) {
                        startAnimation();
                    } else {
                        // Senão, espera um pouco mais
                        setTimeout(() => {
                            startAnimation();
                        }, 500);
                    }
                } else {
                    stopAnimation();
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });
        
        observer.observe(marquee);
        
        // Recalcula quando a janela é redimensionada (debounced)
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                if (isAnimating) {
                    trackWidth = calculateTrackWidth();
                }
            }, 250);
        });
    });
});


