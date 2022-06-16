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

$(function() {
  const $container = $('.project-sync');

  $('.img-slider, .info-slider__title, .info-slider__link')
  .on('mouseover', function() {
    $container.addClass('active');
  })
  .on('mouseleave', function() {
    $container.removeClass('active');
  });
});

$(function() {
  const $window = $(window);
  const $content = $('.intro-slider__content');
  const $frame = $('.intro-slider__frame');

  if (!$frame.length || $window.width() < 992) return;

  $window.on('scroll', calcPos);

  function calcPos() {
    const windowHeight = $window.height();
    const scrollTop = $window.scrollTop();
    const framePos = $frame.offset().top - windowHeight * 2 / 3 - scrollTop + $frame.outerHeight() / 2;
    const contentPos = $content.offset().top - windowHeight * 2 / 3 - scrollTop + $content.outerHeight() / 2;

    $content.css('transform', `translateX(-${contentPos > 0 ? Math.floor(contentPos / 2) : 0}px)`)
    $frame.css('transform', `translateX(${framePos > 0 ? Math.floor(framePos / 2) : 0}px)`)
  }
});

$(function() {
  const $window = $(window);
  const $content = $('.parallax-1');

  if (!$content.length || $window.width() < 992) return;

  $window.on('scroll', calcPos);

  function calcPos() {
    const windowHeight = $window.height();
    const scrollTop = $window.scrollTop();
    const contentPos = $content.offset().top - windowHeight * 2 / 3 - scrollTop + $content.outerHeight() / 3;

    $content.css('transform', `translateY(${contentPos > 0 ? Math.floor(contentPos / 5) : 0}px)`)
  }
});
