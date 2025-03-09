const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

// 처음 슬라이드만 표시
slides[currentSlide].style.display = 'block';

// 슬라이드 전환 함수
function showNextSlide() {
  slides[currentSlide].style.display = 'none'; // 현재 슬라이드 숨김
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].style.display = 'block'; // 다음 슬라이드 표시
}

// 3초마다 슬라이드 전환
setInterval(showNextSlide, 3000);
