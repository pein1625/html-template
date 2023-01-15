$(function() {
  const $window = $(window);
  const $search = $('.search');

  $('.btn-search').on('click', function(e) {
    e.stopPropagation();
    $search.fadeToggle();
  });

  $search.on('click', function(e) {
    e.stopPropagation();
  });

  $('html, body').on('click', function() {
    if ($window.width() < 1200) return;

    $search.hide();
  });
});

$(function() {
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
    const paddingLeft = $(window).width() > 1440 ? '30px' : '15px';

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
        scrollTop = $(window).scrollTop();

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
          left: paddingLeft,
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
