/* ===========================
   ZEB CLIENT — JavaScript
   =========================== */

document.addEventListener('DOMContentLoaded', () => {



  // ─── CUSTOM CURSOR ──────────────────────────────────
  const cursor = document.getElementById('cursor');
  const cursorOuter = document.getElementById('cursor-outer');
  let mouseX = 0, mouseY = 0;
  let outerX = 0, outerY = 0;

  // ── SKINVIEW3D: 3D skin renders using Base64 Data URIs (CORS-safe and network-independent) ──
  function initSkinViewers() {
    if (typeof skinview3d === 'undefined') return;

    const SKINS = {
      'skin-minecmasters': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAABSlBMVEUAAAAAAAAAAAEAAQAAAQEBAAABAQECAgIDAwMEBAQFBQUGBgYHBwcICAgJCQkKCgoLCwsMDAwNDQ0REBApKSkqKSoqKiorFAgrFAkrKisrKyssKywsLCwtLC0tLS0uLC4uLS4uLi4wLjAwLzAwMDAxMDExMTEyMDMyMjIzMTMzMzM0MzQ0NDQ1MzU1NTU2NjY3Nzc4Njg4ODg5Nzk5OTk6Ojo7OTw7Ojs7Ozs8Ojw9Oz09PT0+Oz4+Pj4/PT8/Pz9AP0BBQEFBQUFCQkJDQkNFLhxFLxxFLx1IAABKNCBKNCFKNSFLNCFMMRlNMBlNMRhNMRlOOSdPOCdPOSZPOSdRAABWAABZAABfAABiAABqAABuVD5uVD9vVD5vVT5wDg51ExOBHx+skhyskxyskx2tkxyvr6/y8vL427v52rv527v/KUf/1in////VlJ7RAAAAAXRSTlMAQObYZgAABAVJREFUWMPtlmlj3DQQhldAbUXHSLQQrpT7SEMpV8NRCJSjDlET6jSGQMEcWXK52f//lXdke+NNWG+Wz5mN5Uvz6J2RYs1g0Nj9fD2wicYG81rI861wL+8FhH5AFrI8z6YDWN8MQN4bQujXkOfwz/tC4PF7NERvqOgF9MUQNrNQ5OH+VAD7bs4AwIppAPGkEE+0L8UV0RGWZUUIWycnJ48fo4mZhCGeDW4Hw8FwONgTw2H7x/ex2d/nFh0LTF9oASe4LnCEbZCRlGFjg9ju1af9vb14/gfPt7LsAQYaz3/YyfMHGR4U+U7+MGuDHosX56cPVhRH7fsqbP8YioKFFbwynqsNjtFbiPr+efyiAbCN8apqDKiwHPN1nlKQ1+9x+iFDjOrXI9HMxXhSOdKq6gKqCokN4SEkANF0i76Rwneb7ZoMcQVWZwBHFS8q6IKKos3BFTGCdXOwsRHh7H+MX1cBawg7BeuYTOJTXUBnUVmt9fIbH9xq75WP1py8b597531ZVtW5Vai1pTum17edXf7D/DbCW3Ms3F2/PBPio4OgcwJGjxe+eXbogYFIBEVmERgYyOMboeXD4aPfwYAxgi/3IIwo3AR1YY3SqyGitUumcwTvhDw53Hx2O/ATAksJIZHDBkDEA/kobzIMiEtY5663wfvTLnwfe6kkFSjtvlCMNAHUSqOWCJa0kkU+EkjLRcPzhb+sxOd7bOhBtGOABIKfwSHdC0Kkkxw1hGLGAl+i4+xefjTe6lqF0C0AoAKhJgHM6YYBzQmJMQH7+6ekI0C2AFagW4DoAsgB40knKAEoYAJ9fa92nCiwhTFZFZwGkpXQtwCcpOrNEcS0qiLQmB0igQyh8dAGQLiW3ML5uAVetZmc+tMdkYx0YTiDyhSXTBcjamf1hlvvDT17DNOo6o8wZnbExIHp/+o6sBUjZLGIlTpcAA00J+70s/yjL3/iyHAOuf/jSyrd3Vt994ePlpeX3Vj5nDyGUkJgP0f5PSCmiV1l/LY6rDuDSLu3SLq3P8C2337z+6u3TTdX5ap6PCD71em3ttVvduqA6ngPgyNo3Vxe/6G7r8ylAwbC69v6X/wuAwQ2XAdiJ+NQUBNTcd+qCaZYqbEikUm2MNc5JlAMAOquICxDnZivAJqxtLBrgbwVvZvZcZ7Lh+ILgaQ2PvsgsQGpkTiUVAA4BlgdHdb7wGk2nFjrEDYkN4CtLogIEENUwOQvwagWIHy7iKANMH2DYClhBhAuqlQ7BwAJyU8EkwjF1VcF8T6AIXIbADXCCJu+rFqQD4wnSgjGYBFMhMgqSk56t2eptYFfQquvvVJ7Y2      'skin-itsmerishi': 'data:image/png;base64,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',
      'skin-altsensei': 'data:image/png;base64,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'
    };

    const members = [
      { id: 'skin-minecmasters', skin: SKINS['skin-minecmasters'] },
      { id: 'skin-itsmerishi',   skin: SKINS['skin-itsmerishi'] },
      { id: 'skin-altsensei',    skin: SKINS['skin-altsensei'] },
    ];

    members.forEach(({ id, skin }) => {
      const canvas = document.getElementById(id);
      if (!canvas) return;

      const viewer = new skinview3d.SkinViewer({ canvas, width: 220, height: 320 });
      viewer.renderer.setClearColor(0x000000, 0);
      viewer.globalLight.intensity = 4;
      viewer.cameraLight.intensity = 0.8;

      viewer.loadSkin(skin);

      const walk = viewer.animations.add(skinview3d.WalkingAnimation);
      walk.speed = 0.8;

      viewer.autoRotate      = true;
      viewer.autoRotateSpeed = 0.4;
    });
  }

  window.addEventListener('load', initSkinViewers);

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  function animateCursorOuter() {
    outerX += (mouseX - outerX) * 0.12;
    outerY += (mouseY - outerY) * 0.12;
    cursorOuter.style.left = outerX + 'px';
    cursorOuter.style.top = outerY + 'px';
    requestAnimationFrame(animateCursorOuter);
  }
  animateCursorOuter();

  document.querySelectorAll('a, button, [role="button"], .gallery-item, .chip, .team-card, .about-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hovering');
      cursorOuter.classList.add('hovering');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hovering');
      cursorOuter.classList.remove('hovering');
    });
  });

  // ─── NAV SCROLL ─────────────────────────────────────
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav-links a');
  const navIndicator = document.getElementById('nav-indicator');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  });

  // Nav hover indicator
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      const rect = link.getBoundingClientRect();
      const navRect = link.closest('.nav-links').getBoundingClientRect();
      navIndicator.style.opacity = '1';
      navIndicator.style.left = (rect.left - navRect.left) + 'px';
      navIndicator.style.width = rect.width + 'px';
      navIndicator.style.top = '0';
      navIndicator.style.height = '100%';
    });
  });

  document.querySelector('.nav-links').addEventListener('mouseleave', () => {
    navIndicator.style.opacity = '0';
  });

  // Mobile nav toggle
  const navToggle = document.getElementById('nav-toggle');
  const navMobile = document.getElementById('nav-mobile');
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navMobile.classList.toggle('open');
  });
  navMobile.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navMobile.classList.remove('open');
    });
  });

  // ─── SCROLL ANIMATIONS (AOS-like) ───────────────────
  const aosEls = document.querySelectorAll('[data-aos]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add('visible'), parseInt(delay));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  aosEls.forEach(el => observer.observe(el));

  // ─── COUNTER ANIMATION ──────────────────────────────
  function animateCounter(el, target, duration = 1800) {
    let start = 0;
    const step = timestamp => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4); // ease-out quartic
      el.textContent = Math.floor(ease * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    };
    requestAnimationFrame(step);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.target || entry.target.dataset.count);
        animateCounter(entry.target, target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.counter, [data-count]').forEach(el => {
    counterObserver.observe(el);
  });

  // ─── HERO HEADING ANIMATION ─────────────────────────
  const heroHeading = document.getElementById('hero-heading');
  if (heroHeading) {
    heroHeading.style.opacity = '0';
    heroHeading.style.transform = 'translateY(30px)';
    setTimeout(() => {
      heroHeading.style.transition = 'opacity 0.9s ease, transform 0.9s ease';
      heroHeading.style.opacity = '1';
      heroHeading.style.transform = 'translateY(0)';
    }, 200);
  }

  // Hero p and actions
  const heroBadge = document.querySelector('.hero-badge');
  const heroP = document.querySelector('.hero-p');
  const heroActions = document.querySelector('.hero-actions');
  const heroShowcase = document.querySelector('.hero-showcase');

  [heroBadge, heroP, heroActions, heroShowcase].forEach((el, i) => {
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    setTimeout(() => {
      el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 300 + i * 150);
  });

  // ─── GALLERY / SHOWCASE ─────────────────────────────
  const galleryTrack = document.getElementById('gallery-track');
  const galleryPrev = document.getElementById('gallery-prev');
  const galleryNext = document.getElementById('gallery-next');
  const galleryDotsWrap = document.getElementById('gallery-dots');

  if (galleryTrack) {
    const items = galleryTrack.querySelectorAll('.gallery-item');
    let currentIndex = 0;

    // Build dots
    items.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = 'gallery-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => scrollToItem(i));
      galleryDotsWrap.appendChild(dot);
    });

    function updateDots() {
      galleryDotsWrap.querySelectorAll('.gallery-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    function scrollToItem(index) {
      currentIndex = Math.max(0, Math.min(index, items.length - 1));
      const item = items[currentIndex];
      item.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      // Scroll within track
      const itemLeft = item.offsetLeft - galleryTrack.offsetLeft;
      galleryTrack.scrollTo({ left: itemLeft - 48, behavior: 'smooth' });
      updateDots();
    }

    galleryNext.addEventListener('click', () => scrollToItem(currentIndex + 1));
    galleryPrev.addEventListener('click', () => scrollToItem(currentIndex - 1));

    // Track scroll position to update dots
    galleryTrack.addEventListener('scroll', () => {
      const scrollLeft = galleryTrack.scrollLeft;
      let closestIndex = 0;
      let closestDist = Infinity;
      items.forEach((item, i) => {
        const dist = Math.abs(item.offsetLeft - galleryTrack.offsetLeft - scrollLeft - 48);
        if (dist < closestDist) { closestDist = dist; closestIndex = i; }
      });
      if (closestIndex !== currentIndex) {
        currentIndex = closestIndex;
        updateDots();
      }
    });

    // Keyboard navigation
    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') scrollToItem(currentIndex + 1);
      if (e.key === 'ArrowLeft') scrollToItem(currentIndex - 1);
    });

    // Gallery item lightbox
    items.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const caption = item.dataset.caption;
        if (!img || !img.src) return;
        openLightbox(img.src, caption);
      });
    });
  }

  // ─── LIGHTBOX ───────────────────────────────────────
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');
  const lbCaption = document.getElementById('lb-caption');
  const lbClose = document.getElementById('lb-close');

  function openLightbox(src, caption) {
    lbImg.src = src;
    lbCaption.textContent = caption || '';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lbImg.src = '';
  }

  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', e => {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
  });

  // ─── PARALLAX HERO ORBS ─────────────────────────────
  const orbs = document.querySelectorAll('.hero-orb');
  window.addEventListener('mousemove', e => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;
    orbs.forEach((orb, i) => {
      const factor = (i + 1) * 8;
      orb.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`;
    });
  });

  // ─── MAGNETIC BUTTONS ───────────────────────────────
  document.querySelectorAll('.btn-primary, .btn-ghost, .nav-cta').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.2;
      const dy = (e.clientY - cy) * 0.2;
      btn.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  // ─── ACTIVE NAV LINK ON SCROLL ──────────────────────
  const sections = document.querySelectorAll('section[id]');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { threshold: 0.3 });
  sections.forEach(sec => sectionObserver.observe(sec));

  // ─── SMOOTH CHIP HOVER GLOW ─────────────────────────
  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('mouseenter', () => {
      chip.style.boxShadow = '0 0 16px rgba(139,92,246,0.25)';
    });
    chip.addEventListener('mouseleave', () => {
      chip.style.boxShadow = '';
    });
  });

  // ─── HERO IMAGE TILT ────────────────────────────────
  const heroImg = document.getElementById('hero-img');
  if (heroImg) {
    const heroShowcaseEl = document.querySelector('.hero-showcase');
    heroShowcaseEl && heroShowcaseEl.addEventListener('mousemove', e => {
      const rect = heroShowcaseEl.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width * 6;
      const dy = (e.clientY - cy) / rect.height * 4;
      heroImg.style.transform = `perspective(1200px) rotateX(${-dy}deg) rotateY(${dx}deg) translateY(-6px)`;
    });
    heroShowcaseEl && heroShowcaseEl.addEventListener('mouseleave', () => {
      heroImg.style.transform = '';
    });
  }

  // ─── COMPARE TABLE ROW HOVER ────────────────────────
  document.querySelectorAll('.compare-table tbody tr').forEach(row => {
    row.addEventListener('mouseenter', () => {
      row.style.background = 'rgba(139,92,246,0.05)';
    });
    row.addEventListener('mouseleave', () => {
      row.style.background = '';
    });
  });

});
