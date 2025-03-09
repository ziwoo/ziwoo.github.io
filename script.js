document.addEventListener("DOMContentLoaded", function() {
  const slides = document.querySelectorAll('.slide');
  let currentSlide = 0;

  // 모든 슬라이드를 숨김
  slides.forEach(slide => slide.style.display = 'none');

  // 첫 번째 슬라이드 표시
  slides[currentSlide].style.display = 'block';

  // 3초마다 슬라이드 전환
  setInterval(() => {
    slides[currentSlide].style.display = 'none';
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].style.display = 'block';
  }, 3000);
});
