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
  addSwiper('.partner-slider', {
    navigation: true,
    pagination: true,
    spaceBetween: 20,
    slidesPerView: 3,
    breakpoints: {
      576: {
        slidesPerView: 4,
      },
      768: {
        slidesPerView: 5,
        spaceBetween: 24,
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 24,
      },
      1200: {
        slidesPerView: 8,
        spaceBetween: 24,
      }
    }
  })
});

$(function() {
  addSwiper('.event-slider', {
    navigation: true,
    loop: true,
    speed: 400,
    slidesPerView: 2,
    spaceBetween: 24,
    breakpoints: {
      992: {
        slidesPerView: 3,
        spaceBetween: 30
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 60
      }
    }
  });
});

$(function() {
  addSwiper('.banner-slider', {
    pagination: true,
    navigation: true,
    loop: true,
    speed: 800,
  });
});
