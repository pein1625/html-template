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
  spaceSlider();
  newsSlider();
});

// sample slider syncs
$(function () {
  console.log(2131);
  if (!$(".sample-slider, .sample-slider-thumb").length) {
    console.log('notfound')
    return;
  }

  if (!window.addSwiper) {
    console.warn('"addSwiper" function is required!');
    return;
  }

  const thumbSlider = addSwiper(".sample-slider-thumb", {
    direction: "vertical",
    slidesPerView: "auto",
    freeMode: true,
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    spaceBetween: 10,
  })[0];

  addSwiper(".sample-slider", {
    effect: "fade",
    allowTouchMove: false,
    thumbs: {
      swiper: thumbSlider,
    },
  });
});

function spaceSlider() {
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
    slidesPerView: 1.5,
    breakpoints: {
      576: {
        slidesPerView: 2
      },
      768: {
        slidesPerView: 3
      },
      992: {
        slidesPerView: 4
      },
      1200: {
        slidesPerView: 4
      }
    }
  });
}
