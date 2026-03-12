document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio loaded successfully');
    
    // Typing Animation
    const typedText = document.querySelector('.typed-text');
    const words = ['websites', 'apps', 'solutions', 'experiences'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeInterval;

    function type() {
        if (!typedText) return;
        
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typedText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeInterval = setTimeout(type, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeInterval = setTimeout(type, 500);
        } else {
            typeInterval = setTimeout(type, isDeleting ? 50 : 100);
        }
    }
    
    type();

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Skill Bars Animation
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
            }
        });
    }

    window.addEventListener('scroll', animateSkillBars);
    animateSkillBars();

    // Counter Animation for Stats
    const statNumbers = document.querySelectorAll('.stat-number');

    function animateCounters() {
        statNumbers.forEach(counter => {
            const rect = counter.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100 && !counter.classList.contains('animated')) {
                counter.classList.add('animated');
                const target = parseInt(counter.getAttribute('data-count'));
                let count = 0;
                const duration = 2000;
                const increment = target / (duration / 16);
                
                function updateCount() {
                    count += increment;
                    if (count < target) {
                        counter.textContent = Math.floor(count);
                        requestAnimationFrame(updateCount);
                    } else {
                        counter.textContent = target;
                    }
                }
                
                updateCount();
            }
        });
    }

    window.addEventListener('scroll', animateCounters);
    animateCounters();

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Form Submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            btn.textContent = 'Sent!';
            btn.style.background = '#22c55e';
            setTimeout(() => {
                contactForm.reset();
                btn.textContent = 'Send Message';
                btn.style.background = '';
            }, 2000);
        });
    }

    // Scroll Indicator Click
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
        });
    }
});
