// file input
$(function () {
  $(".js-file-input").on("change", function () {
    var fileName = $(this).val().split(/\\|\//).pop();

    $(this).closest(".js-file").find(".js-file-text").text(fileName);

    var target = $(this).data("target");
    if (target) {
      readURL(this, target);
    }
  });

  function readURL(input, target) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $(target).show();
        $(target).attr("src", e.target.result);
      };

      reader.readAsDataURL(input.files[0]);
    }
  }
});
