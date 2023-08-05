$(function () {
  $(".expandable").each(function () {
    const $el = $(this);
    const $content = $el.find(".expandable__content");
    const $btn = $el.find(".expandable__toggle");
    const height = $el.data("height") || 300;

    if ($content.height() > height) {
      $el.css("height", height);
    } else {
      $el.addClass("show");
    }

    $btn.on("click", function (e) {
      e.preventDefault();

      const $toggle = $(this);
      const $el = $toggle.closest(".expandable");

      $el.toggleClass("expand");
    });
  });
});
