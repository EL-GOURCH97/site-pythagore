// Mobile Enhancements for Pythagore Sahara

$(document).ready(function() {
    
    // Check if jQuery is loaded
    if (typeof $ === 'undefined') {
        console.error('jQuery is not loaded!');
        return;
    }
    
    // Check if menu elements exist
    if ($('.menu-link').length === 0) {
        console.error('Menu link not found!');
    } else {
        console.log('Menu link found:', $('.menu-link').length);
    }
    
    if ($('.main-nav').length === 0) {
        console.error('Main navigation not found!');
    } else {
        console.log('Main nav found:', $('.main-nav').length);
    }
    
    console.log('Mobile enhancements loaded. Menu link found:', $('.menu-link').length);
    
    // Fallback vanilla JavaScript for mobile menu (only if jQuery fails)
    if (typeof $ === 'undefined') {
        document.addEventListener('DOMContentLoaded', function() {
            var menuLink = document.querySelector('.menu-link');
            var mainNav = document.querySelector('.main-nav');
            var body = document.body;
            
            if (menuLink && mainNav) {
                menuLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Vanilla JS: Menu link clicked!');
                    
                    if (mainNav.classList.contains('active')) {
                        mainNav.classList.remove('active');
                        body.classList.remove('menu-open');
                        console.log('Vanilla JS: Menu closed');
                    } else {
                        mainNav.classList.add('active');
                        body.classList.add('menu-open');
                        console.log('Vanilla JS: Menu opened');
                    }
                });
            }
        });
    }
    
    // Mobile menu functionality - More robust approach
    $(document).on('click', '.menu-link', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Menu link clicked!');
        
        var $nav = $('.main-nav');
        var $body = $('body');
        
        if ($nav.hasClass('active')) {
            $nav.removeClass('active');
            $body.removeClass('menu-open');
            console.log('Menu closed');
        } else {
            $nav.addClass('active');
            $body.addClass('menu-open');
            console.log('Menu opened');
        }
        
        console.log('Menu active:', $nav.hasClass('active'));
    });

    // Close menu when clicking on a link
    $('.main-menu a').on('click', function() {
        $('.main-nav').removeClass('active');
        $('body').removeClass('menu-open');
    });



    // Close menu when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.main-nav, .menu-link').length) {
            $('.main-nav').removeClass('active');
            $('body').removeClass('menu-open');
        }
    });

    // Mobile features expand/collapse functionality
    if (window.innerWidth <= 768) {
        $('.features-post').on('click', function() {
            var $this = $(this);
            
            if ($this.hasClass('expanded')) {
                // Collapse
                $this.removeClass('expanded');
                $this.find('.content-hide').slideUp(400);
            } else {
                // Expand
                $('.features-post').removeClass('expanded');
                $('.features-post').find('.content-hide').slideUp(400);
                $this.addClass('expanded');
                $this.find('.content-hide').slideDown(400);
            }
        });
    }



    // Smooth scrolling for navigation links
    $('.main-menu a, .scroll-to-section a').on('click', function(e) {
        if ($(this).attr('href').startsWith('#')) {
            e.preventDefault();
            var target = $($(this).attr('href'));
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 80
                }, 800);
            }
        }
    });

    // Active navigation highlighting
    $(window).scroll(function() {
        var scrollDistance = $(window).scrollTop();
        
        $('.section').each(function(i) {
            if ($(this).position().top - 100 <= scrollDistance) {
                $('.main-menu li.active').removeClass('active');
                $('.main-menu li').eq(i).addClass('active');
            }
        });
    }).scroll();

    // Initialize first nav item as active
    $('.main-menu li:first').addClass('active');
    
    // Prevent zoom on double tap for iOS
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);

    // Improve video performance on mobile
    const bgVideo = document.getElementById('bg-video');
    if (bgVideo) {
        // Pause video on mobile to save battery
        if (window.innerWidth <= 768) {
            bgVideo.pause();
            bgVideo.muted = true;
        }
        
        // Resume video on desktop
        if (window.innerWidth > 768) {
            bgVideo.play();
        }
    }

    // Handle orientation change
    window.addEventListener('orientationchange', function() {
        setTimeout(function() {
            // Recalculate heights and positions
            $('.main-banner').css('height', window.innerHeight + 'px');
            
            // Refresh carousel if needed
            if (typeof $.fn.owlCarousel !== 'undefined') {
                $('.owl-carousel').owlCarousel('refresh');
            }
        }, 500);
    });

    // Improve scrolling performance
    let ticking = false;
    function updateOnScroll() {
        // Add scroll-based animations or effects here
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);

    // Lazy load images for better performance
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Improve form experience on mobile
    $('input, textarea').on('focus', function() {
        // Scroll to input on focus for better UX
        setTimeout(() => {
            $(this).scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
    });



    // Add loading states for better UX
    $('form').on('submit', function() {
        const submitBtn = $(this).find('button[type="submit"]');
        const originalText = submitBtn.text();
        
        submitBtn.prop('disabled', true);
        submitBtn.text('Envoi en cours...');
        
        // Reset button after form submission (handled by EmailJS)
        setTimeout(() => {
            submitBtn.prop('disabled', false);
            submitBtn.text(originalText);
        }, 5000);
    });

    // Improve accessibility
    $('.hexLink').attr('tabindex', '0');
    $('.hexLink').on('keypress', function(e) {
        if (e.which === 13 || e.which === 32) { // Enter or Space
            e.preventDefault();
            $(this).click();
        }
    });



    // Handle viewport height issues on mobile browsers
    function setVH() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);

    // Add CSS custom property for viewport height
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .main-banner {
                height: calc(var(--vh, 1vh) * 100);
            }
        `)
        .appendTo('head');

    // Improve carousel touch experience
    if (typeof $.fn.owlCarousel !== 'undefined') {
        $('.owl-carousel').owlCarousel({
            touchDrag: true,
            mouseDrag: false,
            pullDrag: true,
            freeDrag: false,
            stagePadding: 0,
            margin: 20,
            nav: false,
            dots: true,
            loop: true,
            autoplay: true,
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                1000: {
                    items: 3
                }
            }
        });
    }

    // Add swipe gestures for mobile navigation
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - could be used for next carousel item
                $('.owl-carousel').trigger('next.owl.carousel');
            } else {
                // Swipe right - could be used for previous carousel item
                $('.owl-carousel').trigger('prev.owl.carousel');
            }
        }
    }

    // Add loading animation for better perceived performance
    $(window).on('load', function() {
        $('body').addClass('loaded');
        
        // Add loaded class to images for smooth appearance
        $('img').each(function() {
            if (this.complete) {
                $(this).addClass('loaded');
            } else {
                $(this).on('load', function() {
                    $(this).addClass('loaded');
                });
            }
        });
    });

    // Fallback for older browsers
    if (!('IntersectionObserver' in window)) {
        $('img[data-src]').each(function() {
            $(this).attr('src', $(this).data('src'));
        });
    }

    // Services section enhancements - MOBILE ONLY
    function enhanceServicesSection() {
        // Only apply enhancements on mobile devices
        if (window.innerWidth > 768) {
            return; // Exit if not mobile
        }

        // Animate service cards on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, index * 150); // Stagger animation
                }
            });
        }, observerOptions);

        // Observe all service items
        document.querySelectorAll('section.courses .item').forEach(item => {
            observer.observe(item);
        });

        // Add hover effects and interactions
        document.querySelectorAll('section.courses .item').forEach(item => {
            // Add category indicators
            const title = item.querySelector('h4').textContent;
            const category = getServiceCategory(title);
            if (category) {
                const indicator = document.createElement('div');
                indicator.className = 'category-indicator';
                indicator.textContent = category;
                item.appendChild(indicator);
            }



            // Add click event for more details
            item.addEventListener('click', function(e) {
                showServiceDetails(this);
            });
        });
    }

    // Helper function to get service category
    function getServiceCategory(title) {
        const categories = {
            'Sécurité': 'Sécurité',
            'Salle informatique': 'Technologie',
            'Bibliothèque': 'Éducation',
            'Apprentissage': 'Langues',
            'Activités': 'Loisirs',
            'Laboratoire': 'Sciences',
            'Transport': 'Logistique',
            'Espace de premiers soins': 'Santé',
            'Communication': 'Contact',
            'Suivi': 'Pédagogie',
            'Accompagnement': 'Orientation'
        };

        for (const [key, value] of Object.entries(categories)) {
            if (title.includes(key)) {
                return value;
            }
        }
        return null;
    }

    // Show service details modal
    function showServiceDetails(item) {
        const title = item.querySelector('h4').textContent;
        const description = item.querySelector('p').textContent;
        const image = item.querySelector('img').src;

        const modal = document.createElement('div');
        modal.className = 'service-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <div class="modal-image">
                    <img src="${image}" alt="${title}">
                </div>
                <div class="modal-body">
                    <h3>${title}</h3>
                    <p>${description}</p>
                    <div class="modal-actions">
                        <a href="#section6" class="btn-service">Nous contacter</a>
                        <button class="btn-service modal-close-btn">Fermer</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Add modal styles
        const style = document.createElement('style');
        style.textContent = `
            .service-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.3s ease;
            }
            
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(5px);
            }
            
            .modal-content {
                position: relative;
                background: #fff;
                border-radius: 15px;
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                animation: slideInUp 0.3s ease;
            }
            
            .modal-image img {
                width: 100%;
                height: 200px;
                object-fit: cover;
                border-radius: 15px 15px 0 0;
            }
            
            .modal-body {
                padding: 25px;
            }
            
            .modal-body h3 {
                color: #2c3e50;
                margin-bottom: 15px;
                font-size: 20px;
            }
            
            .modal-body p {
                color: #6c757d;
                line-height: 1.6;
                margin-bottom: 20px;
            }
            
            .modal-actions {
                display: flex;
                gap: 10px;
                justify-content: flex-end;
            }
            
            .modal-close {
                position: absolute;
                top: 15px;
                right: 15px;
                background: rgba(0, 0, 0, 0.5);
                color: #fff;
                border: none;
                border-radius: 50%;
                width: 30px;
                height: 30px;
                font-size: 18px;
                cursor: pointer;
                z-index: 1;
                transition: all 0.3s ease;
            }
            
            .modal-close:hover {
                background: rgba(0, 0, 0, 0.7);
                transform: scale(1.1);
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideInUp {
                from {
                    transform: translateY(50px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
            
            @media (max-width: 768px) {
                .modal-content {
                    width: 95%;
                    margin: 20px;
                }
                
                .modal-actions {
                    flex-direction: column;
                }
            }
        `;
        document.head.appendChild(style);

        // Close modal functionality
        const closeModal = () => {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(modal);
                document.head.removeChild(style);
            }, 300);
        };

        modal.querySelector('.modal-close').addEventListener('click', closeModal);
        modal.querySelector('.modal-close-btn').addEventListener('click', closeModal);
        modal.querySelector('.modal-overlay').addEventListener('click', closeModal);

        // Add fadeOut animation
        const fadeOutStyle = document.createElement('style');
        fadeOutStyle.textContent = `
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(fadeOutStyle);
    }

    // Initialize services enhancements when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', enhanceServicesSection);
    } else {
        enhanceServicesSection();
    }

    // Video section enhancements - MOBILE ONLY
    function enhanceVideoSection() {
        // Only apply enhancements on mobile devices
        if (window.innerWidth > 768) {
            return; // Exit if not mobile
        }

        // Keep the original concept: image with play button that launches video
        const videoFigure = document.querySelector('section.video .video-item figure');
        
        if (videoFigure) {
            // Keep the original image and play link
            const originalImage = videoFigure.querySelector('img');
            const playLink = videoFigure.querySelector('a.play');
            
            if (originalImage && playLink) {
                // Enhance the play button
                playLink.innerHTML = '<i class="fa fa-play"></i>';
                playLink.className = 'play-button-mobile';
                
                // Add click functionality to launch video in modal
                playLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    showVideoModal();
                });

                // Add loading indicator
                const loadingIndicator = document.createElement('div');
                loadingIndicator.className = 'video-loading-indicator';
                loadingIndicator.innerHTML = '<div class="spinner"></div>';
                videoFigure.appendChild(loadingIndicator);

                // Remove loading indicator when image is loaded
                originalImage.addEventListener('load', function() {
                    if (loadingIndicator.parentNode) {
                        loadingIndicator.parentNode.removeChild(loadingIndicator);
                    }
                });
            }
        }

        // Add functionality to "En savoir plus" button
        const enSavoirPlusButton = document.querySelector('section.video .main-button a');
        if (enSavoirPlusButton) {
            enSavoirPlusButton.addEventListener('click', function(e) {
                e.preventDefault();
                showVideoModal();
            });
        }

        // Function to show video in modal
        function showVideoModal() {
            const modal = document.createElement('div');
            modal.className = 'video-modal';
            modal.innerHTML = `
                <div class="modal-overlay"></div>
                <div class="modal-content">
                    <button class="modal-close">&times;</button>
                    <div class="video-container">
                        <video controls autoplay>
                            <source src="assets/images/course-video.mp4" type="video/mp4">
                            Votre navigateur ne supporte pas la lecture de vidéos.
                        </video>
                    </div>
                </div>
            `;

            document.body.appendChild(modal);

            // Add modal styles
            const style = document.createElement('style');
            style.textContent = `
                .video-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 9999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: fadeIn 0.3s ease;
                }
                
                .modal-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    backdrop-filter: blur(5px);
                }
                
                .modal-content {
                    position: relative;
                    background: #000;
                    border-radius: 15px;
                    max-width: 90%;
                    max-height: 80vh;
                    overflow: hidden;
                    animation: slideInUp 0.3s ease;
                }
                
                .video-container {
                    position: relative;
                    width: 100%;
                    height: 100%;
                }
                
                .video-container video {
                    width: 100%;
                    height: auto;
                    display: block;
                }
                
                .modal-close {
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    background: rgba(0, 0, 0, 0.7);
                    color: #fff;
                    border: none;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    font-size: 20px;
                    cursor: pointer;
                    z-index: 1;
                    transition: all 0.3s ease;
                }
                
                .modal-close:hover {
                    background: rgba(245, 166, 35, 0.9);
                    transform: scale(1.1);
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes slideInUp {
                    from {
                        transform: translateY(50px);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
                
                @media (max-width: 768px) {
                    .modal-content {
                        max-width: 95%;
                        max-height: 70vh;
                    }
                }
            `;
            document.head.appendChild(style);

            // Close modal functionality
            const closeModal = () => {
                modal.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    document.body.removeChild(modal);
                    document.head.removeChild(style);
                }, 300);
            };

            modal.querySelector('.modal-close').addEventListener('click', closeModal);
            modal.querySelector('.modal-overlay').addEventListener('click', closeModal);

            // Add fadeOut animation
            const fadeOutStyle = document.createElement('style');
            fadeOutStyle.textContent = `
                @keyframes fadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
            `;
            document.head.appendChild(fadeOutStyle);

            // Close on escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    closeModal();
                }
            });
        }

        // Add scroll-triggered animations
        const videoSection = document.querySelector('section.video');
        if (videoSection) {
            const observerOptions = {
                threshold: 0.3,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Add staggered animation to children
                        const leftContent = entry.target.querySelector('.left-content');
                        const videoItem = entry.target.querySelector('.video-item');
                        
                        if (leftContent) {
                            leftContent.style.animation = 'fadeInUp 0.8s ease-out';
                        }
                        
                        if (videoItem) {
                            setTimeout(() => {
                                videoItem.style.animation = 'fadeInUp 0.8s ease-out';
                            }, 200);
                        }
                        
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            observer.observe(videoSection);
        }

        // Add touch gestures for video
        const videoItem = document.querySelector('section.video .video-item');
        if (videoItem) {
            let touchStartY = 0;
            let touchEndY = 0;

            videoItem.addEventListener('touchstart', function(e) {
                touchStartY = e.changedTouches[0].screenY;
            });

            videoItem.addEventListener('touchend', function(e) {
                touchEndY = e.changedTouches[0].screenY;
                handleVideoSwipe();
            });

            function handleVideoSwipe() {
                const swipeThreshold = 50;
                
                if (touchEndY < touchStartY - swipeThreshold) {
                    // Swipe up - launch video modal
                    showVideoModal();
                }
            }
        }

        // Add accessibility improvements
        const playButton = document.querySelector('section.video .play-button-mobile');
        if (playButton) {
            playButton.setAttribute('aria-label', 'Lire la vidéo de présentation');
            playButton.setAttribute('role', 'button');
        }
    }

    // Add ripple animation CSS
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    // Initialize video enhancements
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', enhanceVideoSection);
    } else {
        enhanceVideoSection();
    }

    // Video background fix - MOBILE ONLY
    function fixVideoBackground() {
        // Only apply on mobile devices
        if (window.innerWidth > 768) {
            return; // Exit if not mobile
        }

        const bgVideo = document.getElementById('bg-video');
        if (!bgVideo) return;

        console.log('🎥 Fixing video background for mobile');

        // Ensure video attributes are set correctly
        bgVideo.setAttribute('playsinline', '');
        bgVideo.setAttribute('muted', '');
        bgVideo.setAttribute('autoplay', '');
        bgVideo.setAttribute('loop', '');
        bgVideo.setAttribute('preload', 'auto');

        // Force video to be visible
        bgVideo.style.cssText = `
            object-fit: cover !important;
            width: 100% !important;
            height: 100% !important;
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            z-index: -1 !important;
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
        `;

        // Try to play the video
        const playPromise = bgVideo.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log('✅ Video playing successfully');
            }).catch(error => {
                console.log('⚠️ Video autoplay failed:', error);
                // Try to play on user interaction
                document.addEventListener('touchstart', function() {
                    bgVideo.play().catch(e => console.log('Still cannot play:', e));
                }, { once: true });
            });
        }
    }

    // Initialize all enhancements when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            enhanceServicesSection();
            enhanceVideoSection();
            fixVideoBackground();
        });
    } else {
        enhanceServicesSection();
        enhanceVideoSection();
        fixVideoBackground();
    }

    // Also initialize if jQuery is ready
    if (typeof $ !== 'undefined') {
        $(document).ready(function() {
            enhanceServicesSection();
            enhanceVideoSection();
            fixVideoBackground();
        });
    } else {
        enhanceServicesSection();
        enhanceVideoSection();
        fixVideoBackground();
        console.log('✅ All enhancements initialized');
    }

    // ===== SECTION NOS ESPACES - AMÉLIORATIONS MOBILE SEULEMENT =====
    
    // Enhancements for the hexagonal gallery section - MOBILE ONLY
    function enhanceHexagonalGallery() {
        // Only apply enhancements on mobile devices
        if (window.innerWidth > 768) {
            return; // Exit if not mobile
        }

        console.log('🏗️ Enhancing hexagonal gallery for mobile');

        const hexGrid = document.getElementById('hexGrid');
        if (!hexGrid) {
            console.log('⚠️ Hex grid not found');
            return;
        }

        // Add loading states for images and zoom icons
        const hexImages = document.querySelectorAll('.hex .img');
        hexImages.forEach((img, index) => {
            // Add loading indicator
            const loadingIndicator = document.createElement('div');
            loadingIndicator.className = 'loading-indicator';
            loadingIndicator.innerHTML = '<div class="spinner"></div>';
            img.parentElement.appendChild(loadingIndicator);

            // Add shine effect
            const shine = document.createElement('div');
            shine.className = 'shine';
            img.parentElement.appendChild(shine);

            // Add overlay
            const overlay = document.createElement('div');
            overlay.className = 'overlay';
            img.parentElement.appendChild(overlay);

            // Add zoom icon
            const zoomIcon = document.createElement('div');
            zoomIcon.className = 'zoom-icon';
            zoomIcon.textContent = '🔍';
            img.parentElement.appendChild(zoomIcon);

            // Remove loading indicator when image is loaded
            const backgroundImage = img.style.backgroundImage;
            if (backgroundImage) {
                const imageUrl = backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/i, '$1');
                const tempImg = new Image();
                tempImg.onload = function() {
                    if (loadingIndicator.parentNode) {
                        loadingIndicator.parentNode.removeChild(loadingIndicator);
                    }
                    img.style.opacity = '1';
                };
                tempImg.onerror = function() {
                    if (loadingIndicator.parentNode) {
                        loadingIndicator.parentNode.removeChild(loadingIndicator);
                    }
                    console.log('❌ Failed to load image:', imageUrl);
                };
                tempImg.src = imageUrl;
            }
        });

        // Add scroll-triggered animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    const hexes = entry.target.querySelectorAll('.hex');
                    hexes.forEach((hex, hexIndex) => {
                        setTimeout(() => {
                            hex.style.animation = `fadeInUp 0.6s ease-out ${hexIndex * 0.1}s both`;
                        }, hexIndex * 100);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const comingSoonSection = document.querySelector('section.coming-soon');
        if (comingSoonSection) {
            observer.observe(comingSoonSection);
        }

        // Enhance lightbox functionality for mobile
        enhanceMobileLightbox();

        // Add touch gestures for better mobile experience
        addTouchGestures();

        // Add accessibility improvements
        addAccessibilityFeatures();
    }

    // Enhanced mobile lightbox
    function enhanceMobileLightbox() {
        const hexLinks = document.querySelectorAll('.hexLink');
        
        hexLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const imageUrl = this.getAttribute('href');
                const currentImage = this.querySelector('.img');
                const backgroundImage = currentImage.style.backgroundImage;
                const actualImageUrl = backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/i, '$1');
                
                showEnhancedLightbox(actualImageUrl, imageUrl);
            });
        });
    }

    // Show enhanced lightbox with navigation
    function showEnhancedLightbox(imageUrl, originalUrl) {
        // Get all images in the gallery
        const allImages = Array.from(document.querySelectorAll('.hexLink')).map(link => {
            const img = link.querySelector('.img');
            const backgroundImage = img.style.backgroundImage;
            return backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/i, '$1');
        });

        const currentIndex = allImages.indexOf(imageUrl);
        
        const lightbox = document.createElement('div');
        lightbox.className = 'custom-lightbox-overlay';
        lightbox.innerHTML = `
            <div class="custom-lightbox-image">
                <img src="${imageUrl}" alt="Galerie image" style="opacity: 0;">
            </div>
            <button class="custom-lightbox-close">&times;</button>
            <div class="custom-lightbox-nav">
                <button class="nav-prev" ${currentIndex === 0 ? 'disabled' : ''}>‹</button>
                <span class="image-counter">${currentIndex + 1} / ${allImages.length}</span>
                <button class="nav-next" ${currentIndex === allImages.length - 1 ? 'disabled' : ''}>›</button>
            </div>
        `;

        document.body.appendChild(lightbox);
        
        // Ensure the image loads and becomes visible
        const img = lightbox.querySelector('img');
        img.onload = function() {
            img.style.opacity = '1';
        };
        img.onerror = function() {
            console.error('Failed to load image:', imageUrl);
            img.style.opacity = '1'; // Show anyway
        };

        // Navigation functionality
        let currentImageIndex = currentIndex;
        
        function updateImage(index) {
            if (index >= 0 && index < allImages.length) {
                currentImageIndex = index;
                const img = lightbox.querySelector('img');
                const counter = lightbox.querySelector('.image-counter');
                const prevBtn = lightbox.querySelector('.nav-prev');
                const nextBtn = lightbox.querySelector('.nav-next');
                
                // Add loading state
                img.style.opacity = '0.5';
                
                // Set up load handlers
                img.onload = function() {
                    img.style.opacity = '1';
                };
                
                img.onerror = function() {
                    console.error('Failed to load image:', allImages[index]);
                    img.style.opacity = '1'; // Show anyway
                };
                
                // Update image source
                img.src = allImages[index];
                counter.textContent = `${index + 1} / ${allImages.length}`;
                
                // Update button states
                prevBtn.disabled = index === 0;
                nextBtn.disabled = index === allImages.length - 1;
            }
        }

        // Event listeners for navigation
        lightbox.querySelector('.nav-prev').addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (currentImageIndex > 0) {
                updateImage(currentImageIndex - 1);
            }
        });

        lightbox.querySelector('.nav-next').addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (currentImageIndex < allImages.length - 1) {
                updateImage(currentImageIndex + 1);
            }
        });

        // Close lightbox function - DEFINED FIRST
        const closeLightbox = () => {
            // Remove all event listeners
            document.removeEventListener('keydown', handleKeydown);
            
            // Remove from DOM immediately
            if (lightbox.parentNode) {
                lightbox.parentNode.removeChild(lightbox);
            }
        };

        // Keyboard navigation
        const handleKeydown = function(e) {
            if (lightbox.parentNode) {
                switch(e.key) {
                    case 'Escape':
                        e.preventDefault();
                        closeLightbox();
                        break;
                    case 'ArrowLeft':
                        e.preventDefault();
                        if (currentImageIndex > 0) {
                            updateImage(currentImageIndex - 1);
                        }
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        if (currentImageIndex < allImages.length - 1) {
                            updateImage(currentImageIndex + 1);
                        }
                        break;
                }
            }
        };
        
        document.addEventListener('keydown', handleKeydown);

        // Close button event listener - ULTRA SIMPLE
        const closeButton = lightbox.querySelector('.custom-lightbox-close');
        
        // Use the same closeLightbox function for consistency
        closeButton.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeLightbox();
        };
        
        // Background click event listener - ULTRA SIMPLE
        lightbox.onclick = function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        };

        // Swipe gestures for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        lightbox.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });

        lightbox.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0 && currentImageIndex < allImages.length - 1) {
                    // Swipe left - next image
                    updateImage(currentImageIndex + 1);
                } else if (diff < 0 && currentImageIndex > 0) {
                    // Swipe right - previous image
                    updateImage(currentImageIndex - 1);
                }
            }
        }
    }

    // Add touch gestures for better mobile experience
    function addTouchGestures() {
        const hexes = document.querySelectorAll('.hex');
        
        hexes.forEach(hex => {
            let touchStartY = 0;
            let touchEndY = 0;

            hex.addEventListener('touchstart', function(e) {
                touchStartY = e.changedTouches[0].screenY;
            });

            hex.addEventListener('touchend', function(e) {
                touchEndY = e.changedTouches[0].screenY;
                handleHexSwipe();
            });

            function handleHexSwipe() {
                const swipeThreshold = 30;
                const diff = touchStartY - touchEndY;

                if (Math.abs(diff) > swipeThreshold) {
                    if (diff > 0) {
                        // Swipe up - add visual feedback
                        hex.style.transform = 'translateY(-4px) scale(1.02)';
                        setTimeout(() => {
                            hex.style.transform = '';
                        }, 200);
                    }
                }
            }
        });
    }

    // Add accessibility features
    function addAccessibilityFeatures() {
        const hexLinks = document.querySelectorAll('.hexLink');
        
        hexLinks.forEach((link, index) => {
            // Add ARIA labels
            link.setAttribute('aria-label', `Voir l'image ${index + 1} de la galerie`);
            link.setAttribute('role', 'button');
            link.setAttribute('tabindex', '0');
            
            // Add keyboard navigation
            link.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });

        // Add focus indicators
        const style = document.createElement('style');
        style.textContent = `
            .hexLink:focus {
                outline: 3px solid #ef7319;
                outline-offset: 2px;
            }
            
            .hexLink:focus .hexIn {
                transform: translateY(-4px);
                box-shadow: 0 8px 25px rgba(245, 166, 35, 0.4);
            }
        `;
        document.head.appendChild(style);
    }

    // Add performance optimizations
    function optimizePerformance() {
        // Lazy load images for better performance
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        const backgroundImage = img.style.backgroundImage;
                        if (backgroundImage) {
                            const imageUrl = backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/i, '$1');
                            // Preload the image
                            const tempImg = new Image();
                            tempImg.src = imageUrl;
                        }
                        imageObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px'
            });

            document.querySelectorAll('.hex .img').forEach(img => {
                imageObserver.observe(img);
            });
        }

        // Debounce scroll events
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(function() {
                // Handle scroll-based animations here
            }, 16); // ~60fps
        });
    }

    // Initialize hexagonal gallery enhancements
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            enhanceHexagonalGallery();
            optimizePerformance();
        });
    } else {
        enhanceHexagonalGallery();
        optimizePerformance();
    }

    // Also initialize if jQuery is ready
    if (typeof $ !== 'undefined') {
        $(document).ready(function() {
            enhanceHexagonalGallery();
            optimizePerformance();
        });
    }

    console.log('✅ Hexagonal gallery enhancements loaded');


}); 