$(function () {
  $(".expandable").each(function () {
    var $el = $(this);
    var $content = $el.find(".expandable__content");
    var $btn = $el.find(".expandable__toggle");
    var height = $el.data("height") || 300;

    if ($content.height() > height) {
      $el.css("height", height);
    } else {
      $el.addClass("show");
    }

    $btn.on("click", function (e) {
      e.preventDefault();

      var $toggle = $(this);
      var $el = $toggle.closest(".expandable");

      $el.toggleClass("expand");
    });
  });
});
