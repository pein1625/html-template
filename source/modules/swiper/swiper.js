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
