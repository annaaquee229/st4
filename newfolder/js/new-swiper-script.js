
    document.addEventListener('DOMContentLoaded', function() {
      const wrapper = document.querySelector('.ub-wrapper');
      const list = document.querySelector('.content-list');
      const items = document.querySelectorAll('.list-item');
      const dots = document.querySelectorAll('.scroll-dot');
      const totalItems = items.length;
      let currentIndex = 0;
      let isScrolling = false;
      let itemHeight = wrapper.clientHeight;

      function setHeight() {
        itemHeight = wrapper.clientHeight;
        list.style.height = `${itemHeight * totalItems}px`;
        items.forEach(item => {
          item.style.height = `${itemHeight}px`;
        });
      }

      function goToSlide(index) {
        if (index >= 0 && index < totalItems) {
          currentIndex = index;
          const offset = -currentIndex * itemHeight;
          list.style.transform = `translateY(${offset}px)`;
          
          // 인디케이터 업데이트
          dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
          });
        }
      }

      // 마우스 휠 이벤트
      wrapper.addEventListener('wheel', function(e) {
        if (isScrolling) {
          e.preventDefault();
          return;
        }

        let nextIndex = currentIndex;
        let canTransition = false;

        if (e.deltaY > 0) {
          if (currentIndex < totalItems - 1) {
            nextIndex = currentIndex + 1;
            canTransition = true;
          }
        } else {
          if (currentIndex > 0) {
            nextIndex = currentIndex - 1;
            canTransition = true;
          }
        }

        if (canTransition) {
          e.preventDefault();
          isScrolling = true;
          goToSlide(nextIndex);
          setTimeout(() => {
            isScrolling = false;
          }, 500);
        }
      });

      // 인디케이터 클릭
      dots.forEach(dot => {
        dot.addEventListener('click', function() {
          const index = parseInt(this.dataset.index);
          goToSlide(index);
        });
      });

      // 리사이즈
      window.addEventListener('resize', function() {
        setHeight();
        goToSlide(currentIndex);
      });

      // 초기화
      setHeight();
      goToSlide(0);
    });
