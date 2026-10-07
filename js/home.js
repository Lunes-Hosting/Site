try {
    var parralax = document.getElementById('parallax');
    var parralaxInstance = new Parallax(parallax);
  } catch (error) {
    console.error("Error: Parallax element not found");
  }
  
  // ---------------------------------------------------------------
  
  try {
    var fly1 = document.querySelector('.fly1');
    var fly2 = document.querySelector('.fly2');
  } catch (error) {
    console.error("Error: Fly elements not found");
  }
  
  function removeClassAfterTime(first, second, time) {
    setTimeout(() => {
      if (fly1) {
        fly1.classList.remove(first);
      }
      if (fly2) {
        fly2.classList.remove(second);
      }
    }, time);
  }
  
  // ---------------------------------------------------------------
  
const starCoordinates = [
    { x: '15%', y: '5%' },
    { x: '15%', y: '30%' },
    { x: '30%', y: '50%' },
    { x: '40%', y: '60%' },
    { x: '80%', y: '30%' },
    { x: '70%', y: '60%' },
    { x: '70%', y: '15%' },
    { x: '75%', y: '10%' },
    { x: '75%', y: '60%' }
];

function getPixelCoordinate(coordinate, axis) {
if (coordinate.includes('%')) {
    const percent = parseFloat(coordinate);
    const viewportSize = axis === 'x' ? window.innerWidth : window.innerHeight;
    return (percent / 100) * viewportSize;
}
return parseFloat(coordinate);
}

function getRandomCoordinate() {
    const randomIndex = Math.floor(Math.random() * starCoordinates.length);
    return starCoordinates[randomIndex];
}

function createShootingStar() {
    const star = document.createElement('div');
    star.classList.add('shooting-star');
    document.body.appendChild(star);
    
    const { x, y } = getRandomCoordinate();
    const animationDuration = 3;
    const pixelX = getPixelCoordinate(x, 'x');
    const pixelY = getPixelCoordinate(y, 'y');
    
    star.style.animationDuration = `${animationDuration}s`;
    star.style.zIndex = 1;
    star.style.left = `${pixelX}px`;
    star.style.top = `${pixelY}px`;
    
    setTimeout(() => {
        star.remove(); 
    }, animationDuration * 1000); 

    const endX = Math.random() * window.innerWidth;
    const endY = Math.random() * window.innerHeight;
    star.style.transform = `translate(${endX}px, ${endY}px)`;
}

// ---------------------------------------------------------------

// ---------------------------------------------------------------

const hostSwiperElement = document.querySelector('#hosts .swiper');

if (typeof Swiper === 'undefined') {
    console.error('Swiper failed to load; the host carousel is unavailable.');
} else if (!hostSwiperElement) {
    console.error('Host carousel element was not found.');
} else {
    new Swiper(hostSwiperElement, {
        direction: 'horizontal',
        loop: true,

        pagination: {
          el: hostSwiperElement.querySelector('.swiper-pagination'),
        },

        autoplay: {
          delay: 2250,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        },

        navigation: {
          nextEl: hostSwiperElement.querySelector('.swiper-button-next'),
          prevEl: hostSwiperElement.querySelector('.swiper-button-prev'),
        },
    });
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const testimonialCarousel = document.querySelector('#reviews .testimCarousel');
const testimonialSlides = [...document.querySelectorAll('#reviews .reviewSlide')];
const testimonialDots = [...document.querySelectorAll('#reviews .reviewDot')];
const previousReviewButton = document.querySelector('#reviews .reviewPrevious');
const nextReviewButton = document.querySelector('#reviews .reviewNext');

if (!testimonialCarousel || !previousReviewButton || !nextReviewButton ||
    testimonialSlides.length === 0 || testimonialDots.length !== testimonialSlides.length) {
    console.error('Customer review carousel is missing slides or controls.');
} else {
    let currentReview = 0;
    let rotationTimer;

    function showReview(index) {
        currentReview = (index + testimonialSlides.length) % testimonialSlides.length;
        testimonialSlides.forEach((slide, slideIndex) => {
            const isActive = slideIndex === currentReview;
            slide.hidden = !isActive;
            slide.setAttribute('aria-hidden', String(!isActive));
            testimonialDots[slideIndex].setAttribute('aria-current', String(isActive));
        });
    }

    function stopReviewRotation() {
        window.clearInterval(rotationTimer);
        rotationTimer = undefined;
    }

    function startReviewRotation() {
        if (prefersReducedMotion || rotationTimer || testimonialSlides.length < 2) {
            return;
        }

        rotationTimer = window.setInterval(() => showReview(currentReview + 1), 5000);
    }

    previousReviewButton.addEventListener('click', () => showReview(currentReview - 1));
    nextReviewButton.addEventListener('click', () => showReview(currentReview + 1));
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => showReview(index));
    });

    testimonialCarousel.addEventListener('mouseenter', stopReviewRotation);
    testimonialCarousel.addEventListener('mouseleave', startReviewRotation);
    testimonialCarousel.addEventListener('focusin', stopReviewRotation);
    testimonialCarousel.addEventListener('focusout', event => {
        if (!testimonialCarousel.contains(event.relatedTarget)) {
            startReviewRotation();
        }
    });
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopReviewRotation();
        } else {
            startReviewRotation();
        }
    });

    showReview(currentReview);
    startReviewRotation();
}

// ---------------------------------------------------------------

removeClassAfterTime('fly1', 'fly2', 1100);
setInterval(createShootingStar, 1000);