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
  addSwiper('.partner-slider', {
    slidesPerView: 3,
    slidesPerColumn: 3,
    slidesPerColumnFill: 'row',
    pagination: true,
    spaceBetween: 8,
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
        slidesPerView: 5,
        spaceBetween: 20,
      },
    }
  });
});

$(function() {
  addSwiper('.review-slider', {
    spaceBetween: 20,
    pagination: true,
    navigation: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    }
  });
});

$(function() {
  addSwiper('.service-slider', {
    loop: true,
    pagination: true,
    navigation: true,
    slidesPerView: 2,
    spaceBetween: 16,
    breakpoints: {
      992: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 60,
      }
    }
  });
});

$(function() {
  addSwiper('.research-slider', {
    loop: true,
    pagination: true,
    navigation: true,
    slidesPerView: 2,
    spaceBetween: 16,
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
        slidesPerView: 5,
        spaceBetween: 20,
      }
    }
  });
});
