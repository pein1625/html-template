// navbar mobile toggle
$(function () {
  const $body = $("html, body");
  const $navbar = $(".js-navbar");
  const $navbarToggle = $(".js-navbar-toggle");

  $navbarToggle.on("click", function () {
    $navbarToggle.toggleClass("active");
    $navbar.toggleClass("is-show");
    $body.toggleClass("overflow-hidden");
  });
});
