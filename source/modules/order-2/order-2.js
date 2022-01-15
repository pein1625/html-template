$(function () {
    $('.js-order-toggle').on('change', function () {
        var checked = $(this).prop('checked');
        var $expand = $('.order__info--expand');

        if (checked) {
            $expand.slideUp();
        } else {
            $expand.slideDown();
        }
    });
});
