/*
Check is on screen.
*/
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
