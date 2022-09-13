$(function() {
  $('.js-copy-link').on('click', function(e) {
    e.preventDefault();
    const url = $(this).attr('href');
    const $span = $(this).find('span');

    $span.text('Copied');

    copyTextToClipboard(url);

    setTimeout(() => {
      $span.text('Copy link');
    }, 1000);
  })
});

$(function() {
  floating();
});

function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}
function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(function() {
    console.log('Async: Copying to clipboard was successful!');
  }, function(err) {
    console.error('Async: Could not copy text: ', err);
  });
}


// floating
function floating() {
  $(".floating").each(function () {
    var $floating = $(this),
      width = $floating.width(),
      offsetLeft = $floating.offset().left,
      offsetTop = $floating.offset().top;

    $floating.data("offsetLeft", offsetLeft).data("offsetTop", offsetTop).css({
      width: width,
    });
  });

  if ($(window).width() < 992) {
    return;
  }

  $(window).on("scroll", function () {
    $(".floating").each(function () {
      var $floating = $(this),
        offsetTop = $floating.data("offsetTop"),
        offsetLeft = $floating.data("offsetLeft"),
        height = $floating.outerHeight(),
        outerHeight = $floating.outerHeight(true),
        $container = $floating.closest(".floating-container"),
        dataTop = $floating.data("top"),
        top = dataTop !== undefined ? parseInt(dataTop) : 30,
        containerHeight = $container.outerHeight(),
        containerOffsetTop = $container.offset().top,
        scrollTop = $(window).scrollTop();

      if (outerHeight + offsetTop == containerHeight + containerOffsetTop) {
        return;
      } else if (scrollTop + top <= offsetTop) {
        $(this).css({
          position: "static",
        });
      } else if (
        scrollTop + height + top >
        containerHeight + containerOffsetTop
      ) {
        $(this).css({
          position: "absolute",
          zIndex: 2,
          top: "auto",
          bottom: 0,
          left: "15px",
        });
      } else {
        $(this).css({
          position: "fixed",
          zIndex: 2,
          top: top,
          left: offsetLeft,
          bottom: "auto",
        });
      }
    });
  });
}
