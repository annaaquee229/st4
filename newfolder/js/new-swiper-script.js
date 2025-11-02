 // * JAVASCRIPT: Vertical Slider Logic
        $(document).ready(function () {
            // 슬라이더 래퍼를 찾습니다.
            const $wrapper = $('.ub-wrapper');
            if ($wrapper.length === 0) {
                console.error("Vertical Slider: .ub-wrapper not found. Aborting script execution.");
                return; 
            }

            const $list = $wrapper.find('.content-list');
            const $items = $list.find('.list-item');
            const totalItems = $items.length;
            let currentIndex = 0;
            // isScrolling 플래그는 새로운 전환 요청을 제한하는 용도로만 사용
            let isScrolling = false; 

            // 뷰포트 높이 설정
            const setHeight = () => {
                const itemHeight = $wrapper.height(); 
                
                if (itemHeight === 0) {
                    const windowHeight = $(window).height();
                    $list.height(windowHeight * totalItems);
                    $items.height(windowHeight);
                    return windowHeight;
                }

                $list.height(itemHeight * totalItems);
                $items.height(itemHeight);
                return itemHeight;
            };

            let itemHeight = setHeight();

            // 슬라이드 전환 함수
            function goToSlide(index) {
                if (index >= 0 && index < totalItems) {
                    currentIndex = index;
                    const offset = -currentIndex * itemHeight;
                    $list.css('transform', `translateY(${offset}px)`);
                }
            }

            // 마우스 휠 이벤트 처리
            $wrapper.on('wheel', function (e) {
                
                if (isScrolling) {
                    // 전환 중에는 페이지 스크롤 및 슬라이드 전환 모두 차단
                    e.preventDefault(); 
                    return; 
                }

                let nextIndex = currentIndex;
                const deltaY = e.originalEvent.deltaY;
                let canTransition = false; // 슬라이드 전환 가능 여부 플래그

                // 다음 인덱스 계산
                if (deltaY > 0) { // 아래로 스크롤 (다음 슬라이드)
                    if (currentIndex < totalItems - 1) {
                        nextIndex = currentIndex + 1;
                        canTransition = true;
                    }
                } else { // 위로 스크롤 (이전 슬라이드)
                    if (currentIndex > 0) {
                        nextIndex = currentIndex - 1;
                        canTransition = true;
                    }
                }

                if (canTransition) {
                    // [핵심 수정] 슬라이드 전환이 가능할 때만 페이지 스크롤 차단 및 전환 실행
                    e.preventDefault();
                    
                    isScrolling = true;
                    goToSlide(nextIndex);
                    
                    // 전환 시간(0.5초) 후 플래그 해제
                    setTimeout(() => {
                        isScrolling = false;
                    }, 500);
                }
                // canTransition이 false이면 (경계에 도달했으면) e.preventDefault()를 호출하지 않아 
                // 이벤트가 상위로 전파되어 페이지 스크롤이 자연스럽게 발생합니다.
            });

            // 창 크기 변경 시 높이 재조정
            $(window).on('resize', function () {
                itemHeight = setHeight(); // 높이 업데이트
                // 현재 위치를 새 높이에 맞춰 재조정
                const offset = -currentIndex * itemHeight;
                $list.css('transform', `translateY(${offset}px)`);
            });

            // 초기 슬라이드 설정
            goToSlide(0); 

        });