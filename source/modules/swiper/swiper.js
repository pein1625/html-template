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

$(function() {
  addSwiper('.banner-slider', {
    effect: 'fade',
    speed: 800,
    pagination: true,
    navigation: true,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    }
  });
});

$(function() {
  addSwiper('.banner-slider-2', {
    speed: 800,
    pagination: true,
    navigation: true,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    }
  });
});

// horizontal preview sync slider
$(function () {
  if (!$(".preview-slider, .thumb-slider").length) {
    return;
  }

  if (!window.addSwiper) {
    console.warn('"addSwiper" funtion is required!');
    return;
  }

  var thumbSlider = addSwiper(".thumb-slider", {
    navigation: true,
    slidesPerView: 3,
    freeMode: true,
    spaceBetween: 12,
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
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
    navigation: true,
    loop: true,
    speed: 400,
    slidesPerView: 2,
    breakpoints: {
      768: {
        slidesPerView: 3
      },
      992: {
        slidesPerView: 4
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 14,
      }
    }
  })
});

$(function() {
  addSwiper('.news-slider', {
    navigation: true,
    spaceBetween: 16,
    speed: 400,
    loop: true,
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 30,
      }
    }
  })
});

$(function() {
  addSwiper('.news-slider-2', {
    navigation: true,
    spaceBetween: 16,
    speed: 400,
    loop: true,
    breakpoints: {
      768: {
        slidesPerView: 3,
      },
      992: {
        slidesPerView: 4
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 30,
      }
    }
  })
});
