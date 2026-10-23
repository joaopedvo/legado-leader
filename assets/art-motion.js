(() => {
  const { gsap, ScrollTrigger } = window;
  if (!gsap || !ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  const media = gsap.matchMedia();
  media.add({ motion: '(prefers-reduced-motion: no-preference)', desktop: '(min-width: 901px)' }, (context) => {
    if (!context.conditions.motion) return;
    const heroCopy = document.querySelector('.hero-copy');
    if (heroCopy) {
      const heroText = gsap.utils.toArray(heroCopy.querySelectorAll('.badge-row, h1, .sub'));
      const heroButtons = gsap.utils.toArray(heroCopy.querySelectorAll('.btns .btn'));
      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
      intro.from(heroText, {
        y: 28, autoAlpha: 0, duration: .8, stagger: .12,
        clearProps: 'transform,opacity,visibility'
      }).from(heroButtons, {
        y: 18, autoAlpha: 0, scale: .97, duration: .65, stagger: .1,
        clearProps: 'transform,opacity,visibility'
      }, '-=.35');
    }
    gsap.fromTo('.hero-photo img', { scale: 1.09 }, {
      scale: 1, duration: 1.7, ease: 'power2.out', clearProps: 'all'
    });

    gsap.utils.toArray('section:not(.hero) h2, section:not(.hero) h3, .quote').forEach((element) => {
      gsap.from(element, {
        y: 32, autoAlpha: 0, duration: .8, ease: 'power3.out',
        scrollTrigger: { trigger: element, start: 'top 88%', once: true },
        clearProps: 'transform,opacity,visibility'
      });
    });

    gsap.utils.toArray('section:not(.hero) .eyebrow, section:not(.hero) .lead').forEach((element) => {
      gsap.from(element, {
        y: element.classList.contains('eyebrow') ? 14 : 24,
        autoAlpha: 0, duration: .72, ease: 'power2.out',
        scrollTrigger: { trigger: element, start: 'top 90%', once: true },
        clearProps: 'transform,opacity,visibility'
      });
    });

    gsap.utils.toArray('section:not(.hero) .btns').forEach((group) => {
      const buttons = gsap.utils.toArray(group.querySelectorAll('.btn'));
      if (!buttons.length) return;
      gsap.from(buttons, {
        y: 18, autoAlpha: 0, scale: .97, duration: .66, stagger: .1,
        ease: 'power2.out', clearProps: 'transform,opacity,visibility',
        scrollTrigger: { trigger: group, start: 'top 92%', once: true }
      });
    });

    gsap.utils.toArray('section:not(.hero) .btn').filter((button) => !button.closest('.btns')).forEach((button) => {
      gsap.from(button, {
        y: 18, autoAlpha: 0, scale: .97, duration: .66,
        ease: 'power2.out', clearProps: 'transform,opacity,visibility',
        scrollTrigger: { trigger: button, start: 'top 92%', once: true }
      });
    });

    gsap.utils.toArray('.g3, .pain:not(.moment-stack), .ladder').forEach((group) => {
      const children = [...group.children];
      if (!children.length) return;
      gsap.from(children, {
        y: 36, autoAlpha: 0, duration: .75, stagger: .1,
        ease: 'power2.out', clearProps: 'all',
        scrollTrigger: { trigger: group, start: 'top 82%', once: true }
      });
    });

    if (context.conditions.desktop) {
      gsap.utils.toArray('.moment-stack > div').forEach((card) => {
        ScrollTrigger.create({
          trigger: card,
          start: 'top 45%',
          end: 'bottom 18%',
          toggleClass: { targets: card, className: 'is-active' }
        });
      });
    }

    gsap.utils.toArray('.method-photo, .book-proof, .book-story-photo, .photo-panel, .journey-photo, .audience-photo').forEach((panel) => {
      const image = panel.querySelector('img');
      if (!image) return;
      gsap.fromTo(image, { scale: 1.12 }, {
        scale: 1, ease: 'none',
        scrollTrigger: { trigger: panel, start: 'top bottom', end: 'bottom top', scrub: .6 }
      });
    });

    const quote = document.querySelector('#p-home > section.s-gold');
    if (quote && context.conditions.desktop) {
      const quoteText = quote.querySelector('.quote');
      gsap.fromTo(quoteText, { scale: .94 }, {
        scale: 1.035, ease: 'none',
        scrollTrigger: { trigger: quote, start: 'top bottom', end: 'bottom top', scrub: .8 }
      });
    }

    window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
  });
})();
