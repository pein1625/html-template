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

    if (totalDiscount) {
      $('.js-cart-total-discount').removeClass('d-none').text(`${totalDiscount.toLocaleString('en')} ₫`);
    } else {
      $('.js-cart-total-discount').addClass('d-none');
    }
  }
});
