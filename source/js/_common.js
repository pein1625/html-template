/*
Check is on screen
Usage: $el.isOnScreen(percentage)
Params:
- percentage: % of element's height is on screen
+ percentage === 1 => entire div is on screen
+ percentage === 0 => an edge of div is on screen
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
