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
    effect: 'fade',
    navigation: true,
    pagination: true,
    speed: 800,
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
    slidesPerView: 4,
    freeMode: true,
    spaceBetween: 10,
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

  if (!thumbSlider) return;

  if (window.innerWidth < 992) return;

  $(".js-zoom").ezPlus({
    borderSize: 1,
    scrollZoom: true,
    zoomWindowWidth: 500,
    zoomWindowHeight: 500,
  });
});

$(function() {
  const imgSliders = addSwiper('.img-slider', {
    slidesPerView: 3,
    spaceBetween: 10,
    navigation: true,
  });
  if (!(imgSliders && imgSliders.length)) return;


  $(document).on('click', '.img-slider__frame', function() {
    let url = $(this).find('img').attr('src');
    $(this).closest('.modal-content').find('.md-product__frame img').attr('src', url);
});

  $('.md-product').on('shown.bs.modal', function() {
    imgSliders.forEach(slider => {
      slider.update();
    });
    // $(this).on('click', '.img-slider__frame img', function() {
    //   let url = $(this).attr('src');
    //   console.log(url);
    //   $(this).closest('.modal-content').find('.md-product__frame img').attr('src', url);
    // });
  });
});
