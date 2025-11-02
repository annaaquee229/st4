// JS: jQuery Scroll Logic (100vh 기반)
// jQuery가 로드된 후 실행
$(document).ready(function() {
  const $contentList = $('.content-list');
  const $sliderContainer = $('.slider-container');

  // 뷰포트 높이(100vh)를 슬라이드 이동 단위로 설정
  let slideStep = $(window).height();

  const totalItems = $contentList.children('.list-item').length;
  const maxIndex = totalItems - 1;

  let currentIndex = 0;
  let isScrolling = false; // 연속 스크롤 방지 플래그 (쿨다운)

  /**
   * 지정된 인덱스로 슬라이드를 이동합니다.
   * @param {number} index - 이동할 슬라이드의 인덱스
   */
  function slideTo(index) {
    if (index < 0) {
      index = 0;
    } else if (index > maxIndex) {
      index = maxIndex;
    }

    currentIndex = index;

    // 이동할 Y축 오프셋 계산 (현재 인덱스 * 뷰포트 높이)
    const offset = -currentIndex * slideStep;

    // CSS transform을 이용해 부드럽게 슬라이드 이동
    $contentList.css('transform', `translateY(${offset}px)`);

    return currentIndex;
  }

  // --- 스크롤 이벤트 핸들러 ---
  $sliderContainer.on('wheel', function(e) {
    e.preventDefault();

    if (isScrolling) {
      return; // 쿨다운 중에는 스크롤 무시
    }

    const delta = e.originalEvent.deltaY;

    if (delta > 0) {
      // 아래로 스크롤 (다음 항목)
      if (currentIndex < maxIndex) {
        isScrolling = true;
        slideTo(currentIndex + 1);
      }
    } else if (delta < 0) {
      // 위로 스크롤 (이전 항목)
      if (currentIndex > 0) {
        isScrolling = true;
        slideTo(currentIndex - 1);
      }
    }

    // 쿨다운 타이머 설정 (애니메이션 시간보다 약간 길게 설정)
    setTimeout(() => {
      isScrolling = false;
    }, 550); 
  });

  // --- 반응형 처리 ---
  // 창 크기가 변경될 때 슬라이드 이동 단위를 업데이트하고 현재 슬라이드를 유지합니다.
  $(window).on('resize', function() {
    slideStep = $(window).height();
    slideTo(currentIndex);
  });

  // 초기 상태 설정
  slideTo(0);
});
