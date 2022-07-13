$(function() {
  $('.payment-info__title').on('click', function() {
    $('.payment-info__title.active').not($(this)).removeClass('active');
    $(this).toggleClass('active');
    $(this).siblings('.payment-info__content').slideToggle();
  });
});

$(function() {
  $('.policy__title').on('click', function() {
    $('.policy__title.active').not($(this)).removeClass('active');
    $(this).toggleClass('active');
    $(this).siblings('.policy__content').slideToggle();
  });
});

$(function() {
  new WOW().init();
});
