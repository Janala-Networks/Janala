document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for scroll-reveal animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .region-card, .section-title').forEach(el => {
        el.classList.add('reveal-item');
        observer.observe(el);
    });

    // Simple scroll animation for header
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            header.style.padding = '12px 0';
            header.style.background = 'rgba(10, 25, 47, 0.98)';
            header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        } else {
            header.style.padding = '20px 0';
            header.style.background = 'transparent';
            header.style.boxShadow = 'none';
        }
    });

    // Nav Toggle for Mobile
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Contact form handling (Replaced by Google Form iframe)
    /* 
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        // Formspree logic removed
    }
    */

    // Thank You Modal Logic
    const thankYouModal = document.getElementById('thank-you-modal');
    const closeModal = document.querySelector('.close-modal');
    // Select all iframes that are inside a contact-wrapper or specific sections
    const formIframes = document.querySelectorAll('iframe:not(#hidden_iframe)');
    const contactForm = document.getElementById('contact-form');
    const hiddenIframe = document.getElementById('hidden_iframe');

    if (thankYouModal) {
        // Handle Google Form Iframes (Legacy/Membership)
        if (formIframes.length > 0) {
            formIframes.forEach(iframe => {
                let loadCount = 0;
                iframe.onload = () => {
                    loadCount++;
                    if (loadCount > 1) {
                        thankYouModal.classList.add('show');
                        thankYouModal.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                };
            });
        }

        // Handle Custom Contact Form via Hidden Iframe
        if (contactForm && hiddenIframe) {
            let submitted = false;
            contactForm.onsubmit = () => {
                submitted = true;
            };

            hiddenIframe.onload = () => {
                if (submitted) {
                    thankYouModal.classList.add('show');
                    thankYouModal.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    contactForm.reset();
                    submitted = false;
                }
            };
        }

        // Close modal logic
        if (closeModal) {
            closeModal.onclick = () => {
                thankYouModal.classList.remove('show');
            };
        }

        window.onclick = (event) => {
            if (event.target == thankYouModal) {
                thankYouModal.classList.remove('show');
            }
        };
    }
});
