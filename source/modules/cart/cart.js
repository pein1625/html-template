$(function() {
  var $body = $('body');
  var $cart = $('.js-cart');
  var $cartOpen = $('.js-cart-open');
  var $cartClose = $('.js-cart-close');

  $cartOpen.on('click', function(e) {
    e.preventDefault();

    $cart.addClass('is-show');
    $body.addClass('overflow-hidden');
  });

  $cartClose.on('click', function(e) {
    e.preventDefault();

    $cart.removeClass('is-show');
    $body.removeClass('overflow-hidden');
  });
});
