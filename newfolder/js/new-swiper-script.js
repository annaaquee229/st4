const swiper = new Swiper('.mySwiper', {
  direction: 'vertical',
  slidesPerView: 1,
  speed: 800,
  mousewheel: {
    releaseOnEdges: true,
    sensitivity: 1,
  },
  keyboard: {
    enabled: true,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

// 섹션 내에서 스크롤 제어
const sliderSection = document.querySelector('.slider-section-wrapper');
let isInSection = false;

// Swiper 내부에서 휠 이벤트 감지
const swiperEl = document.querySelector('.mySwiper');

if (swiperEl) {
  swiperEl.addEventListener('wheel', (e) => {
    const isFirstSlide = swiper.activeIndex === 0;
    const isLastSlide = swiper.activeIndex === swiper.slides.length - 1;
    
    // 첫 슬라이드에서 위로 스크롤 시에만 섹션 나가기 허용
    if (isFirstSlide && e.deltaY < 0) {
      return;
    }
    
    // 마지막 슬라이드에서 아래로 스크롤 시에만 섹션 나가기 허용
    if (isLastSlide && e.deltaY > 0) {
      return;
    }
    
    // 그 외의 경우 페이지 스크롤 방지
    e.preventDefault();
    e.stopPropagation();
  }, { passive: false });
}

// 섹션 진입 감지
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      isInSection = true;
    } else {
      isInSection = false;
    }
  });
}, observerOptions);

if (sliderSection) {
  observer.observe(sliderSection);
}