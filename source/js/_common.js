$(function() {
  const $window = $(window);
  const $header = $('.header');

  $window.on('scroll', function() {
    let offset = 30;

    if ($window.width() >= 1200) {
      offset = 150;
    }

    if ($window.scrollTop() >= offset) {
      $header.addClass('is-fixed');
    } else {
      $header.removeClass('is-fixed');
    }
  });
});

$(function() {
  const $search = $('.search');

  $('.js-search-close').on('click', function() {
    $search.removeClass('active');
  });

  $('.btn-search').on('click', function() {
    $search.addClass('active');
    $search.find('input').focus();
  });
});

$(function() {
  new WOW().init();
});
