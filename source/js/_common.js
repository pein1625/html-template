$(function() {
  $('.departure__header').on('click', function(e) {
    e.preventDefault();

    $(this).toggleClass('active').siblings('.departure__body').slideToggle('fast');
  });
});

$(function() {
  const $window = $(window);
  const $header = $('.header');

  $window.on('scroll', function() {
    if ($window.width() < 1200) return false;

    if ($window.scrollTop() >= 122) {
      $header.addClass('is-fixed');
    }
    else {
      $header.removeClass('is-fixed');
    }
  });
});

$(function() {
  new WOW().init();
});
