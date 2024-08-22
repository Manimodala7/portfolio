const menuIcon = document.querySelector('#menu-icon')
const navLinks = document.querySelector('.nav-links')

menuIcon.onclick = () => {
    navLinks.classList.toggle('active')
}

var typed = new Typed(".texted", {
    strings: ["Software Developer", "Web Developer"],
    typeSpeed: 100,
    backSpeed:100,
    backDelay: 1000,
    loop: true
})

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

let skillsAnimationTriggered = false; // Flag to check if skills animation is triggered

nav.forEach(link => {
    link.addEventListener('click', handleNavigation);
});

navLinks1.forEach(link => {
    link.addEventListener('click', handleNavigation);
});

function handleNavigation(event) {
    event.preventDefault(); // Prevent the default anchor behavior
    const targetId = event.target.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    targetSection.scrollIntoView({ behavior: 'smooth' });

    const animatedSection = animatedSections.find(section => section.id === targetId);
    if (animatedSection) {
        const animatedElements = targetSection.querySelectorAll(animatedSection.elements.join(', '));

        // Trigger animations if not already triggered for skills section
        if (targetId !== '#skills' || !skillsAnimationTriggered) {
            resetAndTriggerAnimations(animatedElements);

            // Set skillsAnimationTriggered to true after triggering
            if (targetId === '#skills') {
                skillsAnimationTriggered = true;
            }
        }
    }
}

function resetAndTriggerAnimations(elements) {
    elements.forEach(element => {
        const originalAnimation = window.getComputedStyle(element).animation;

        element.style.animation = 'none'; // Temporarily set animation to none
        element.offsetHeight; // Trigger reflow
        element.style.animation = originalAnimation; // Restore original animation
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const container1Bars = document.querySelectorAll('.Technical-bars .bar');
    const container2 = document.getElementById('skills-container2');

    // Calculate total time for container1 animations
    const totalDelay = container1Bars.length * 1 + 1; // Each bar takes 1s + delay, added 1s for heading animation

    // Set a timeout to reveal container2 after container1 animations are done
    setTimeout(() => {
        container2.style.display = 'block'; // Show container2
    }, totalDelay * 1000);
});
