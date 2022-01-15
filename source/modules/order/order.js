$(function () {
  $(".js-payment-option").on("change", function () {
    if ($(".js-bank-transfer-option").prop("checked")) {
      $(".js-bank-transfer-info").slideDown();
    } else {
      $(".js-bank-transfer-info").slideUp();
    }
  });
});
