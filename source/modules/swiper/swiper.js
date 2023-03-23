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
    pagination: true,
    navigation: true,
    spaceBetween: 16,
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
      1200: {
        slidesPerView: 6,
      }
    }
  });
});

$(function() {
  addSwiper('.product-slider-3', {
    pagination: true,
    loop: true,
    speed: 500,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    }
  });
});

$(function() {
  addSwiper('.cate-slider', {
    navigation: true,
    speed: 500,
    slidesPerView: 2.5,
    slidesPerColumn: 2,
    slidesPerColumnFill: 'row',
    spaceBetween: 1,
    breakpoints: {
      576: {
        slidesPerView: 4,
      },
      768: {
        slidesPerView: 5,
      },
      992: {
        slidesPerView: 7,
      },
      1200: {
        slidesPerView: 8,
      }
    }
  });
});

$(function() {
  addSwiper('.card-slider', {
    pagination: true,
    slidesPerView: 2,
    spaceBetween: 16,
    speed: 500,
    loop: true,
    breakpoints: {
      992: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 3,
      }
    }
  });
});

$(function() {
  addSwiper('.card-slider-2', {
    pagination: true,
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
  addSwiper('.banner-slider', {
    pagination: true,
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
  addSwiper('.branding-slider', {
    navigation: true,
    pagination: true,
    spaceBetween: 16,
    slidesPerView: 2,
    speed: 500,
    loop: true,
    breakpoints: {
      768: {
        slidesPerView: 3,
      },
      992: {
        slidesPerView: 4
      },
      1200: {
        slidesPerView: 5,
      },
    }
  });
});
