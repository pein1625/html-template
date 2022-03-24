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

$(function () {
  addSwiper(".banner-slider", {
    navigation: true,
    pagination: true,
    speed: 600,
    loop: true,
    autoplay: {
      delay: 4500,
      disableOnInteraction: false,
    },
  });
});

$(function () {
  addSwiper(".service-slider", {
    slidesPerView: 3,
    spaceBetween: 16,
    navigation: true,
    breakpoints: {
      576: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 24,
      },
      992: {
        slidesPerView: 5,
        spaceBetween: 24,
      },
      1200: {
        slidesPerView: 6,
        spaceBetween: 24,
      },
    },
  });
});

$(function () {
  addSwiper(".feedback-slider", {
    pagination: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
    },
  });
});

$(function () {
  addSwiper(".expert-slider", {
    navigation: true,
    loop: true,
    spaceBetween: 16,
    speed: 400,
    slidesPerView: 2,
    breakpoints: {
      768: {
        slidesPerView: 3,
      },
      992: {
        slidesPerView: 4,
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
    },
  });
});

$(function () {
  addSwiper(".procedure-slider", {
    slidesPerView: 2,
    spaceBetween: 16,
    speed: 400,
    navigation: true,
    breakpoints: {
      576: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 4,
      },
      992: {
        slidesPerView: 5,
      },
      1200: {
        slidesPerView: 6,
      },
    },
  });
});
