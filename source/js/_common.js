$(function() {
  const $window = $(window);
  const $search = $('.search');

  $('.btn-search').on('click', function(e) {
    e.stopPropagation();
    $search.fadeToggle();
    $search.find('input').focus();
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
  const $window = $(window);
  const $header = $('.header');

  $window.on('scroll', function() {
    if ($window.scrollTop() > 10) {
      $header.addClass('is-fixed');
    } else {
      $header.removeClass('is-fixed');
    }
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

  $(window).on("scroll resize", function () {
    const $container = $('.floating-container');

    if (!$container.length) return false;

    const paddingLeft = Number($container.css('padding-left').replace(/\D/g, '') || 15);
    const offsetLeft = $container.offset().left + paddingLeft;
    const offsetTop = $container.offset().top;

    $(".floating").each(function () {
      var $floating = $(this),
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

$(function() {
  $('[data-popup-url]').fancybox({
    afterShow: function(instance) {
      const url = instance['$trigger'].data('popup-url');

      if (url) {
        instance.current.$image.wrap(`<a href="${url}" target="_blank"></a>`);
      }

      console.log('trigger', instance, instance['$trigger']);
    }
  });
});

$(function () {
  $(window).on('resize', function() {
    if ($(window).width() >= 1200) {
      $('html, body').removeClass('overflow-hidden');
    }
  });
});
