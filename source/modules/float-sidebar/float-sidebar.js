$(function () {
  $(".js-float-sidebar-open").on("click", function () {
    const target = $(this).data("target");

    $(target).addClass("is-show");
  });

  $(".float-sidebar__close").on("click", function () {
    $(this).closest(".float-sidebar").removeClass("is-show");
  });
});
