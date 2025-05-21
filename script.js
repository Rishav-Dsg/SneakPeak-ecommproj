document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('slider');
  const dots = document.querySelectorAll('.dot');
  const sliderWrapper = document.querySelector('.slider-wrapper');
  const totalSlides = dots.length; // 8 dots = 8 real slides
  let index = 0;
  let interval;

  function updateDots() {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index % totalSlides]?.classList.add('active');
  }

  function moveToSlide(i) {
    index = i;
    slider.style.transition = 'transform 0.5s ease-in-out';
    slider.style.transform = `translateX(-${index * 100}vw)`;
    updateDots();
  }

  function moveToNextSlide() {
    index++;
    slider.style.transition = 'transform 0.5s ease-in-out';
    slider.style.transform = `translateX(-${index * 100}vw)`;

    if (index === totalSlides) {
      setTimeout(() => {
        slider.style.transition = 'none';
        slider.style.transform = 'translateX(0)';
        index = 0;
        updateDots();
      }, 500);
    } else {
      updateDots();
    }
  }

  function startSlider() {
    interval = setInterval(moveToNextSlide, 3000);
  }

  function stopSlider() {
    clearInterval(interval);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      stopSlider();
      moveToSlide(i);
    });
  });

  if (sliderWrapper) {
    sliderWrapper.addEventListener('mouseenter', stopSlider);
    sliderWrapper.addEventListener('mouseleave', startSlider);
  }

  startSlider();

  // Initialize Swiper for category slider
  if (typeof Swiper === 'undefined') {
    console.error('Swiper is not loaded. Check if the Swiper script is included and loaded correctly.');
  } else {
    console.log('Swiper is loaded, initializing slider...');
    const swiper = new Swiper('.category-container', { // Target the parent container
      direction: 'horizontal',
      loop: true,
      spaceBetween: 20, // Space between cards
      slidesPerView: 'auto',
      slideToClickedSlide: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      on: {
        init: function () {
          console.log('Swiper initialized successfully');
        },
        slideChange: function () {
          console.log('Slide changed');
        },
      },
    });
  }
});