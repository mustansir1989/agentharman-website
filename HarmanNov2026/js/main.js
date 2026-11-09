// ========================================
// CONTACT FORM PLACEHOLDER
// ========================================

//document.querySelectorAll('.contact-form').forEach(form => {
  //form.addEventListener('submit', event => {
    //event.preventDefault();

//    alert(
  //    'Connect this form to the chosen form/email service before launch.'
    //);
  //});
//});


// ========================================
// MAIN PAGE FUNCTIONALITY
// ========================================

document.addEventListener('DOMContentLoaded', () => {


  // ========================================
  // RECENTLY SOLD - CONTINUOUS CAROUSEL
  // ========================================

  const carousel = document.querySelector('.property-carousel');
  const track = document.querySelector('.property-track');

  if (carousel && track) {

    const originals = Array.from(track.children);

    originals.forEach(property => {
      const clone = property.cloneNode(true);

      clone.setAttribute('aria-hidden', 'true');

      track.appendChild(clone);
    });


    let position = 0;
    let paused = false;

    const speed = 0.4;


    function animatePropertyCarousel() {

      if (!paused) {

        position += speed;

        const resetPoint =
          track.scrollWidth / 2;


        if (position >= resetPoint) {
          position = 0;
        }


        track.style.transform =
          `translate3d(-${position}px, 0, 0)`;
      }


      requestAnimationFrame(
        animatePropertyCarousel
      );
    }


    carousel.addEventListener(
      'mouseenter',
      () => {
        paused = true;
      }
    );


    carousel.addEventListener(
      'mouseleave',
      () => {
        paused = false;
      }
    );


    animatePropertyCarousel();
  }



  // ========================================
  // CLIENT TESTIMONIALS - MANUAL CAROUSEL
  // ========================================

  const testimonialCarousel =
    document.querySelector(
      '.testimonial-carousel'
    );

  const testimonialViewport =
    document.querySelector(
      '.testimonial-viewport'
    );

  const testimonialTrack =
    document.querySelector(
      '.testimonial-track'
    );

  const testimonialSlides =
    Array.from(
      document.querySelectorAll(
        '.testimonial-slide'
      )
    );

  const previousButton =
    document.querySelector(
      '.testimonial-prev'
    );

  const nextButton =
    document.querySelector(
      '.testimonial-next'
    );

  const dots =
    Array.from(
      document.querySelectorAll(
        '.testimonial-dot'
      )
    );


  if (
    testimonialCarousel &&
    testimonialViewport &&
    testimonialTrack &&
    testimonialSlides.length
  ) {

    let activeIndex = 0;

    let pointerStartX = null;



    // ========================================
    // CENTER CURRENT TESTIMONIAL
    // ========================================

    function centerActiveSlide(
      animate = true
    ) {

      const activeSlide =
        testimonialSlides[activeIndex];


      testimonialTrack.style.transition =
        animate
          ? 'transform .55s cubic-bezier(.22,.61,.36,1)'
          : 'none';


      const viewportCenter =
        testimonialViewport.clientWidth / 2;


      const slideCenter =
        activeSlide.offsetLeft +
        activeSlide.offsetWidth / 2;


      const translateX =
        viewportCenter - slideCenter;


      testimonialTrack.style.transform =
        `translate3d(${translateX}px, 0, 0)`;


      testimonialSlides.forEach(
        (slide, index) => {

          const isActive =
            index === activeIndex;


          slide.classList.toggle(
            'active',
            isActive
          );


          slide.setAttribute(
            'aria-hidden',
            String(!isActive)
          );
        }
      );


      dots.forEach(
        (dot, index) => {

          const isActive =
            index === activeIndex;


          dot.classList.toggle(
            'active',
            isActive
          );


          dot.setAttribute(
            'aria-current',
            isActive
              ? 'true'
              : 'false'
          );
        }
      );
    }



    // ========================================
    // SHOW SELECTED TESTIMONIAL
    // ========================================

    function showTestimonial(index) {

      if (index < 0) {

        activeIndex =
          testimonialSlides.length - 1;

      }

      else if (
        index >= testimonialSlides.length
      ) {

        activeIndex = 0;

      }

      else {

        activeIndex = index;

      }


      centerActiveSlide(true);
    }



    if (previousButton) {

      previousButton.addEventListener(
        'click',
        () => {

          showTestimonial(
            activeIndex - 1
          );

        }
      );
    }



    if (nextButton) {

      nextButton.addEventListener(
        'click',
        () => {

          showTestimonial(
            activeIndex + 1
          );

        }
      );
    }



    dots.forEach(
      (dot, index) => {

        dot.addEventListener(
          'click',
          () => {

            showTestimonial(index);

          }
        );

      }
    );



    // ========================================
    // MOBILE SWIPE
    // ========================================

    testimonialViewport.addEventListener(
      'pointerdown',
      event => {

        pointerStartX =
          event.clientX;

      }
    );


    testimonialViewport.addEventListener(
      'pointerup',
      event => {

        if (
          pointerStartX === null
        ) {
          return;
        }


        const distance =
          event.clientX -
          pointerStartX;


        pointerStartX = null;


        if (
          Math.abs(distance) < 45
        ) {
          return;
        }


        if (distance < 0) {

          showTestimonial(
            activeIndex + 1
          );

        }

        else {

          showTestimonial(
            activeIndex - 1
          );

        }

      }
    );


    testimonialViewport.addEventListener(
      'pointercancel',
      () => {

        pointerStartX = null;

      }
    );



    window.addEventListener(
      'resize',
      () => {

        centerActiveSlide(false);

      }
    );



    requestAnimationFrame(
      () => {

        centerActiveSlide(false);

      }
    );
  }



  // ========================================
  // COLLAPSED SIDE NAVIGATION
  // ========================================

  const menuToggle =
    document.querySelector(
      '.floating-menu-toggle'
    );

  const sideMenu =
    document.querySelector(
      '.side-menu'
    );

  const sideMenuClose =
    document.querySelector(
      '.side-menu-close'
    );

  const sideMenuOverlay =
    document.querySelector(
      '.side-menu-overlay'
    );

  const heroSection =
    document.querySelector(
      '.hero'
    );

  const sideMenuLinks =
    document.querySelectorAll(
      '.side-menu a[href^="#"]'
    );



  // ========================================
  // OPEN SIDE MENU
  // ========================================

  function openSideMenu() {

    if (
      !menuToggle ||
      !sideMenu ||
      !sideMenuOverlay
    ) {
      return;
    }


    sideMenu.classList.add(
      'open'
    );

    sideMenuOverlay.classList.add(
      'open'
    );

    document.body.classList.add(
      'menu-open'
    );


    sideMenu.setAttribute(
      'aria-hidden',
      'false'
    );

    sideMenuOverlay.setAttribute(
      'aria-hidden',
      'false'
    );

    menuToggle.setAttribute(
      'aria-expanded',
      'true'
    );

    menuToggle.setAttribute(
      'aria-label',
      'Close navigation menu'
    );
  }



  // ========================================
  // CLOSE SIDE MENU
  // ========================================

  function closeSideMenu() {

    if (
      !menuToggle ||
      !sideMenu ||
      !sideMenuOverlay
    ) {
      return;
    }


    sideMenu.classList.remove(
      'open'
    );

    sideMenuOverlay.classList.remove(
      'open'
    );

    document.body.classList.remove(
      'menu-open'
    );


    sideMenu.setAttribute(
      'aria-hidden',
      'true'
    );

    sideMenuOverlay.setAttribute(
      'aria-hidden',
      'true'
    );

    menuToggle.setAttribute(
      'aria-expanded',
      'false'
    );

    menuToggle.setAttribute(
      'aria-label',
      'Open navigation menu'
    );
  }



  // ========================================
  // SHOW FLOATING MENU AFTER HERO
  // ========================================

  function updateFloatingMenuVisibility() {

    if (
      !menuToggle ||
      !heroSection
    ) {
      return;
    }


    if (
      window.innerWidth <= 800
    ) {

      menuToggle.classList.add(
        'visible'
      );

      return;
    }


    const heroBottom =
      heroSection.offsetTop +
      heroSection.offsetHeight;


    const shouldShow =
      window.scrollY >
      heroBottom - 120;


    menuToggle.classList.toggle(
      'visible',
      shouldShow
    );


    if (!shouldShow) {

      closeSideMenu();

    }
  }



  // ========================================
  // MENU BUTTON
  // ========================================

  if (menuToggle) {

    menuToggle.addEventListener(
      'click',
      () => {

        const isOpen =
          sideMenu &&
          sideMenu.classList.contains(
            'open'
          );


        if (isOpen) {

          closeSideMenu();

        }

        else {

          openSideMenu();

        }

      }
    );
  }



  if (sideMenuClose) {

    sideMenuClose.addEventListener(
      'click',
      closeSideMenu
    );

  }



  if (sideMenuOverlay) {

    sideMenuOverlay.addEventListener(
      'click',
      closeSideMenu
    );

  }



  sideMenuLinks.forEach(link => {

    link.addEventListener(
      'click',
      closeSideMenu
    );

  });



  document.addEventListener(
    'keydown',
    event => {

      if (
        event.key === 'Escape'
      ) {

        closeSideMenu();

      }

    }
  );



  window.addEventListener(
    'scroll',
    updateFloatingMenuVisibility,
    {
      passive: true
    }
  );



  window.addEventListener(
    'resize',
    updateFloatingMenuVisibility
  );



  updateFloatingMenuVisibility();

});