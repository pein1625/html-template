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
});
