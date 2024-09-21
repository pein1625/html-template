// search button toggle
$(function () {
  $(".search-btn").on("click", function (e) {
    e.stopPropagation();

    $(".search").slideToggle('fast');
    $(".search").find("input").focus();
  });

  $(".search").on("click", function (e) {
    e.stopPropagation();
  });

  $("html, body").on("click", function () {
    if ($(window).width() >= 1200) {
      $(".search").slideUp('fast');
    }
  });

  $('.js-password-field').on('click', '.input-group-text', function(e) {
    e.preventDefault();

    const $btn = $(this);
    const $group = $btn.closest('.js-password-field');
    const $input = $group.find('.form-control');

    $group.toggleClass('show-password');

    if ($group.hasClass('show-password')) {
      $input.attr('type', 'text');
      $btn.empty().append(`<i class="fal fa-fw fa-eye-slash" />`);
    } else {
      $input.attr('type', 'password');
      $btn.empty().append(`<i class="fal fa-fw fa-eye" />`);
    }
  });
});
