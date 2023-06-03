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
    navigation: true,
    spaceBetween: 16,
    speed: 500,
    loop: true,
    slidesPerView: 1,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    }
  });
});

$(function() {
  addSwiper('.shop-slider', {
    navigation: true,
    pagination: true,
    loop: true,
    slidesPerView: 2.5,
    spaceBetween: 8,
    speed: 400,
    breakpoints: {
      576: {
        slidesPerView: 3
      },
      768: {
        slidesPerView: 4,
      },
      992: {
        slidesPerView: 5,
      },
      1200: {
        slidesPerView: 6,
      }
    }
  });
});

$(function() {
  addSwiper('.card-slider', {
    navigation: true,
    pagination: true,
    loop: true,
    slidesPerView: 2,
    spaceBetween: 8,
    speed: 400,
    breakpoints: {
      768: {
        slidesPerView: 3,
      },
      992: {
        slidesPerView: 4,
      },
      1200: {
        slidesPerView: 4,
      }
    }
  });
});

$(function() {
  addSwiper('.card-slider-2', {
    pagination: true,
    spaceBetween: 8,
    speed: 500,
    loop: true,
    slidesPerView: 1,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    }
  });
});

$(function() {
  addSwiper('.card-slider-3', {
    pagination: true,
    spaceBetween: 8,
    speed: 500,
    loop: true,
    slidesPerView: 1,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
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
    spaceBetween: 8,
  })[0];

  addSwiper(".preview-slider", {
    effect: "fade",
    allowTouchMove: false,
    thumbs: {
      swiper: thumbSlider,
    },
  });
});

$(function() {
  addSwiper('.product-slider', {
    pagination: true,
    navigation: true,
    spaceBetween: 8,
    slidesPerView: 2,
    loop: true,
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
    }
  });
});
