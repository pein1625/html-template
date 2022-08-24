$(function() {// just grab a DOM element
  $('.zoom-scene').each(function() {
    var element = this;
    if (!element) return;

    // And pass it to panzoom
    panzoom(element, {
      onDoubleClick: function(e) {
        // `e` - is current double click event.
        return false; // tells the library to not preventDefault, and not stop propagation
      },
      onTouch: function(e) {
        // `e` - is current touch event.

        return false; // tells the library to not preventDefault.
      }
    })

  });
});
