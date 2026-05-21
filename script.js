/* ===========================
   ZEB CLIENT — JavaScript
   =========================== */

document.addEventListener('DOMContentLoaded', () => {

  // ─── SKINVIEW3D — 3D TEAM RENDERS ───────────────────
  function initSkinViewers() {
    if (typeof skinview3d === 'undefined') return;

    const members = [
      {
        id: 'skin-minecmasters',
        skin: 'assets/minecmasters.png',
        animation: 'walk',   // walking pose
        animSpeed: 0.6
      },
      {
        id: 'skin-itsmerishi',
        skin: 'assets/itsmerishi4228.png',
        animation: 'run',    // running pose
        animSpeed: 0.9
      },
      {
        id: 'skin-altsensei',
        skin: 'assets/altsensei.png',
        animation: 'idle',   // idle pose
        animSpeed: 0.4
      }
    ];

    members.forEach(({ id, skin, animation, animSpeed }) => {
      const canvas = document.getElementById(id);
      if (!canvas) return;

      const viewer = new skinview3d.SkinViewer({
        canvas,
        width: 180,
        height: 250,
        skin,
      });

      // Transparent background so our CSS gradient shows
      viewer.renderer.setClearColor(0x000000, 0);

      // Subtle global light
      viewer.globalLight.intensity = 3;
      viewer.cameraLight.intensity = 1;

      // Slight camera angle
      viewer.camera.rotation.x = -0.2;
      viewer.camera.position.y = 20;
      viewer.camera.position.z = 55;

      // Set animation per member
      if (animation === 'walk') {
        const anim = viewer.animations.add(skinview3d.WalkingAnimation);
        anim.speed = animSpeed;
      } else if (animation === 'run') {
        const anim = viewer.animations.add(skinview3d.RunningAnimation);
        anim.speed = animSpeed;
      } else if (animation === 'idle') {
        // Idle — just slow rotate
        viewer.autoRotate = true;
        viewer.autoRotateSpeed = 0.5;
      }

      // Pause/resume on hover for idle effect
      canvas.addEventListener('mouseenter', () => {
        viewer.autoRotate = animation !== 'idle';
      });
      canvas.addEventListener('mouseleave', () => {
        viewer.autoRotate = animation === 'idle';
      });
    });
  }

  // Wait for skinview3d to load
  if (document.readyState === 'complete') {
    initSkinViewers();
  } else {
    window.addEventListener('load', initSkinViewers);
  }

  // ─── CUSTOM CURSOR ──────────────────────────────────
  const cursor = document.getElementById('cursor');
  const cursorOuter = document.getElementById('cursor-outer');
  let mouseX = 0, mouseY = 0;
  let outerX = 0, outerY = 0;

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
