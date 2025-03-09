document.addEventListener("DOMContentLoaded", function() {
  const slideTrack = document.querySelector('.slide-track');
  const slides = document.querySelectorAll('.slide');
  const slideWidth = 300; // 슬라이더 너비 (픽셀)
  const totalSlides = slides.length; // 4장
  let currentSlide = 0;
  
  setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    slideTrack.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
  }, 3000);
});
document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
});