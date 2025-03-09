document.addEventListener("DOMContentLoaded", function() {
  const slideTrack = document.querySelector('.slide-track');
  const slides = document.querySelectorAll('.slide');
  const slideWidth = 300; // 슬라이더 너비
  const totalSlides = slides.length; // 복제된 슬라이드 포함
  let currentSlide = 0;
  
  setInterval(() => {
    currentSlide++;
    slideTrack.style.transition = 'transform 0.5s ease-in-out';
    slideTrack.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    
    // 만약 복제된 슬라이드까지 이동했다면, transition 없이 초기 위치로 돌아가기
    if (currentSlide === totalSlides - 1) {
      setTimeout(() => {
        slideTrack.style.transition = 'none';
        slideTrack.style.transform = `translateX(0)`;
        currentSlide = 0;
      }, 500); // transition duration과 일치시킵니다.
    }
  }, 3000);
});