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
  $('.js-show-more-products').on('click', function(e) {
    e.preventDefault();
    const $parent = $(this).closest('.js-show-more-products-wrapper');

    if ($parent.length) {
      $parent.hide();
    } else {
      $(this).hide();
    }

    $('.js-hidden-product').removeClass('d-none');
  });
});

$(function() {
  const $window = $(window);
  const $search = $('.search');
  const $searchBtn = $('.search-btn');

  $searchBtn.on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    $searchBtn.toggleClass('active');

    if ($searchBtn.hasClass('active')) {
      $search.fadeIn();
      $search.find('input').focus();
    } else {
      $search.fadeOut();
    }
  });

  $search.on('click', function(e) {
    e.stopPropagation();
  });

  $('html, body').on('click', function() {
    if ($window.width() >= 1200) return;

    $search.fadeOut();
    $searchBtn.removeClass('active');
  });
});

// $(function() {
//   $('.js-number-input').on('input', function() {
//     const value = $(this).val();
//     let newVal = value.replace(/[^0-9]/g, '');

//     if (newVal !== '') {
//       newVal = Number(newVal).toLocaleString('en-US');
//     }

//     $(this).val(newVal);
//   });
// });

$(function () {
  // number input
  $(document).on(
    "input",
    "[data-type='number'], .js-input-number",
    function () {
      var val = $(this).val();
      var newVal = val.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");

      $(this).val(newVal);
    }
  );

  // quantity
  $(document).on("click", ".quantity__btn", function (e) {
    e.preventDefault();

    var $siblingInput = $(this).siblings(".quantity__input");
    var plus = $(this).data("plus");
    var value = $siblingInput.val();
    var newValue = parseInt(value) + plus;
    var min = $siblingInput.data("min") || 1;

    if (newValue >= min) {
      $siblingInput.val(newValue);
      $siblingInput.trigger("change");
    }
  });

  $(document).on("blur", ".quantity__input", function (e) {
    e.preventDefault();

    if ($(this).val() === "" || $(this).val() === "0") {
      $(this).val(1);
      $(this).trigger("change");
    }
  });
});

$(function() {
  $('.js-cart-check-all').on('change', function() {
    const checked = $(this).prop('checked');
    console.log('checked', checked);
    $('.js-cart-check-item').prop('checked', checked).trigger('change');
  });

  $('.js-cart-check-group').on('change', function() {
    const checked = $(this).prop('checked');
    const $itemCheckbox = $(this).closest('.cart__group').find('.js-cart-check-item');
    $itemCheckbox.prop('checked', checked).trigger('change');
  });

  $('.js-cart-check-item, .js-cart-quantity').on('change', function() {
    calcSubtotal();
  });

  $('.js-cart-delete-item').on('click', function() {
    const $group = $(this).closest('.cart__group');
    const $item = $(this).closest('.cart__row');

    $item.remove();

    if (!$group.find('.js-cart-item').length) {
      $group.remove();
    }

    calcSubtotal();
  });

  $('.js-cart-delete-selected-items').on('click', function(e) {
    e.preventDefault();
    $('.js-cart-check-item:checked').closest('.js-cart-item').find('.js-cart-delete-item').trigger('click');
  });

  calcSubtotal();

  function calcSubtotal() {
    let itemCount = 0;
    let subtotal = 0;
    let totalDiscount = 0;
    let isAllChecked = true;
    let hasOneChecked = false;

    $('.cart__group').each(function() {
      const $el = $(this);
      const $items = $el.find('.js-cart-item');
      let isChecked = true;

      $items.each(function() {
        const unitPrice = Number($(this).data('unit-price'));
        const unitDiscount = Number($(this).data('discount'));
        const quantity = $(this).find('.js-cart-quantity').val() || 1;
        const value = unitPrice * quantity;
        const discount = unitDiscount * quantity;

        if (!$(this).find('.js-cart-check-item').prop('checked')) {
          isChecked = false;
          isAllChecked = false;
        } else {
          hasOneChecked = true;
        }

        totalDiscount += discount;
        subtotal += value;
        itemCount += 1;

        $(this).find('.js-cart-value').html(`${value.toLocaleString('en')} ₫`);
      });

      $el.find('.js-cart-check-group').prop('checked', isChecked);
    });

    $('.js-cart-check-all').prop('checked', isAllChecked);
    $('.js-cart-item-count').text(itemCount);
    $('.js-cart-subtotal').text(`${subtotal.toLocaleString('en')} ₫`);
    $('.js-cart-total-discount').removeClass('d-none').text(`${totalDiscount.toLocaleString('en')} ₫`);

    const $submitBtn = $('.js-cart-submit-btn');

    $submitBtn.prop('disabled', !hasOneChecked);
    console.log('disabled', !hasOneChecked);
  }
});

$(function() {
  $('.js-open-sidebar').on('click', function(e) {
    e.preventDefault();
    $('.js-sidebar').addClass('is-show');
    $('body').addClass('overflow-hidden');
  });

  $('.js-close-sidebar').on('click', function(e) {
    e.preventDefault();
    $('.js-sidebar').removeClass('is-show');
    $('body').removeClass('overflow-hidden');
  });

  $(window).on('resize', function() {
    if ($(window).width() >= 992) {
      $('.js-sidebar').removeClass('is-show');
      $('body').removeClass('overflow-hidden');
    }
  });
});

$(function() {
  $('.n-password__toggle').on('click', function(e) {
    e.preventDefault();

    const $btn = $(this);
    const $parent = $btn.closest('.n-password');
    const $input = $parent.find('input');

    $parent.toggleClass('is-visible');

    if ($parent.hasClass('is-visible')) {
      $input.attr('type', 'text');
      $btn.html('<i class="fal fa-fw fa-eye-slash"></i>');
    } else {
      $input.attr('type', 'password');
      $btn.html('<i class="fal fa-fw fa-eye"></i>');
    }
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
//   const $window = $(window);
//   const $aside = $('.od-grid__aside');
//   const $content = $('.od-grid__aside-content');

//   $window.on('scroll', function() {
//   });
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
