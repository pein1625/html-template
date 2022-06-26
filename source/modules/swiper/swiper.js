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
  addSwiper('.product-slider', {
    slidesPerView: 2,
    spaceBetween: 16,
    loop: true,
    navigation: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      768: {
        spaceBetween: 16,
        slidesPerView: 3
      },
      992: {
        spaceBetween: 16,
        slidesPerView: 4
      },
      1200: {
        spaceBetween: 16,
        slidesPerView: 5
      }
    }
  });
});

$(function() {
  addSwiper('.intro-slider', {
    speed: 600,
    loop: true,
    navigation: true,
    pagination: true,
    spaceBetween: 30,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    }
  })[0];
});

$(function() {
  addSwiper('.banner-slider', {
    speed: 800,
    loop: true,
    navigation: true,
    pagination: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    }
  })[0];
});
