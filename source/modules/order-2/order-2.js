$(function () {
    $('.js-order-toggle').on('change', function () {
        const checked = $(this).prop('checked');
        const $expand = $('.order__info--expand');

        if (checked) {
            $expand.slideUp();
        } else {
            $expand.slideDown();
        }
    });
});
