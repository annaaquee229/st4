    // * JAVASCRIPT: Vertical Slider Logic
        $(document).ready(function () {
            const $list = $('.content-list');
            const $items = $list.find('.list-item');
            const totalItems = $items.length;
            let currentIndex = 0;

            // 뷰포트 높이 설정
            const setHeight = () => {
                const itemHeight = $(window).height();
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

            // 마우스 휠 이벤트 처리 (디바운싱/스로틀링 적용)
            let isScrolling = false;
            $(window).on('wheel', function (e) {
                e.preventDefault();

                if (isScrolling) return;

                isScrolling = true;

                // 스크롤 방향 확인
                if (e.originalEvent.deltaY > 0) {
                    // 아래로 스크롤 (다음 슬라이드)
                    if (currentIndex < totalItems - 1) {
                        goToSlide(currentIndex + 1);
                    }
                } else {
                    // 위로 스크롤 (이전 슬라이드)
                    if (currentIndex > 0) {
                        goToSlide(currentIndex - 1);
                    }
                }

                // 500ms 후에 스크롤 가능 상태로 리셋
                setTimeout(() => {
                    isScrolling = false;
                }, 500);
            });

            // 창 크기 변경 시 높이 재조정
            $(window).on('resize', function () {
                itemHeight = setHeight(); // 높이 업데이트
                // 현재 위치를 새 높이에 맞춰 재조정
                const offset = -currentIndex * itemHeight;
                $list.css('transform', `translateY(${offset}px)`);
            });

        });