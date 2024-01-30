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
  addSwiper('.cate-slider', {
    pagination: true,
    slidesPerView: 2,
    spaceBetween: 10,
    speed: 500,
    loop: true,
    breakpoints: {
      576: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 16,
      },
      992: {
        slidesPerView: 5,
        spaceBetween: 16,
      },
      1200: {
        slidesPerView: 6,
        spaceBetween: 16,
      },
      1700: {
        slidesPerView: 7,
        spaceBetween: 16,
      }
    }
  });

  addSwiper('.card-slider', {
    pagination: true,
    slidesPerView: 1,
    spaceBetween: 16,
    speed: 500,
    loop: true,
    autoplay: {
      delay: 3500,
      disableOnInteractive: true,
    },
    breakpoints: {
      576: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      992: {
        slidesPerView: 4,
      },
      1200: {
        slidesPerView: 5,
      },
    }
  });

  addSwiper('.business-slider', {
    pagination: true,
    slidesPerView: 2,
    // spaceBetween: 10,
    speed: 500,
    loop: true,
    breakpoints: {
      576: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 4,
        // spaceBetween: 16,
      },
      992: {
        slidesPerView: 5,
        // spaceBetween: 16,
      },
      1200: {
        slidesPerView: 6,
        // spaceBetween: 16,
      },
      1700: {
        slidesPerView: 7,
        // spaceBetween: 16,
      }
    }
  });
});

// vertical preview sync slider
$(function () {
  if (!$(".preview-slider, .thumb-slider").length) {
    return;
  }

  if (!window.addSwiper) {
    console.warn('"addSwiper" funtion is required!');
    return;
  }

  var thumbSlider = addSwiper(".thumb-slider", {
    direction: "vertical",
    slidesPerView: "auto",
    freeMode: true,
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    spaceBetween: 10,
  })[0];

  addSwiper(".preview-slider", {
    effect: "fade",
    allowTouchMove: false,
    thumbs: {
      swiper: thumbSlider,
    },
  });
});
