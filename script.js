document.addEventListener('DOMContentLoaded', function() {
    const interactiveElements = document.querySelectorAll('.logo, .nav-links li a, .visit-btn, .about img, .btn, .btn-group .btn, .socials i, .grid-card, .project-card, .publication-card, .heading1');
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

    function handleInteraction(element, isTouch) {
        if (isTouch) {
            interactiveElements.forEach(el => {
                if (el !== element) el.classList.remove('touch-active');
            });
            element.classList.toggle('touch-active');
        }
    }

    interactiveElements.forEach(element => {
        if (isTouchDevice) {
            element.addEventListener('touchstart', function(e) {
                if (!this.classList.contains('btn') && !this.classList.contains('visit-btn')) {
                    e.preventDefault();
                }
                handleInteraction(this, true);
            });
        }
    });

    // Handle menu icon click
    const menuIcon = document.querySelector('#menu-icon');
    const navLinks = document.querySelector('.nav-links');

    menuIcon.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Handle navigation link clicks
    const navLinksList = document.querySelectorAll('.nav-links li a, .nav-links1 li a');
    navLinksList.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                navLinks.classList.remove('active'); // Close mobile menu after click
            }
        });
    });

    // Your existing code for typed text, scroll effects, etc.
    var typed = new Typed(".texted", {
        strings: ["Software Developer", "Web Developer"],
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: true
    });

    // Scroll effects
    let sections = document.querySelectorAll('section');
    let Links = document.querySelectorAll('header ul li a');

    window.addEventListener('scroll', () => {
        sections.forEach(sec => {
            let top = window.scrollY;
            let offset = sec.offsetTop - 150;
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id');

            if (top >= offset && top < offset + height) {
                Links.forEach(link => {
                    link.classList.remove('active');
                    document.querySelector('header ul li a[href*=' + id + ']').classList.add('active');
                });
            }
        });
    });

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

    const totalDelay = container1Bars.length * 1 + 1;

    setTimeout(() => {
        container2.style.display = 'block';
    }, totalDelay * 1000);
});
