$(function() {
  handleSearch();
});

function handleSearch() {
  $searchSelector = $('.bs-search__selector');

  $('html, body').on('click', function() {
    $searchSelector.removeClass('active');
  });

  $('.bs-search__input').on('click', function(e) {
    e.stopPropagation();

    const $el = $(this);
    const $selector = $el.closest('.bs-search__selector');

    $searchSelector.removeClass('active');
    $selector.toggleClass('active');
    $selector.find('.bs-search__dropdown-search').focus();
  });

  $('.bs-search__dropdown').on('click', function(e) {
    e.stopPropagation();
  });

  $('.bs-search__dropdown-item').on('click', function() {
    const $el = $(this);
    const $selector = $el.closest('.bs-search__selector');
    const $input = $selector.find('.bs-search__input');
    const $items = $el.closest('.bs-search__dropdown').find('.bs-search__dropdown-item');

    const text = $el.text();

    $items.removeClass('is-selected');
    $el.addClass('is-selected');
    $input.val(text);

    $selector.removeClass('active');
  });

  $('.bs-search__dropdown-search').on('input', function() {
    const $el = $(this);
    const $items = $el.closest('.bs-search__dropdown').find('.bs-search__dropdown-item');

    const search = removeVietnameseTones($el.val().toLowerCase());

    $items.each(function() {
      const $item = $(this);
      const itemText = $item.text();

      if (removeVietnameseTones(itemText.toLowerCase()).indexOf(search) >= 0) {
        $item.removeClass('d-none');
      } else {
        $item.addClass('d-none');
      }
    });
  });
}

function removeVietnameseTones(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y");
  str = str.replace(/đ/g,"d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g," ");
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
  return str;
}
