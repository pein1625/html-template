$(function() {
  const $search = $('.search');

  $('.btn-search').on('click', function() {
    $search.addClass('show');
  });

  $('.search__close').on('click', function() {
    $search.removeClass('show');
  });
});
