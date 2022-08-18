$(function() {// just grab a DOM element
  var element = document.querySelector('#zoom-scene');
  if (!element) return;

  // And pass it to panzoom
  panzoom(element)
});
