// n-select
$(function () {
  $(".n-select__field").on("click", "span", function (e) {
    e.stopPropagation();
    $(this).parent().siblings(".n-select__dropdown").fadeToggle();
  });

  $("html, body").on("click", function () {
    $(".n-select__dropdown").fadeOut();
  });
});
