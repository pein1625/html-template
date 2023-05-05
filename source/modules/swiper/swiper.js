// swiper template
function addSwiper(selector, options = {}) {
  return Array.from(document.querySelectorAll(selector), function (item) {
    var $sliderContainer = $(item),
      $sliderEl = $sliderContainer.find(selector + "__container");

    if (options.navigation) {
      $sliderContainer.addClass("has-nav");
      options.navigation = {
        prevEl: $sliderContainer.find(selector + "__prev"),
        nextEl: $sliderContainer.find(selector + "__next"),
      };
    }

    if (options.pagination) {
      $sliderContainer.addClass("has-pagination");
      options.pagination = {
        el: $sliderContainer.find(selector + "__pagination"),
        clickable: true,
      };
    }

    return new Swiper($sliderEl, options);
  });
}

$(function() {
  addSwiper('.news-slider', {
    loop: true,
    navigation: true,
    breakpoints: {
      576: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 4
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 4,
      }
    }
  });
});

$(function() {
  addSwiper('.news-slider-2', {
    loop: true,
    navigation: true,
    breakpoints: {
      992: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 2,
        spaceBetween: 4,
      }
    }
  });
});

$(function() {
  addSwiper('.news-slider-3', {
    loop: true,
    navigation: true,
    speed: 600,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    }
  });
});

$(function() {
  addSwiper('.event-slider', {
    loop: true,
    navigation: true,
    breakpoints: {
      576: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 14
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 14,
      }
    }
  });
});

$(function() {
  addSwiper('.brand-slider', {
    slidesPerView: 3,
    spaceBetween: 16,
    pagination: true,
    navigation: true,
    breakpoints: {
      576: {
        slidesPerView: 4
      },
      768: {
        slidesPerView: 5
      },
      992: {
        slidesPerView: 7,
      },
      1200: {
        slidesPerView: 9,
        spaceBetween: 20,
      }
    }
  });
});

$(function() {
  addSwiper('.noti-slider', {
    navigation: true,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 4000,
    }
  });
});
