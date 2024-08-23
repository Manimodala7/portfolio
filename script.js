document.addEventListener('DOMContentLoaded', function() {
    const interactiveElements = document.querySelectorAll('.logo, li a, .visit-btn, .about img, .btn, .btn-group .btn, .socials i, .grid-card, .project-card, .publication-card, .heading1');
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
                e.preventDefault();
                handleInteraction(this, true);
            });
        }
    });

    if (isTouchDevice) {
        document.addEventListener('touchstart', function(e) {
            if (!e.target.closest('.logo, li a, .visit-btn, .about img, .btn, .btn-group .btn, .socials i, .grid-card, .project-card, .publication-card, .heading1')) {
                interactiveElements.forEach(element => element.classList.remove('touch-active'));
            }
        });
    }
    
    const menuIcon = document.querySelector('#menu-icon');
    const navLinks = document.querySelector('.nav-links');

    menuIcon.onclick = () => {
        navLinks.classList.toggle('active');
    }

    var typed = new Typed(".texted", {
        strings: ["Software Developer", "Web Developer"],
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: true
    });

    let sections = document.querySelectorAll('section');
    let Links = document.querySelectorAll('header ul li a');

    window.onscroll = () => {
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
    };

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
