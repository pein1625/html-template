$(function() {
    var $search = $('.search');

    $('.h-search-toggle').on('click', function(e) {
        e.stopPropagation();
        $search.fadeToggle();
    });

    $search.on('click', function(e) {
        e.stopPropagation();
    });

    $('html, body').on('click', function() {
        if ($(window).width() < 1200) return;

        $search.fadeOut();
    })
});
