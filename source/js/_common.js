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

$(function() {
  $('.aside__title').on('click', function() {
    $(this).toggleClass('active').siblings('.aside__body').slideToggle('fast');
  })
});

$(function() {
  $('.product__toggle-modal').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    var target = $(this).data('target');
    $(target).modal('show');
  });
});
