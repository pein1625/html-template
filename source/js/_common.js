$(function() {
  const $window = $(window);
  const $header = $('.header');

  $window.on('scroll', function() {
    if ($window.scrollTop() > 30) {
      $header.addClass('is-fixed');
    } else {
      $header.removeClass('is-fixed');
    }
  });
});
