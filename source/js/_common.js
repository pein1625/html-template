
// Check is on screen
(function ($) {
  const $window = $(window);

  $.fn.isOnScreen = function (percent = 1) {
    const $el = $(this);
    let scrollTop = $window.scrollTop();
    let screenHeight = $window.outerHeight();
    let offsetTop = $el.offset().top;
    let height = $el.outerHeight();

    return (
      scrollTop > offsetTop - screenHeight + percent * height &&
      scrollTop < offsetTop + (1 - percent) * height
    );
  };
})(jQuery);

// count To
// js-count-to(data-count-to="1000")
(function ($) {
  $.fn.countTo = function (options) {
    // merge the default plugin settings with the custom options
    options = $.extend({}, $.fn.countTo.defaults, options || {});

    // how many times to update the value, and how much to increment the value on each update
    var loops = Math.ceil(options.speed / options.refreshInterval),
      increment = (options.to - options.from) / loops;

    return $(this).each(function () {
      var _this = this,
        loopCount = 0,
        value = options.from,
        interval = setInterval(updateTimer, options.refreshInterval);

      function updateTimer() {
        value += increment;
        loopCount++;
        // $(_this).html(value.toFixed(options.decimals));
        $(_this).html(Math.floor(value).toLocaleString("en"));

        if (typeof options.onUpdate == "function") {
          options.onUpdate.call(_this, value);
        }

        if (loopCount >= loops) {
          clearInterval(interval);
          value = options.to;

          if (typeof options.onComplete == "function") {
            options.onComplete.call(_this, value);
          }
        }
      }
    });
  };

  $.fn.countTo.defaults = {
    from: 0, // the number the element should start at
    to: 100, // the number the element should end at
    speed: 1000, // how long it should take to count between the target numbers
    refreshInterval: 100, // how often the element should be updated
    decimals: 0, // the number of decimal places to show
    onUpdate: null, // callback method for every time the element is updated,
    onComplete: null, // callback method for when the element finishes updating
  };
})(jQuery);

jQuery(function ($) {
  // requirement
  if (!$.fn.isOnScreen) {
    console.warn("Jquery.isOnScreen function is required!");
    return;
  }

  const $window = $(window);
  const $count = $(".js-count-to");

  count();

  $(window).on("scroll", count);

  function count() {
    let vh = $window.outerHeight();
    let scrollTop = $window.scrollTop();

    $count.not(".actived").each(function () {
      let $el = $(this);
      let count = $(this).data("countTo");

      if ($el.isOnScreen(1)) {
        $el.addClass("actived").countTo({
          from: 0,
          to: count,
          speed: 2000,
          refreshInterval: 5,
        });
      }
    });
  }
});

$(function() {
  $('.payment-info__title').on('click', function() {
    $('.payment-info__title.active').not($(this)).removeClass('active');
    $(this).toggleClass('active');
    $(this).siblings('.payment-info__content').slideToggle();
  });
});

$(function() {
  $('.policy__title').on('click', function() {
    $('.policy__title.active').not($(this)).removeClass('active');
    $(this).toggleClass('active');
    $(this).siblings('.policy__content').slideToggle();
  });
});

$(function() {
  new WOW().init();
});
