document.addEventListener("DOMContentLoaded", function() {
  // 슬라이더 기능
  (function() {
    const slideTrack = document.querySelector('.slide-track');
    let slides = document.querySelectorAll('.slide');
    const slideWidth = 300; // 슬라이더 너비
    let currentSlide = 0;
  
    // 첫 번째 슬라이드를 복제하여 마지막에 추가 (이미 복제된 경우 제외)
    if (slides.length > 0 && !slides[slides.length - 1].classList.contains('clone')) {
      const firstSlideClone = slides[0].cloneNode(true);
      firstSlideClone.classList.add('clone');
      slideTrack.appendChild(firstSlideClone);
    }
    
    // 업데이트된 슬라이드 목록과 총 슬라이드 수
    slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length; 
  
    // transitionend 이벤트를 사용하여 마지막(복제된) 슬라이드 도달 시 리셋
    slideTrack.addEventListener('transitionend', function() {
      if (currentSlide === totalSlides - 1) {
        // transition 없이 초기 위치로 리셋
        slideTrack.style.transition = 'none';
        slideTrack.style.transform = `translateX(0)`;
        currentSlide = 0;
        // 강제 reflow 후 transition 복원
        slideTrack.offsetWidth; 
        slideTrack.style.transition = 'transform 0.5s ease-in-out';
      }
    });
    
    setInterval(() => {
      currentSlide++;
      slideTrack.style.transition = 'transform 0.5s ease-in-out';
      slideTrack.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
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
