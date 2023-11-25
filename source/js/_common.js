$(function() {
  $('.js-star-rating-filter').on('change', function() {
    if ($(this).prop('checked')) {
      $('.js-star-rating-filter').not($(this)).prop('checked', false);
    }
  });
});

$(function() {
  $('.js-number-input').on('input', function() {
    const value = $(this).val();
    let newVal = value.replace(/[^0-9]/g, '');

    if (newVal !== '') {
      newVal = Number(newVal).toLocaleString('en-US');
    }

    $(this).val(newVal);
  });
});

$(function() {
  $('.js-media-uploader').each(function() {
    const $uploader = $(this).find('.js-media-uploader-list');
    const $imageInput = $(this).find('.js-media-image-input');
    const $videoInput = $(this).find('.js-media-video-input');

    $imageInput.on('change', renderItems);
    $videoInput.on('change', renderItems);

    $uploader.on('click', '.media-uploader__remove', function() {
      const removeIndex = Number($(this).data('index'));
      const type = $(this).data('type');
      let input;

      if (type === 'image') {
        input = $imageInput[0];
      } else if (type === 'video') {
        input = $videoInput[0];
      }

      const dt = new DataTransfer();

      const { files } = input;

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        if (i !== removeIndex)
          dt.items.add(file) // here you exclude the file. thus removing it.
      }

      input.files = dt.files;

      $(this).closest('.js-media-uploader-item').remove();
    });

    function renderItems() {
      const imageFiles = $imageInput[0].files;
      const videoFiles = $videoInput[0].files;

      $uploader.find('.js-media-uploader-item').remove();

      Object.values(imageFiles).forEach((imageFile, index) => {
        const url = URL.createObjectURL(imageFile);

        $uploader.append(`
  <div class="media-uploader__item js-media-uploader-item">
      <img src="${url}" alt="" />
      <button class="media-uploader__remove" data-index="${index}" data-type="image" type="button">
        <i class="fal fa-times"></i>
      </button>
  </div>
        `);
      });

      Object.values(videoFiles).forEach((videoFile, index) => {
        const url = URL.createObjectURL(videoFile);

        $uploader.append(`
  <div class="media-uploader__item js-media-uploader-item">
      <video><source src="${url}" /></video>
      <button class="media-uploader__remove" data-index="${index}" data-type="video" type="button">
        <i class="fal fa-times"></i>
      </button>
      <div class="media-uploader__video-overlay"><i class="fal fa-play-circle"></i></div>
  </div>
        `);
      });
    }
  });
});

$(function() {
  const $avatar = $('.pf-uploader__avatar');

  $('.pf-uploader__input').on('change', function() {
    const url = URL.createObjectURL(this.files[0]);

    console.log('url', url);

    $avatar.empty().append(`<img src="${url}" alt="" />`);
  });
});

$(function() {
  $('.label-star-input')
    .on('change mouseenter', 'input', function() {
      const labelText = $(this).data('label');
      $(this).closest('.label-star-input').find('.label-star-input__label').text(labelText);
    })
    .on('mouseleave', 'input', function() {
      const $container = $(this).closest('.label-star-input');
      const labelText = $container.find('input:checked').data('label');
      $container.find('.label-star-input__label').text(labelText);
    });
});

$(function() {
  $messageModal = $('.md-message');

  if (!$messageModal.length) return false;

  let timeout = null;

  $messageModal.on('shown.bs.modal', function() {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      $messageModal.modal('hide');
    }, 4000);
  });

  setTimeout(function() {
    if ($messageModal.data('auto-show')) {
      $messageModal.modal('show');
    }
  }, 1000);
});

$(function() {
  floating();
});

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

  $(window).on("scroll resize", function () {
    $(".floating").each(function () {
      var $floating = $(this),
        offsetTop = $floating.data("offsetTop"),
        height = $floating.outerHeight(),
        outerHeight = $floating.outerHeight(true),
        $container = $floating.closest(".floating-container"),
        dataTop = $floating.data("top"),
        top = dataTop !== undefined ? parseInt(dataTop) : 24,
        containerHeight = $container.outerHeight(),
        containerOffsetTop = $container.offset().top,
        offsetLeft = $container.data("offsetLeft"),
        scrollTop = $(window).scrollTop();

      if (outerHeight + offsetTop == containerHeight + containerOffsetTop) {
        return;
      } else if ($(window).width() < 1200 || scrollTop + top <= offsetTop) {
        $(this).css({
          position: "static",
        }).width('100%');
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

$(function() {
  $('.od-user__toggle').on('click', function(e) {
    e.preventDefault();

    $(this).toggleClass('active');
    $(this).closest('.od-grid__aside').find('.od-menu').slideToggle();;
  })
});
