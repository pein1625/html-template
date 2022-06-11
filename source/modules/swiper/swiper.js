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
  const infoSlider = addSwiper('.info-slider', {
    speed: 600,
    loop: true,
    navigation: true,
    pagination: true
  })[0];

  const imgSlider = addSwiper('.img-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    }
  })[0];

  if (infoSlider && imgSlider) {
    infoSlider.controller.control = imgSlider;
    imgSlider.controller.control = infoSlider;
  }
});

$(function() {
  addSwiper('.intro-slider', {
    speed: 600,
    loop: true,
    navigation: true,
    pagination: true,
    spaceBetween: 30,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    }
  })[0];
});

$(function() {
  addSwiper('.banner-slider', {
    speed: 800,
    loop: true,
    navigation: true,
    pagination: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    }
  })[0];
});
