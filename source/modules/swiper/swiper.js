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
  addSwiper('.news-slider', {
    slidesPerView: 1.5,
    spaceBetween: 8,
    pagination: true,
    navigation: true,
    loop: true,
    breakpoints: {
      576: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 8,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 16,
      }
    }
  });
});

$(function() {
  addSwiper('.doc-slider', {
    slidesPerView: 1,
    spaceBetween: 0,
    pagination: true,
    navigation: true,
    loop: true,
    preventClicks: true,
    preventClicksPropagation: true,
    preventInteractionOnTransition: true,
    breakpoints: {
      576: {
        slidesPerView: 1,
        spaceBetween: 8,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 8,
      },
      1200: {
        slidesPerView: 2,
        spaceBetween: 16,
      }
    }
  });
});

$(function() {
  const recruitSliders = addSwiper('.recruit-slider', {
    slidesPerView: 1,
    spaceBetween: 16,
    pagination: true,
    navigation: true,
    loop: true,
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 8
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 8
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 16,
      }
    }
  });

  if (!recruitSliders) return false;

  $('.recruit-tabs .nav-link').on('shown.bs.tab', function() {
    recruitSliders.forEach(slider => {
      slider.update();
    });
  });
});

$(function() {
  addSwiper('.brand-slider', {
    slidesPerView: 3,
    spaceBetween: 16,
    pagination: true,
    navigation: true,
    breakpoints: {
      576: {
        slidesPerView: 4
      },
      768: {
        slidesPerView: 5
      },
      992: {
        slidesPerView: 7,
      },
      1200: {
        slidesPerView: 9,
        spaceBetween: 20,
      }
    }
  });
});
