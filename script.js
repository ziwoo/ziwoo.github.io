document.addEventListener("DOMContentLoaded", function() {
  const slideTrack = document.querySelector('.slide-track');
  const slides = document.querySelectorAll('.slide');
  const slideWidth = 300; // 슬라이더 너비와 동일
  const totalSlides = slides.length; // 4장
  let currentSlide = 0;
  
  setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    // 슬라이드 트랙을 현재 슬라이드에 맞게 좌측으로 이동
    slideTrack.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
  }, 3000);
});
