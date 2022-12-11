/**
 * JS Count To:
 * Usage: (data-count-to="1000")
 * */
(function ($) {
  $.fn.countTo = function (options) {
    options = $.extend({}, $.fn.countTo.defaults, options || {});

    const $this = $(this);
    const loops = Math.ceil(options.speed / options.refreshInterval);
    const increment = (options.to - options.from) / loops;

    return $this.each(function () {
      var _this = this,
        loopCount = 0,
        value = options.from,
        interval = setInterval(updateTimer, options.refreshInterval);

      function updateTimer() {
        value += increment;
        loopCount++;

        $this.html(Math.ceil(value).toLocaleString("en"));

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
    from: 0, // Start counting number
    to: 100, // Finish counting number
    speed: 1000, // how long it should take to count between the target numbers
    refreshInterval: 100, // how often the element should be updated
    decimals: 0, // the number of decimal places to show
    onUpdate: null, // callback method for every time the element is updated,
    onComplete: null, // callback method for when the element finishes updating
  };

  try {
    const $count = $("[data-count-to]");

    count();

    $(window).on("scroll", count);

    function count() {
      $count.not(".activated").each(function () {
        const $el = $(this);
        const from = $el.data("countFrom") || 0;
        const to = $el.data("countTo");
        const speed = $el.data("speed") || 2000;

        if ($el.isOnScreen(1)) {
          $el.addClass("activated").countTo({
            from,
            to,
            speed,
            refreshInterval: 5,
          });
        }
      });
    }

  }
  catch (e) {
    console.error('CountTo Error: ', e);
  }
})(jQuery);
