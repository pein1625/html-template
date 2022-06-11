$(function() {
  const $search = $('.search');

  $('.search-btn').on('click', function() {
    $search.addClass('show');
  });

  $('.search__close').on('click', function() {
    $search.removeClass('show');
  });
});

$(function() {
  $('.filter__btn').on('click', function() {
    $('.filter__box').slideToggle('fast');
  })
});

$(function() {
  new WOW().init();
});
