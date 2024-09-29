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
  spaceSyncSlider();
  sampleSyncSlider();
  placeSyncSlider();
  newsSlider();
  cardSlider();
});

function spaceSyncSlider() {
  if (!$('.space-thumb-slider').length) return;

  addSwiper('.space-thumb-slider', {
    loop: false,
    navigation: true,
    spaceBetween: 8,
    speed: 500,
    slidesPerView: 3,
    preventClicks: true,
    breakpoints: {
      576: {
        spaceBetween: 16,
      },
      768: {
        spaceBetween: 16,
        slidesPerView: 4
      },
      992: {
        spaceBetween: 16,
        slidesPerView: 5
      },
      1200: {
        spaceBetween: 30,
        slidesPerView: 6
      }
    }
  });

  $('.js-space-thumb-slide').on('click', function(e) {
    e.preventDefault();

    const $el = $(this);

    console.log('asdfsdf');

    if ($el.hasClass('active')) return false;

    $el.siblings('.active').removeClass('active');
    $el.addClass('active');

    const url = $el.data('url');

    $('.js-space-frame').attr('src', url);
  });
}

function newsSlider() {
  addSwiper('.news-slider', {
    loop: true,
    navigation: true,
    spaceBetween: 0,
    speed: 500,
    slidesPerView: 2,
    breakpoints: {
      992: {
        slidesPerView: 3
      },
      1200: {
        slidesPerView: 4
      }
    }
  });
}

function sampleSyncSlider() {
  if (!$(".sample-slider, .sample-thumb-slider").length) {
    return;
  }

  const thumbSlider = addSwiper(".sample-thumb-slider", {
    loop: false,
    navigation: true,
    slidesPerView: 3,
    freeMode: true,
    spaceBetween: 16,
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    breakpoints: {
      576: {
        spaceBetween: 20,
      },
      992: {
        spaceBetween: 24,
      },
    }
  })[0];

  addSwiper(".sample-slider", {
    loop: false,
    effect: "fade",
    navigation: true,
    pagination: true,
    allowTouchMove: false,
    thumbs: {
      swiper: thumbSlider,
    },
  });
}

function cardSlider() {
  addSwiper('.card-slider', {
    loop: false,
    navigation: true,
    slidesPerView: 2,
    spaceBetween: 0,
    breakpoints: {
      992: {
        slidesPerView: 3,
      }
    }
  });

  addSwiper('.card-slider-2', {
    loop: true,
    navigation: true,
    spaceBetween: 0,
    speed: 500,
    slidesPerView: 2,
    breakpoints: {
      992: {
        slidesPerView: 3
      },
      1200: {
        slidesPerView: 4
      }
    }
  });
}

function placeSyncSlider() {
  if (!$(".place-slider, .place-thumb-slider").length) {
    return;
  }

  const thumbSlider = addSwiper(".place-thumb-slider", {
    loop: false,
    navigation: true,
    slidesPerView: 3,
    freeMode: true,
    spaceBetween: 16,
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    breakpoints: {
      576: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 5,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 6,
        spaceBetween: 24,
      },
    }
  })[0];

  addSwiper(".place-slider", {
    loop: false,
    effect: "fade",
    navigation: true,
    pagination: true,
    allowTouchMove: false,
    thumbs: {
      swiper: thumbSlider,
    },
  });
}
