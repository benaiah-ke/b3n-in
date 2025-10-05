document.addEventListener('DOMContentLoaded', function() {
    // Ensure page starts at the top
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Boot sequence and terminal interface
    const bootSequence = document.querySelector('.boot-sequence');
    const terminalInterface = document.querySelector('.terminal-interface');
    const bootProgressBar = document.querySelector('.boot-progress-bar');
    const bootText = document.getElementById('boot-text');
    const bootStatus = document.querySelector('.boot-status');

    // Typed text elements
    const typedText = document.querySelector('.typed-text');
    const typedFooter = document.querySelector('.typed-footer');

    // Boot sequence logs
    const bootLogs = [
        "[ OK ] Starting System Boot...",
        "[ OK ] Initializing kernel modules...",
        "[ OK ] Loading device drivers...",
        "[ OK ] Mounting file systems...",
        "[ OK ] Starting network services...",
        "[ OK ] Checking hardware compatibility...",
        "[ OK ] Loading Benaiah OS v1.0...",
        "[ OK ] Scanning for peripherals...",
        "[ OK ] Initializing memory management...",
        "[ OK ] Loading user profile: Benaiah Wepundi...",
        "[ OK ] Decrypting skills database...",
        "[ OK ] Loading digital empire archives...",
        "[ OK ] Establishing neural connections...",
        "[ OK ] Syncing with fintech matrix...",
        "[ OK ] All systems operational.",
        "\n[SUCCESS] System ready for access.\n"
    ];

    // Hero section typing texts
    const heroTypes = [
        "whoami",
        "cat ./manifesto.txt",
        "ls -la ./ventures/",
        "ssh payd@global.network",
        "sudo build_future --borderless",
        "git push origin innovation"
    ];

    // Footer typing texts
    const footerTypes = [
        "echo 'Building the future of money'",
        "echo 'Making payments borderless'",
        "echo 'Connecting the global workforce'",
        "echo 'Economic freedom for all'"
    ];

    // Simulate boot sequence
    let bootProgress = 0;
    let logIndex = 0;
    let bootComplete = false;
    
    // Start boot sequence animation
    simulateBootSequence();

    // Listen for any key press to enter the terminal interface
    let interactionListener = function(e) {
        if (bootComplete) {
            enterTerminalInterface();
        }
    };
    
    document.addEventListener('keydown', interactionListener);
    document.addEventListener('click', interactionListener);
    document.addEventListener('touchstart', interactionListener);

    // Boot sequence animation function
    function simulateBootSequence() {
        const bootInterval = setInterval(() => {
            if (bootProgress >= 100) {
                clearInterval(bootInterval);
                bootComplete = true;
                // Text is now handled by CSS with responsive pseudo-elements
                return;
            }

            // Update progress bar
            bootProgress += Math.floor(Math.random() * 8) + 2;
            if (bootProgress > 100) bootProgress = 100;
            bootProgressBar.style.width = bootProgress + '%';

            // Add boot logs progressively
            if (logIndex < bootLogs.length) {
                const logChance = bootProgress / 100;
                if (Math.random() < logChance) {
                    bootText.textContent += bootLogs[logIndex] + '\n';
                    logIndex++;
                    bootText.scrollTop = bootText.scrollHeight;
                }
            }
        }, 150);
    }

    // Enter terminal interface function
    function enterTerminalInterface() {
        if (!bootComplete) return;
        
        // Remove event listeners
        document.removeEventListener('keydown', interactionListener);
        document.removeEventListener('click', interactionListener);
        document.removeEventListener('touchstart', interactionListener);

        // Hide boot sequence and show terminal interface
        bootSequence.classList.add('hidden');
        
        // Ensure page stays at the top
        window.scrollTo(0, 0);
        
        setTimeout(() => {
            terminalInterface.classList.remove('hidden');
            
            // Ensure page is at the top after transition
            window.scrollTo(0, 0);
            
            // Start typing animations
            if (typedText) {
                startTypingAnimation(typedText, heroTypes, 100, true);
            }
            if (typedFooter) {
                startTypingAnimation(typedFooter, footerTypes, 120, true);
            }
            
            // Initialize other interactions
            initNavigation();
            initSectionObserver();
            initMatrixEffect();
            initImageGlitch();
        }, 500);
    }

    // Typing animation function
    function startTypingAnimation(element, texts, speed, loop = false) {
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingDelay = 2500;

        function type() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                element.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                
                if (charIndex === 0) {
                    isDeleting = false;
                    textIndex = (textIndex + 1) % texts.length;
                    setTimeout(() => requestAnimationFrame(type), 500);
                    return;
                }
            } else {
                element.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                
                if (charIndex === currentText.length) {
                    if (loop) {
                        isDeleting = true;
                        setTimeout(() => requestAnimationFrame(type), typingDelay);
                        return;
                    }
                }
            }

            const typeSpeed = isDeleting ? speed / 2 : speed + Math.random() * 50;
            setTimeout(() => requestAnimationFrame(type), typeSpeed);
        }

        type();
    }

    // Navigation interactions
    function initNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const startBtn = document.getElementById('start-btn');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

        if (startBtn) {
            startBtn.addEventListener('click', function() {
                const manifestoSection = document.getElementById('manifesto');
                if (manifestoSection) {
                    window.scrollTo({
                        top: manifestoSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        }
    }

    // Section observer for active navigation
    function initSectionObserver() {
        const sections = document.querySelectorAll('.terminal-section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const sectionId = entry.target.getAttribute('id');
                        
                        navLinks.forEach(link => {
                            const linkSection = link.getAttribute('data-section');
                            if (linkSection === sectionId) {
                                link.classList.add('active');
                            } else {
                                link.classList.remove('active');
                            }
                        });
                    }
                });
            }, 
            { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' }
        );
        
        sections.forEach(section => {
            if (section.id !== 'hero') {
                sectionObserver.observe(section);
            }
        });
    }

    // Matrix rain effect
    function initMatrixEffect() {
        const matrixBg = document.querySelector('.matrix-background');
        if (!matrixBg) return;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        matrixBg.appendChild(canvas);
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()";
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1);
        
        function drawMatrix() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#00ff41';
            ctx.font = fontSize + 'px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = matrix[Math.floor(Math.random() * matrix.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                
                drops[i]++;
            }
        }
        
        setInterval(drawMatrix, 50);
        
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // Hero image glitch effect
    function initImageGlitch() {
        const glitchImage = document.querySelector('.glitch-image');
        if (!glitchImage) return;

        setInterval(() => {
            if (Math.random() > 0.92) {
                const glitchIntensity = Math.random() * 5;
                glitchImage.style.transform = `translate(${Math.random() * glitchIntensity - glitchIntensity/2}px, ${Math.random() * glitchIntensity - glitchIntensity/2}px)`;
                glitchImage.style.filter = `grayscale(100%) contrast(${Math.random() * 0.5 + 1}) brightness(${Math.random() * 0.5 + 0.8}) hue-rotate(${Math.random() * 10}deg)`;
                
                setTimeout(() => {
                    glitchImage.style.transform = 'translate(0, 0)';
                    glitchImage.style.filter = 'grayscale(100%) contrast(1.2) brightness(1.1)';
                }, 100);
            }
        }, 1500);
    }

    // Add hover effects to venture items
    const ventureItems = document.querySelectorAll('.venture-item');
    ventureItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // Add hover effects to skills
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
});