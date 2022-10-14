$(function() {
  $('.btn-search').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    $('.search').fadeToggle();
  })

  $('.search').on('click', function(e) {
    e.stopPropagation();
  });

  $('html, body').on('click', function() {
    if (window.innerWidth >= 1200 && $('.header--2, .header--3').length) {
      $('.search').hide();
    }
  });
});

$(function() {
  $('.footer__redirect').on('change', function() {
    let val = $(this).val();

    if (val) {
      window.location.href = val;
    }
  })
});

$(function() {
  const $window = $(window);
  const $header = $('.header');

  $window.on('scroll', function() {
    let offset = 35;

    if ($window.width() >= 1200) {
      offset = 131;
    }

    if ($window.scrollTop() > offset) {
      $header.addClass('is-fixed');
    } else {
      $header.removeClass('is-fixed');
    }
  });
});
