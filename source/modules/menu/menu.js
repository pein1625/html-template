// menu toggle
$(function () {
  $(".menu-toggle").on("click", function () {
    var $toggle = $(this);

    $toggle.toggleClass("active").siblings(".menu-sub").slideToggle();

    $toggle.siblings(".menu-mega").children(".menu-sub").slideToggle();

    $toggle.parent().siblings(".menu-item-group").children(".menu-sub").slideUp();

    $toggle.parent().siblings(".menu-item-group").children(".menu-mega").children(".menu-sub").slideUp();

    $toggle.parent().siblings(".menu-item-group").children(".menu-toggle").removeClass("active");
  });

  $(".menu-item-group > .menu-link, .menu-item-mega > .menu-link").on("click", function (e) {
    if ($(window).width() < 1200 || !mobileAndTabletCheck()) return;

    e.preventDefault();
  });
});
