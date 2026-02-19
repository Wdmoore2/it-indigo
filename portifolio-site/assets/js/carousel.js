// Advanced Carousel JS with Dots
document.addEventListener('DOMContentLoaded', function() {
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const nextButton = document.querySelector('.carousel-btn.next');
  const prevButton = document.querySelector('.carousel-btn.prev');
  const slideWidth = slides[0].getBoundingClientRect().width;

  // Arrange the slides next to each other
  slides.forEach((slide, index) => {
    slide.style.left = slideWidth * index + 'px';
  });

  // Create dots dynamically
  const dotsNav = document.createElement('div');
  dotsNav.classList.add('carousel-dots');
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.classList.add('carousel-dot');
    if (index === 0) dot.classList.add('current-dot');
    dotsNav.appendChild(dot);
  });
  track.parentElement.appendChild(dotsNav);
  const dots = Array.from(dotsNav.children);

  // Move to slide function
  const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
  };

  // Update dots
  const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-dot');
    targetDot.classList.add('current-dot');
  };

  // Go to next slide
  const goToNextSlide = () => {
    const currentSlide = track.querySelector('.current-slide') || slides[0];
    let nextSlide = currentSlide.nextElementSibling;
    if (!nextSlide) nextSlide = slides[0];

    const currentDot = dotsNav.querySelector('.current-dot');
    const nextDot = dots[slides.indexOf(nextSlide)];

    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
  };

  // Go to previous slide
  const goToPrevSlide = () => {
    const currentSlide = track.querySelector('.current-slide') || slides[0];
    let prevSlide = currentSlide.previousElementSibling;
    if (!prevSlide) prevSlide = slides[slides.length - 1];

    const currentDot = dotsNav.querySelector('.current-dot');
    const prevDot = dots[slides.indexOf(prevSlide)];

    moveToSlide(track, currentSlide, prevSlide);
    updateDots(currentDot, prevDot);
  };

  // Initialize first slide as current
  slides[0].classList.add('current-slide');

  // Button Event Listeners
  nextButton.addEventListener('click', goToNextSlide);
  prevButton.addEventListener('click', goToPrevSlide);

  // Dot click functionality
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      const currentSlide = track.querySelector('.current-slide');
      const targetSlide = slides[index];
      const currentDot = dotsNav.querySelector('.current-dot');

      moveToSlide(track, currentSlide, targetSlide);
      updateDots(currentDot, dot);
    });
  });

  // Auto-slide every 4 seconds
  let autoSlide = setInterval(goToNextSlide, 4000);

  // Pause auto-slide on hover
  track.parentElement.addEventListener('mouseenter', () => clearInterval(autoSlide));
  track.parentElement.addEventListener('mouseleave', () => autoSlide = setInterval(goToNextSlide, 4000));
});
