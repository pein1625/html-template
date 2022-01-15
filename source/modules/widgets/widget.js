$(function () {
  $(".lang__toggle").on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    $(".lang__dropdown").toggleClass("show");
  });

  $(".lang__dropdown").on("click", function () {
    e.stopPropagation();
  });

  $("html, body").on("click", function () {
    $(".lang__dropdown").removeClass("show");
  });
});
