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
  addSwiper('.banner-slider', {
    pagination: true,
    loop: true,
    speed: 1000,
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    }
  });
});

$(function() {
  addSwiper('.news-slider', {
    loop: true,
    pagination: true,
    spaceBetween: 16,
    breakpoints: {
      576: {
        slidesPerView: 2
      },
      1200: {
        slidesPerView: 2,
        spaceBetween: 30
      }
    }
  })
});

$(function() {
  addSwiper('.partner-slider', {
    loop: true,
    navigation: true,
    spaceBetween: 16,
    slidesPerView: 3,
    breakpoints: {
      992: {
        slidesPerView: 4
      },
      1200: {
        slidesPerView: 5
      }
    }
  })
});
