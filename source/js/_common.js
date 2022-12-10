$(function() {
  const $window = $(window);

  $('.mega__item').on('mouseenter', function() {
    const imageUrl = $(this).data('img');
    if (!imageUrl || $window.width() < 1200) return false;

    $(this).closest('.mega').find('.mega__img').attr('src', imageUrl);
  });
});
