/* Premium Visual Effects Engine for Nova Academy */

document.addEventListener('DOMContentLoaded', () => {
  // Page load fade-in
  document.body.classList.add('loaded');

  // Intersection Observer for Reveal animations
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        if (entry.target.dataset.repeat !== "true") {
          observer.unobserve(entry.target);
        }
      }
    });
  };

  const revealObserver = new IntersectionObserver(revealCallback, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-group');
  reveals.forEach(el => revealObserver.observe(el));

  // Magnetic Buttons Effect
  const magneticButtons = document.querySelectorAll('.magnetic');
  magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const { left, top, width, height } = btn.getBoundingClientRect();
      const x = (e.clientX - left - width / 2) * 0.35;
      const y = (e.clientY - top - height / 2) * 0.35;
      
      btn.style.transform = `translate(${x}px, ${y}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });

  // Parallax Background Elements (Optional if parallax tags exist)
  window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach(el => {
      const speed = el.dataset.speed || 0.5;
      const offset = window.pageYOffset * speed;
      el.style.transform = `translateY(${offset}px)`;
    });
  });

  // Smooth Navigation for internal links (already supported via scroll-smooth class, but added as fallback)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Ripple Effect for Buttons
  const createRipple = (e) => {
    const button = e.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${e.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) ripple.remove();

    button.appendChild(circle);
  };

  const rippleButtons = document.querySelectorAll('.ripple-btn');
  rippleButtons.forEach(btn => btn.addEventListener('click', createRipple));
});
