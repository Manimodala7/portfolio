document.addEventListener('DOMContentLoaded', function() {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

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
    const interactiveElements = document.querySelectorAll('.logo, .visit-btn, .about img, .btn, .btn-group .btn, .socials i, .grid-card, .project-card, .publication-card, .heading1');

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
    const skillsSection = document.querySelector('#skills');
    const progressBars = document.querySelectorAll('.progress-line span');
    const radialBars = document.querySelectorAll('.radial-bar .path');

    function showProgress() {
        progressBars.forEach(progressBar => {
            const value = progressBar.dataset.progress;
            progressBar.style.opacity = 1;
            progressBar.style.width = `${value}%`;
        });

        radialBars.forEach(radialBar => {
            const value = radialBar.parentElement.dataset.percent;
            const radius = radialBar.getAttribute('r');
            const circumference = 2 * Math.PI * radius;
            const strokeDashoffset = circumference - (value / 100) * circumference;
            radialBar.style.strokeDasharray = `${circumference} ${circumference}`;
            radialBar.style.strokeDashoffset = strokeDashoffset;
        });
    }

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
});
