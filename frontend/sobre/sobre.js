// Clona os cards do marquee para criar loop infinito e anima com JavaScript
document.addEventListener('DOMContentLoaded', () => {
    const tracks = document.querySelectorAll('.team-track');
    
    tracks.forEach(track => {
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

    // Animação JavaScript para velocidade constante
    const marquees = document.querySelectorAll('.team-marquee');
    const speed = 30; // pixels por segundo - velocidade constante
    
    marquees.forEach(marquee => {
        const track = marquee.querySelector('.team-track');
        if (!track) return;
        
        let position = 0;
        let animationId = null;
        let lastTime = null;
        const isReverse = marquee.classList.contains('marquee-bottom');
        
        // Calcula a largura total do conteúdo original (metade do total, já que está duplicado)
        const getTrackWidth = () => {
            const cards = track.querySelectorAll('.team-card');
            const originalWidth = Array.from(cards).slice(0, cards.length / 2).reduce((sum, card) => {
                return sum + card.offsetWidth + 16; // 16px é o gap
            }, 0);
            return originalWidth;
        };
        
        const animate = (currentTime) => {
            if (!lastTime) {
                lastTime = currentTime;
            }
            
            const deltaTime = (currentTime - lastTime) / 1000; // converter para segundos
            lastTime = currentTime;
            
            const trackWidth = getTrackWidth();
            
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
            const trackWidth = getTrackWidth();
            position = isReverse ? -trackWidth : 0;
            lastTime = null;
            animationId = requestAnimationFrame(animate);
        };
        
        // Aguarda o carregamento das imagens para calcular corretamente
        const images = track.querySelectorAll('img');
        let loadedImages = 0;
        let hasStarted = false;
        
        const tryStartAnimation = () => {
            if (!hasStarted) {
                hasStarted = true;
                startAnimation();
            }
        };
        
        // Timeout de segurança: inicia a animação após 3 segundos mesmo se nem todas as imagens carregarem
        const timeoutId = setTimeout(() => {
            tryStartAnimation();
        }, 3000);
        
        if (images.length === 0) {
            clearTimeout(timeoutId);
            tryStartAnimation();
        } else {
            images.forEach(img => {
                // Trata erro de carregamento
                img.addEventListener('error', () => {
                    loadedImages++;
                    if (loadedImages === images.length) {
                        clearTimeout(timeoutId);
                        tryStartAnimation();
                    }
                });
                
                if (img.complete) {
                    loadedImages++;
                    if (loadedImages === images.length) {
                        clearTimeout(timeoutId);
                        tryStartAnimation();
                    }
                } else {
                    img.addEventListener('load', () => {
                        loadedImages++;
                        if (loadedImages === images.length) {
                            clearTimeout(timeoutId);
                            tryStartAnimation();
                        }
                    });
                }
            });
        }
        
        // Recalcula quando a janela é redimensionada
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                if (animationId) {
                    cancelAnimationFrame(animationId);
                }
                startAnimation();
            }, 250);
        });
    });
});


