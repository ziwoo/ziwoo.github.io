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
    const initialFixedTop = 0; // 고정 시작 시 적용할 top 값 (임계 구간 시작 시)
    const finalTop = 200;        // 스크롤이 충분히 내려갔을 때 고정될 최종 top 값
    const threshold = 300;       // initialOffset 이후, top 값을 선형 보간할 스크롤 범위
    
    window.addEventListener("scroll", function() {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      const viewportWidth = window.innerWidth;
      
      if (viewportWidth < 768) {
        // 모바일 환경에서는 fixed 효과 없이 원래 흐름대로
        sidebar.style.position = "static";
        sidebar.style.top = "auto";
      } else {
        if (scrollY < initialOffset) {
          // 스크롤이 아직 사이드바 래퍼의 초기 위치에 도달하지 않으면,
          // 원래 문서 흐름대로 (static) 유지
          sidebar.style.position = "static";
          sidebar.style.top = "auto";
        } else if (scrollY < initialOffset + threshold) {
          // 스크롤이 초기 위치를 넘었지만 임계 범위 내라면 fixed로 전환하고 top 값을 선형 보간
          sidebar.style.position = "fixed";
          let progress = (scrollY - initialOffset) / threshold;
          let newTop = (1 - progress) * initialFixedTop + progress * finalTop;
          sidebar.style.top = newTop + "px";
        } else {
          // 스크롤이 충분히 내려갔으면 고정된 최종 top 값 적용
          sidebar.style.position = "fixed";
          sidebar.style.top = finalTop + "px";
        }
      }
    });
  })();
  
  
  
  
});

