$(function() {
  const $search = $('.search');

  $('.btn-search').on('click', function() {
    $search.addClass('show');
  });

  $('.search__close').on('click', function() {
    $search.removeClass('show');
  });
});

$(function() {
  const $window = $(window);
  const $content = $('.intro-slider__content');
  const $frame = $('.intro-slider__frame');

  if (!$frame.length || $window.width() < 992) return;

  $window.on('scroll', calcPos);

  function calcPos() {
    const windowHeight = $window.height();
    const scrollTop = $window.scrollTop();
    const framePos = $frame.offset().top - windowHeight * 2 / 3 - scrollTop + $frame.outerHeight() / 2;
    const contentPos = $content.offset().top - windowHeight * 2 / 3 - scrollTop + $content.outerHeight() / 2;

    $content.css('transform', `translateX(-${contentPos > 0 ? Math.floor(contentPos / 2) : 0}px)`)
    $frame.css('transform', `translateX(${framePos > 0 ? Math.floor(framePos / 2) : 0}px)`)
  }
});

$(function() {
  const $window = $(window);
  const $content = $('.parallax-1');

  if (!$content.length || $window.width() < 992) return;

  $window.on('scroll', calcPos);

  function calcPos() {
    const windowHeight = $window.height();
    const scrollTop = $window.scrollTop();
    $content.each(function() {
      const contentPos = $(this).offset().top - windowHeight * 2 / 3 - scrollTop + $content.outerHeight() / 3;

      $(this).css('transform', `translateY(${contentPos > 0 ? Math.floor(contentPos / 5) : 0}px)`)
    });
  }
});

$(function() {
  new WOW().init();

  floating();
});


// floating
function floating() {
  $(".floating").each(function () {
    var $floating = $(this),
      width = $floating.width(),
      offsetLeft = $floating.offset().left,
      offsetTop = $floating.offset().top;

    $floating.data("offsetLeft", offsetLeft).data("offsetTop", offsetTop).css({
      width: width,
    });
  });

  if ($(window).width() < 992) {
    return;
  }

  $(window).on("scroll", function () {
    $(".floating").each(function () {
      var $floating = $(this),
        offsetTop = $floating.data("offsetTop"),
        offsetLeft = $floating.data("offsetLeft"),
        height = $floating.outerHeight(),
        outerHeight = $floating.outerHeight(true),
        $container = $floating.closest(".floating-container"),
        dataTop = $floating.data("top"),
        top = dataTop !== undefined ? parseInt(dataTop) : 70,
        containerHeight = $container.outerHeight(),
        containerOffsetTop = $container.offset().top,
        scrollTop = $(window).scrollTop(),
        paddingLeft = $container.css('padding-left');

      if (outerHeight + offsetTop == containerHeight + containerOffsetTop) {
        return;
      } else if (scrollTop + top <= offsetTop) {
        $(this).css({
          position: "static",
        });
      } else if (
        scrollTop + height + top >
        containerHeight + containerOffsetTop
      ) {
        $(this).css({
          position: "absolute",
          zIndex: 2,
          top: "auto",
          bottom: 0,
          left: paddingLeft || 0,
        });
      } else {
        $(this).css({
          position: "fixed",
          zIndex: 2,
          top: top,
          left: offsetLeft,
          bottom: "auto",
        });
      }
    });
  });
}
