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

function sampleSyncSlider() {
  if (!$(".sample-slider, .sample-thumb-slider").length) {
    return;
  }

  const $modal = $('.md-sample-detail');
  const $modalGrid = $modal.find('.md-sample-detail__grid');

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

  $('.js-sample-slide').on('click', function() {
    let images = $(this).data('images').split(',');

    console.log('images', images);

    $modal.modal('show');

    $modalGrid.empty();

    images.forEach(image => {
      $modalGrid.append(`
<div class="md-sample-detail__col">
    <a class="md-sample-detail__frame" href="${image}" data-fancybox="sample-detail">
        <img src="${image}" alt="" />
    </a>
</div>
      `);
    });
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
}
