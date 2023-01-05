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
    if ($window.width() < 1200) return false;

    $search.hide();
  });
});
