$(function() {
  $('.departure__header').on('click', function(e) {
    e.preventDefault();

    $(this).toggleClass('active').siblings('.departure__body').slideToggle('fast');
  });
});
