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
