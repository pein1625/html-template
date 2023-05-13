
let modalTimeout = null;

$(function() {
  $('.js-switch-modal').on('click', function(e) {
    e.preventDefault();

    let target = $(this).attr('href');

    if (!target) {
      target = $(this).data('target');
    }

    $(this).closest('.modal').modal('hide');

    if (target && $(target).length) {
      setTimeout(() => {
        $(target).modal('show');
      }, 300);
    }
  });

  $('.js-survey-form').on('submit', onSurveySubmit);
});

async function onSurveySubmit(e) {
  e.preventDefault();

  const data = $(this).serializeArray().reduce((carry, item) => {
    // const re = new RegExp(/^([a-zA-Z0-9_-]+)\[([a-zA-Z0-9_-]+)\]$/);

    // if (re.test(item.name)) {
    //   const match = item.name.match(re);
    //   const key = match[1];
    //   const subKey = match[2];

    //   if (!carry[key]) carry[key] = {};

    //   carry[key][subKey] = item.value;
    // } else {
    //   carry[item.name] = item.value;
    // }

    carry.push(item.value);

    return carry;
  }, []);

  const surveyResult = await submitSurvey(data);

  $('.js-survey-result').empty().append(`
<div>
  <div class="modal-card"><img src="${surveyResult.image}" alt=""></div>
  <div class="modal-subtitle">${surveyResult.title}</div>
  <div class="modal-desc">${surveyResult.description}</div>
  <div class="modal-button-group"><a class="button" href="${surveyResult.url}">Xem chi tiết</a></div>
</div>
  `);

  showModal('.md-survey-result');
}

function hideModal() {
  const $modal = $('.modal.show');

  if ($modal.length) {
    $modal.modal('hide');
  }
}

function showModal(modalSelector, cb) {
  hideModal();

  const $modal = $(modalSelector);

  if ($modal.length) {
    clearTimeout(modalTimeout);
    modalTimeout = setTimeout(() => {
      if (cb && typeof cb === 'function') cb();
      $modal.modal('show');
    }, 300);
  }
}

function timeFormat(time, type = 1) {
  let seconds = Math.floor(time % 60);
  let minutes = Math.floor((time / 60) % 60);

  if (type === 1) {
    seconds = ('0' + seconds).slice(-2);
    return minutes + ':' + seconds;
  }

  if (type === 2) {
    minutes = minutes ? minutes + ' phút' : '';
    seconds = seconds ? seconds + ' giây' : '';

    return [minutes, seconds].filter(time => time).join(' ');
  }

  return '';
}

// file input
$(function () {
  $(".js-file-input").on("change", function () {
    var fileName = $(this).val().split(/\\|\//).pop();

    $(this).closest(".js-file").find(".js-file-text").text(fileName);

    var target = $(this).data("target");
    if (target) {
      readURL(this, target);
    }
  });

  function readURL(input, target) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $(target).show();
        $(target).attr("src", e.target.result);
      };

      reader.readAsDataURL(input.files[0]);
    }
  }
});
