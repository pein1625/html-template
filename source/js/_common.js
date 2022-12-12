$(function() {
  const $window = $(window);

  $('.mega__item').on('mouseenter', function() {
    const imageUrl = $(this).data('img');
    if (!imageUrl || $window.width() < 1200) return false;

    $(this).closest('.mega').find('.mega__img').attr('src', imageUrl);
  });
});

$(function() {
  $('.accor__header').on('click', function() {
    $(this).toggleClass('active').siblings('.accor__body').slideToggle('fast');
  });
});

$(function() {
  new WOW().init();
});
