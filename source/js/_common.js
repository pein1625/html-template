$(function () {
  $(".search-toggle").on("click", function (e) {
    e.stopPropagation();
    $(".search").fadeToggle("fast");
  });

  $(".search").on("click", function (e) {
    e.stopPropagation();
  });

  $("html, body").on("click", function (e) {
    if ($(window).width() < 1200) return;

    $(".search").fadeOut("fast");
  });
});

$(function () {
  $(".faq__question").on("click", function () {
    $(this).toggleClass("active").siblings(".faq__answer").fadeToggle("fast");
  });
});

$(function () {
  $(".js-datepicker").datepicker();
});
