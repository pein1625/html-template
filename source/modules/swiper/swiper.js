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
  addSwiper('.source-slider', {
    loop: true,
    navigation: true,
    spaceBetween: 16,
    speed: 500,
    slidesPerView: 2,
    breakpoints: {
      576: {
        slidesPerView: 3
      },
      768: {
        slidesPerView: 4
      },
      992: {
        slidesPerView: 5
      },
      1200: {
        slidesPerView: 6
      }
    }
  });
});

$(function() {
  const videoThumbSlider = addSwiper('.video-thumb-slider', {
    slidesPerView: 3,
    spaceBetween: 10,
    navigation: true,
    speed: 400,
    breakpoints: {
      576: {
        slidesPerView: 3,
        spaceBetween: 16
      }
    }
  })[0];

  const videoSlider = addSwiper('.video-slider', {
    speed: 400,
    thumbs: {
      swiper: videoThumbSlider,
    },
  })[0];
});
