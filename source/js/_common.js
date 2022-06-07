$(function() {
  calc();

  $(window).on('resize', calc);
});

function calc() {
  $('img').each(function() {
    let width = $(this).width();

    $(this).closest('.js-col').find('.js-img-width').html(width);
  });
}
