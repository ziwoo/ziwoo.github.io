document.addEventListener("DOMContentLoaded", function() {
  // 슬라이더 기능
  (function () {
    const slider = document.querySelector(".slider");
    const slideTrack = document.querySelector(".slide-track");
    let slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
    let slideWidth;
    let intervalId;

    // 슬라이드 너비 계산 함수
    function updateSlideWidth() {
      slideWidth = slider.offsetWidth;
      
      // 모든 슬라이드의 너비를 현재 슬라이더 너비로 업데이트
      slides.forEach(slide => {
        slide.style.width = `${slideWidth}px`;
      });
      
      // 현재 위치 재설정
      slideTrack.style.transform = `translateX(-${(currentSlide + 1) * slideWidth}px)`;
    }

    // 첫 번째와 마지막 슬라이드 복제
    const firstSlideClone = slides[0].cloneNode(true);
    const lastSlideClone = slides[slides.length - 1].cloneNode(true);
    
    // 복제된 슬라이드에 클래스 추가
    firstSlideClone.classList.add("clone");
    lastSlideClone.classList.add("clone");
    
    // 복제된 슬라이드 추가
    slideTrack.appendChild(firstSlideClone);
    slideTrack.insertBefore(lastSlideClone, slides[0]);

    // 슬라이드 목록 업데이트
    slides = document.querySelectorAll(".slide");
    
    // 초기 너비 설정
    updateSlideWidth();

    function moveSlide() {
      currentSlide++;
      slideTrack.style.transition = "transform 0.5s ease-in-out";
      slideTrack.style.transform = `translateX(-${(currentSlide + 1) * slideWidth}px)`;

      // 마지막 슬라이드(복제본)에 도달했을 때
      if (currentSlide === slides.length - 2) {
        setTimeout(() => {
          slideTrack.style.transition = "none";
          currentSlide = 0;
          slideTrack.style.transform = `translateX(-${slideWidth}px)`;
        }, 500);
      }
    }

    // 기존 인터벌 제거 후 새로 설정
    function resetInterval() {
      if (intervalId) {
        clearInterval(intervalId);
      }
      intervalId = setInterval(moveSlide, 3000);
    }

    // 초기 인터벌 설정
    resetInterval();

    // 화면 크기 변경 감지
    window.addEventListener('resize', () => {
      slideTrack.style.transition = "none";
      updateSlideWidth();
      resetInterval();
    });
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

document.addEventListener("DOMContentLoaded", function() {
  const menuToggle = document.getElementById('menu-toggle');
  const navList = document.querySelector('.site-nav ul');

  // 메뉴 토글 버튼 클릭 시 active 클래스 토글
  menuToggle.addEventListener('click', function(e) {
    navList.classList.toggle('active');
    // 이벤트 전파 중지: 버튼 클릭 이벤트가 문서 클릭 이벤트에 전달되지 않도록
    e.stopPropagation();
  });

  // 문서 클릭 시, 메뉴가 열려있다면 active 클래스 제거
  document.addEventListener('click', function(e) {
    // 만약 클릭한 요소가 navList나 menuToggle 내부에 없다면
    if (!navList.contains(e.target) && !menuToggle.contains(e.target)) {
      navList.classList.remove('active');
    }
  });
});

