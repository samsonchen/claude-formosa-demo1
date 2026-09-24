// Mobile menu toggle and click-to-play video.
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav');
  const menu = document.querySelector('.nav__menu');
  if (nav && menu) {
    menu.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      menu.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('.nav__panel a').forEach((a) => {
      a.addEventListener('click', () => {
        nav.classList.remove('is-open');
        menu.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Home hero background video. Skipped for reduced motion and Data Saver; the photo stays instead.
  const heroVideo = document.querySelector('.hero__video[data-src]');
  const toggle = document.querySelector('.hero__toggle');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = navigator.connection && navigator.connection.saveData;
  if (heroVideo && !reduceMotion && !saveData) {
    heroVideo.addEventListener('playing', () => {
      heroVideo.classList.add('is-playing');
      if (toggle) toggle.hidden = false;
    });
    heroVideo.src = heroVideo.dataset.src;
    heroVideo.muted = true;
    heroVideo.play().catch(() => {}); // Autoplay refused: keep showing the photo.

    if (toggle) {
      toggle.addEventListener('click', () => {
        const pause = !heroVideo.paused;
        if (pause) heroVideo.pause(); else heroVideo.play().catch(() => {});
        toggle.setAttribute('aria-pressed', String(pause));
        toggle.setAttribute('aria-label', pause ? toggle.dataset.labelPlay : toggle.dataset.labelPause);
      });
    }
  }

  document.querySelectorAll('.film[data-src]').forEach((film) => {
    const button = film.querySelector('.play');
    if (!button) return;
    button.addEventListener('click', () => {
      const video = document.createElement('video');
      video.src = film.dataset.src;
      video.controls = true;
      video.playsInline = true;
      video.autoplay = true;
      film.replaceChildren(video);
      video.focus();
    });
  });
});
