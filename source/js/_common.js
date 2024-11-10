$(function() {
    $elements = $('.js-select2');

    if (!$elements.length) return;

    $elements.each(function() {
        const data = {};
        const $el = $(this);

        if ($el.data('placeholder')) {
            data.placeholder = $el.data('placeholder');
        }

        $el.select2(data);
    });
});

$(function() {
    $('.js-toggle-show-password').on('click', function() {
        const $parent = $(this).closest('.input-group');
        const $input = $parent.find('input');

        $parent.toggleClass('active');

        if ($parent.hasClass('active')) {
            $input.attr('type', 'text');
        } else {
            $input.attr('type', 'password');
        }
    })
})

$(function() {
    $('.js-datepicker').datepicker();
});
