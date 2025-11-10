

        // ====================================
        // JavaScript (Swiper 초기화)
        // ====================================
        window.onload = function () {

            new Swiper('#mainRollingProduct1 .mySwiper', {
                loop: true,
                slidesPerView: 3,
                spaceBetween: 25,

                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                },

                pagination: {
                    el: '.swiper-pagination-progressbar',
                    type: 'progressbar',
                },

                breakpoints: {
                    900: { slidesPerView: 3, spaceBetween: 25 },
                    600: { slidesPerView: 3, spaceBetween: 20 },
                    0: { slidesPerView: 3, spaceBetween: 15 }
                }
            });
        };

