// swiper template
function addSwiper(selector, options = {}, nodes = null) {
  if (!nodes) {
    nodes = document.querySelectorAll(selector);
  }

  return Array.from(nodes, function (item) {
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

    if (options.loopedSlides === true) {
      options.loopedSlides = $sliderContainer.find(".swiper-slide").length;
    }

    return new Swiper($sliderEl, options);
  });
}

// solution + card-slider
$(function () {
  if (!$(".solution-slider").length) {
    return;
  }

  var cardSliders = [];
  var solutionSliders = [];

  $(".s-solution__grid").each(function () {
    var el = this;
    var cardEl = el.querySelectorAll(".card-slider");
    var solutionEl = el.querySelectorAll(".solution-slider");

    var thumbSlider = addSwiper(
      ".card-slider",
      {
        direction: "vertical",
        slidesPerView: "auto",
        freeMode: true,
        pagination: true,
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
      },
      cardEl
    )[0];

    var solutionSlider = addSwiper(
      ".solution-slider",
      {
        effect: "fade",
        allowTouchMove: false,
        pagination: true,
        thumbs: {
          swiper: thumbSlider,
        },
      },
      solutionEl
    )[0];

    cardSliders.push(thumbSlider);
    solutionSliders.push(solutionSlider);
  });

  if (!cardSliders.length) return;

  $(".js-solution-tab").on("shown.bs.tab", function () {
    cardSliders.forEach((slider) => slider.update());
    solutionSliders.forEach((slider) => slider.update());
  });
});

// Feedback slider
$(function () {
  addSwiper(".feedback-slider", {
    slidesPerView: 1,
    spaceBetween: 16,
    loop: true,
    navigation: true,
    speed: 600,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      576: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
    },
  });
});

// Project slider
$(function () {
  var projectSliders = addSwiper(".project-slider", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 1.5,
    loop: true,
    loopedSlides: true,
    navigation: true,
    coverflowEffect: {
      rotate: 15,
      stretch: 0,
      depth: 10,
      modifier: 1,
      slideShadows: false,
    },
    breakpoints: {
      576: {
        slidesPerView: 3,
      },
    },
  });

  if (!projectSliders) return;

  $(".js-project-tab").on("shown.bs.tab", function () {
    projectSliders.map((slider) => {
      slider.update();
    });
  });
});

// video slider
$(function () {
  addSwiper(".video-slider", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    loopedSlides: true,
    navigation: true,
    pagination: true,
    spaceBetween: 10,
    coverflowEffect: {
      rotate: 15,
      stretch: 0,
      depth: 0,
      modifier: 1,
      slideShadows: false,
    },
  });
});
