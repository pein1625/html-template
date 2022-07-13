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
    navigation: true,
    loop: true,
    speed: 800,
  });
});

$(function() {
  const partnerSliders = addSwiper('.partner-slider', {
    navigation: true,
    loop: true,
    slidesPerView: 2,
    spaceBetween: 16,
    breakpoints: {
      576: {
        slidesPerView: 3
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
      992: {
        slidesPerView: 5,
        spaceBetween: 30,
      },
      1200: {
        slidesPerView: 6,
        spaceBetween: 30,
      }
    }
  });

  $(".partner-tabs .nav-link").on('shown.bs.tab', function() {
    partnerSliders.forEach(slider => {
      slider.update();
    });
  });
});

$(function() {
  addSwiper('.category-slider', {
    slidesPerView: 2,
    navigation: true,
    spaceBetween: 16,
    breakpoints: {
      768: {
        slidesPerView: 3
      },
      992: {
        slidesPerView: 4
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 30,
      }
    }
  });
});
