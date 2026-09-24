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

  // Background videos autoplay from their HTML attributes. For reduced motion or Data Saver,
  // stop them and keep the poster image.
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = navigator.connection && navigator.connection.saveData;
  document.querySelectorAll('video.bg-video').forEach((video) => {
    if (reduceMotion || saveData) {
      video.pause();
      video.removeAttribute('autoplay');
      video.preload = 'none';
      return;
    }
    video.muted = true; // Some browsers only honor autoplay when muted is set as a property.
    video.play().catch(() => {});
  });

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
