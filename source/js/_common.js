$(function() {
  $('.js-search-toggle').on('click', function(e) {
    $('.search').fadeToggle('fast');
  });
});

$(function() {
  $('.h-dropdown__toggle').on('click', function(e) {
    e.stopPropagation();

    $(this).siblings('.h-dropdown__menu').fadeToggle('fast');
    $('.h-dropdown__menu').not($(this).siblings('.h-dropdown__menu')).hide();
  });

  $('.h-dropdown__menu').on('click', function(e) {
    e.stopPropagation();
  });

  $('html, body').on('click', function() {
    $('.h-dropdown__menu').fadeOut('fast');
  });
});
