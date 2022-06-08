$(function() {
  const $search = $('.search');

  $('.search-btn').on('click', function() {
    $search.addClass('show');
  });

  $('.search__close').on('click', function() {
    $search.removeClass('show');
  });
});
