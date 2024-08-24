document.addEventListener('DOMContentLoaded', function() {
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

    menuIcon.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Navigation and smooth scrolling
    const allLinks = document.querySelectorAll('a[href^="#"]');
    
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
                navLinks.classList.remove('active'); // Close mobile menu
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
    var typed = new Typed(".texted", {
        strings: ["Software Developer", "Web Developer"],
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: true
    });

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

    function hideProgress() {
        progressBars.forEach(p => {
            p.style.opacity = 0;
            p.style.width = 0;
        });

        radialBars.forEach(r => {
            r.style.strokeDashoffset = r.getAttribute('r') * 2 * Math.PI;
        });
    }

    window.addEventListener('scroll', () => {
        const sectionPos = skillsSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 2;

        if(sectionPos < screenPos) {
            showProgress();
        } else {
            hideProgress();
        }
    });

   const form = document.querySelector('.input-box form');
    const emailInput = document.querySelector('.input-box input[type="text"]');
    const submitButton = document.querySelector('.input-box .btn');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent the form from submitting normally
            handleSubmit();
        });
    }

    if (submitButton) {
        submitButton.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default button behavior
            handleSubmit();
        });
    }

    function handleSubmit() {
        // Basic email validation
        const email = emailInput.value.trim();
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Open Gmail compose window in a new tab
        const to = 'manwithmodala37@gmail.com'; // Your pre-composed email
        const subject = encodeURIComponent('New Subscription');
        const body = encodeURIComponent(`New subscriber email: ${email}`);
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${body}`;
        window.open(gmailUrl, '_blank');

        // Clear the input field after opening Gmail
        emailInput.value = '';
    }

    // Function to validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    
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
