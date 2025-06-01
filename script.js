
        // Theme Toggle
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;
        const themeIcon = themeToggle.querySelector('i');

        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            body.classList.toggle('dark', savedTheme === 'dark');
            themeIcon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }

        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark');
            const isDark = body.classList.contains('dark');
            themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });

        // Navigation
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('.section, .hero');

        // Update active nav link
        function updateActiveNav() {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }

        // Smooth scrolling for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Scroll to top button
        const scrollTopBtn = document.getElementById('scrollTop');

        function toggleScrollTopBtn() {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Scroll animations
        const animateElements = document.querySelectorAll('.animate-on-scroll');

        function checkScroll() {
            animateElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;

                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('animated');
                }
            });
        }

        // Header background on scroll
        const header = document.getElementById('header');
        window.addEventListener('scroll', () => {
            // Always keep header solid in both modes
            header.style.background = 'var(--header-bg)';
            if (body.classList.contains('dark')) {
                header.style.background = 'var(--header-dark-bg)';
            }
            
            // Add shadow when scrolled
            if (window.scrollY > 10) {
                header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = 'none';
            }
        });

        // Initialize scroll indicators
        function setupScrollIndicators() {
            const mastersContainer = document.getElementById('masters-projects');
            const bachelorsContainer = document.getElementById('bachelors-projects');
            const mastersIndicators = document.getElementById('masters-indicators');
            const bachelorsIndicators = document.getElementById('bachelors-indicators');
            
            createIndicators(mastersContainer, mastersIndicators);
            createIndicators(bachelorsContainer, bachelorsIndicators);
            
            // Update indicators on scroll
            mastersContainer.addEventListener('scroll', () => updateIndicators(mastersContainer, mastersIndicators));
            bachelorsContainer.addEventListener('scroll', () => updateIndicators(bachelorsContainer, bachelorsIndicators));
        }
        
        function createIndicators(container, indicatorsContainer) {
            const projectCards = container.querySelectorAll('.project-card');
            if (projectCards.length === 0) return;
            
            // Calculate card width including gap (gap is 1.5rem = 24px)
            const cardWidth = projectCards[0].offsetWidth + 24;
            const groupSize = 1; // One card per indicator
            const indicatorCount = Math.ceil(projectCards.length / groupSize);
            
            indicatorsContainer.innerHTML = '';
            
            for (let i = 0; i < indicatorCount; i++) {
                const indicator = document.createElement('div');
                indicator.className = 'scroll-indicator';
                if (i === 0) indicator.classList.add('active');
                indicator.addEventListener('click', () => {
                    container.scrollTo({
                        left: i * groupSize * cardWidth,
                        behavior: 'smooth'
                    });
                });
                indicatorsContainer.appendChild(indicator);
            }
        }
        
        function updateIndicators(container, indicatorsContainer) {
            const projectCards = container.querySelectorAll('.project-card');
            if (projectCards.length === 0) return;
            
            const cardWidth = projectCards[0].offsetWidth + 24;
            const groupSize = 1; // One card per indicator
            const scrollPosition = container.scrollLeft;
            const indicators = indicatorsContainer.querySelectorAll('.scroll-indicator');
            
            if (indicators.length === 0) return;
            
            indicators.forEach(indicator => indicator.classList.remove('active'));
            
            // Calculate active card index
            const cardIndex = Math.round(scrollPosition / cardWidth);
            if (cardIndex < indicators.length) {
                indicators[cardIndex].classList.add('active');
            }
        }

        // Event listeners
        window.addEventListener('scroll', () => {
            updateActiveNav();
            toggleScrollTopBtn();
            checkScroll();
        });

        window.addEventListener('load', () => {
            updateActiveNav();
            checkScroll();
            setupScrollIndicators();
        });
        
        window.addEventListener('resize', setupScrollIndicators);
    