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
    navigation: true,
    pagination: true,
    loop: true,
    slidesPerView: 1,
    speed: 500,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      992: {
        slidesPerView: 2,
        spaceBetween: 8,
      },
      1200: {
        slidesPerView: 2,
        spaceBetween: 14,
      }
    }
  })
});

// partner-slider
$(function () {
  addSwiper(".partner-slider", {
    navigation: true,
    loop: true,
    slidesPerView: 2,
    speed: 600,
    spaceBetween: 8,
    breakpoints: {
      576: {
        slidesPerView: 3
      },
      992: {
        slidesPerView: 4
      },
      1200: {
        slidesPerView: 5
      }
    }
  });
});
