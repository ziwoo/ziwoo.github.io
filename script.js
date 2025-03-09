document.addEventListener("DOMContentLoaded", function() {
  // 슬라이더 기능
  (function() {
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
        }, 500);
      }
    }, 3000);
  })();

  // 탭 활성화 (Intersection Observer)
  (function() {
    const sections = document.querySelectorAll('.section-content');
    const navLinks = document.querySelectorAll('.sidebar .nav li a');

    const observerOptions = {
      threshold: 0.5
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => link.classList.remove('active'));
          const activeLink = document.querySelector(`.sidebar .nav li a[href="#${id}"]`);
          if (activeLink) {
            activeLink.classList.add('active');
          }
        }
      });
    }, observerOptions);

    sections.forEach(section => {
      observer.observe(section);
    });
  })();

  // 사이드바 고정 기능
  (function() {
    const sidebar = document.querySelector(".sidebar");
    const sidebarWrapper = document.querySelector(".sidebar-wrapper");
    const initialOffset = sidebarWrapper.offsetTop;  // 사이드바 래퍼의 초기 위치
    
    window.addEventListener("scroll", function() {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollY >= initialOffset) {
        sidebar.style.position = "fixed";
        sidebar.style.top = "20px";
      } else {
        sidebar.style.position = "static";
      }
    });
  })();
});
