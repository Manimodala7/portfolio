document.addEventListener('DOMContentLoaded', function() {
    // Email functionality
    const form = document.getElementById('contact-form');
    const sendBtn = document.getElementById('send-btn');

    if (form && sendBtn) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            sendBtn.disabled = true;
            sendBtn.textContent = 'Sending...';

            fetch(this.action, {
                method: this.method,
                body: new FormData(this)
            })
            .then(response => {
                if (response.ok) {
                    alert('Email sent successfully!');
                    form.reset();
                } else {
                    throw new Error('Something went wrong');
                }
            })
            .catch(error => {
                alert('There was an error sending your message. Please try again.');
                console.error('Error:', error);
            })
            .finally(() => {
                sendBtn.disabled = false;
                sendBtn.textContent = 'Send Email';
            });
        });

        // Add touch event for mobile devices
        sendBtn.addEventListener('touchstart', function(e) {
            e.preventDefault(); // Prevent default touch behavior
            form.dispatchEvent(new Event('submit'));
        });
    }

    // Touch device detection
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

    function handleInteraction(element, isTouch) {
        if (isTouch) {
            interactiveElements.forEach(el => {
                if (el !== element) el.classList.remove('touch-active');
            });
            element.classList.toggle('touch-active');
        }
    }

    // Menu icon functionality
    const menuIcon = document.querySelector('#menu-icon');
    const navLinks = document.querySelector('.nav-links');

    if (menuIcon) {
        menuIcon.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Navigation and smooth scrolling
    const allLinks = document.querySelectorAll('a[href^="#"]');
    
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
                if (navLinks) navLinks.classList.remove('active'); // Close mobile menu
            }
        });

        if (isTouchDevice) {
            link.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            });
            link.addEventListener('touchend', function() {
                this.classList.remove('touch-active');
            });
        }
    });

    // Interactive elements
    const interactiveElements = document.querySelectorAll('.logo, .visit-btn, .about img, .btn, .btn-group .btn, .socials i, .grid-card, .project-card, .publication-card, .heading1, .input-box .btn');

    interactiveElements.forEach(element => {
        if (isTouchDevice) {
            element.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            });
            element.addEventListener('touchend', function() {
                this.classList.remove('touch-active');
            });
        }
    });

    // Typed text effect
    if (typeof Typed !== 'undefined') {
        var typed = new Typed(".texted", {
            strings: ["Software Developer", "Web Developer"],
            typeSpeed: 100,
            backSpeed: 100,
            backDelay: 1000,
            loop: true
        });
    }

    // Scroll spy effect
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('header ul li a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').slice(1) === current) {
                item.classList.add('active');
            }
        });
    });

    // Skills animation
    const skillsSection = document.querySelector('#skills');
    const progressBars = document.querySelectorAll('.progress-line span');
    const radialBars = document.querySelectorAll('.radial-bar circle');

    function hideProgress() {
        progressBars.forEach(p => {
            p.style.opacity = 0;
            p.style.width = 0;
        });

        radialBars.forEach(r => {
            r.style.strokeDashoffset = r.getAttribute('r') * 2 * Math.PI;
        });
    }

    function showProgress() {
        progressBars.forEach(p => {
            p.style.opacity = 1;
            p.style.width = p.dataset.progress;
        });

        radialBars.forEach(r => {
            const radius = r.getAttribute('r');
            const circumference = radius * 2 * Math.PI;
            const offset = circumference - (r.parentElement.dataset.percent / 100) * circumference;
            r.style.strokeDashoffset = offset;
        });
    }

    window.addEventListener('scroll', () => {
        if (skillsSection) {
            const sectionPos = skillsSection.getBoundingClientRect().top;
            const screenPos = window.innerHeight / 2;

            if(sectionPos < screenPos) {
                showProgress();
            } else {
                hideProgress();
            }
        }
    });

    // Section animations
    const animatedSections = [
        {
            id: '#about',
            elements: ['.about-image', '.info-box h3:nth-of-type(1)', '.info-box h3:nth-of-type(2)', '.info-box h1', '.info-box p', '.btn-group .btn', '.socials']
        },
        {
            id: '#project',
            elements: ['.section-title', '.project-card', '.project-card a']
        },
        {
            id: '#publication',
            elements: ['.section-title', '.publication-card', '.publication-card .btn']
        },
        {
            id: '#certificate',
            elements: ['.section-title', '.grid-card', 'img']
        },
        {
            id: '#skills',
            elements: ['.section-title', '.bar', '.progress-line span', '.radial-bar .percentage', '.radial-bar .text']
        },
        {
            id: '#contact',
            elements: ['.input-box .btn']
        }
    ];

    const nav = document.querySelectorAll('.nav-links a');
    const navLinks1 = document.querySelectorAll('.nav-links1 a');

    let skillsAnimationTriggered = false;

    nav.forEach(link => {
        link.addEventListener('click', handleNavigation);
    });

    navLinks1.forEach(link => {
        link.addEventListener('click', handleNavigation);
    });

    function handleNavigation(event) {
        event.preventDefault();
        const targetId = event.target.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });

            const animatedSection = animatedSections.find(section => section.id === targetId);
            if (animatedSection) {
                const animatedElements = targetSection.querySelectorAll(animatedSection.elements.join(', '));

                if (targetId !== '#skills' || !skillsAnimationTriggered) {
                    resetAndTriggerAnimations(animatedElements);

                    if (targetId === '#skills') {
                        skillsAnimationTriggered = true;
                    }
                }
            }
        }
    } 

    function resetAndTriggerAnimations(elements) {
        elements.forEach(element => {
            const originalAnimation = window.getComputedStyle(element).animation;

            element.style.animation = 'none';
            element.offsetHeight;
            element.style.animation = originalAnimation;
        });
    }

    const container1Bars = document.querySelectorAll('.Technical-bars .bar');
    const container2 = document.getElementById('skills-container2');

    if (container1Bars.length > 0 && container2) {
        const totalDelay = container1Bars.length * 1 + 1;

        setTimeout(() => {
            container2.style.display = 'block';
        }, totalDelay * 1000);
    }
});
