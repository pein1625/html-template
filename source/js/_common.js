$(function() {
  $('.js-star-rating-filter').on('change', function() {
    if ($(this).prop('checked')) {
      $('.js-star-rating-filter').not($(this)).prop('checked', false);
    }
  });
});

$(function() {
  $('.js-number-input').on('input', function() {
    const value = $(this).val();
    let newVal = value.replace(/[^0-9]/g, '');

    if (newVal !== '') {
      newVal = Number(newVal).toLocaleString('en-US');
    }

    $(this).val(newVal);
  });
});

$(function() {
  $('.js-show-more-products').on('click', function(e) {
    e.preventDefault();
    const $parent = $(this).closest('.js-show-more-products-wrapper');

    if ($parent.length) {
      $parent.hide();
    } else {
      $(this).hide();
    }

    $('.js-hidden-product').removeClass('d-none');
  });
});

$(function() {
  const $window = $(window);
  const $search = $('.search');
  const $searchBtn = $('.search-btn');

  $searchBtn.on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    $searchBtn.toggleClass('active');

    if ($searchBtn.hasClass('active')) {
      $search.fadeIn();
      $search.find('input').focus();
    } else {
      $search.fadeOut();
    }
  });

  $search.on('click', function(e) {
    e.stopPropagation();
  });

  $('html, body').on('click', function() {
    if ($window.width() >= 1200) return;

    $search.fadeOut();
    $searchBtn.removeClass('active');
  });
});
