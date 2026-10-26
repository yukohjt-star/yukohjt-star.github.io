(() => {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  if (preference.matches || !('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.remove('reveal-pending');
      entry.target.classList.add('reveal-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.feature, .essay, .frames figure, .credit, .spotlight-copy, .spotlight-strip, .about-section-intro, .bts-sequence figure').forEach(el => {
    if (el.getBoundingClientRect().top < innerHeight) return;
    el.classList.add('reveal', 'reveal-pending');
    observer.observe(el);
  });
  preference.addEventListener('change', () => {
    if (!preference.matches) return;
    observer.disconnect();
    document.querySelectorAll('.reveal-pending').forEach(el => el.classList.remove('reveal-pending'));
  });
})();
// A slim reading indicator follows the visitor's progress through the portfolio.
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  if (reduced.matches) return;
  const bar = document.createElement('div');
  bar.className = 'reading-progress';
  bar.setAttribute('aria-hidden', 'true');
  document.body.append(bar);
  let pending = false;
  const draw = () => {
    const distance = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${distance > 0 ? Math.min(1, Math.max(0, scrollY / distance)) : 0})`;
    pending = false;
  };
  addEventListener('scroll', () => {
    if (!pending) { pending = true; requestAnimationFrame(draw); }
  }, {passive:true});
  addEventListener('resize', draw);
  draw();
})();
// Visitors can pause the moving film strip; keyboard focus pauses it too.
(() => {
 const ribbon=document.querySelector('.film-ribbon');
 const button=ribbon?.querySelector('.motion-toggle');
 button?.addEventListener('click',()=>{
  const paused=ribbon.classList.toggle('is-paused');
  button.setAttribute('aria-pressed',String(paused));
  button.textContent=paused?'Resume motion':'Pause motion';
 });
})();
