let modalTimeout = null;

$(function () {
  enableSurveySubmit();

  $(".js-survey-input").on("change", enableSurveySubmit);

  $(".js-switch-modal").on("click", function (e) {
    e.preventDefault();

    let target = $(this).attr("href");

    if (!target) {
      target = $(this).data("target");
    }

    $(this).closest(".modal").modal("hide");

    if (target && $(target).length) {
      setTimeout(() => {
        $(target).modal("show");
      }, 300);
    }
  });

  $(".js-survey-form").on("submit", onSurveySubmit);
});

function enableSurveySubmit() {
  const $form = $(".js-survey-form");
  const $btn = $(".js-survey-submit");

  const answered = $form.serializeArray().length;
  const questionCount = $form.find(".md-form-info__group").length;

  console.log("answered", {
    answered,
    questionCount,
  });

  if (answered == questionCount) {
    $btn.removeClass("is-disabled");
  } else {
    $btn.addClass("is-disabled");
  }
}

async function onSurveySubmit(e) {
  e.preventDefault();

  const data = $(this)
    .serializeArray()
    .reduce((carry, item) => {
      carry.push(item.value);

      return carry;
    }, []);

  const surveyResult = await submitSurvey(data);

  $(".js-survey-result").empty().append(`

<div>

<div class="modal-card"><img src="${surveyResult.image}" alt=""></div>

<div class="modal-subtitle">${surveyResult.title}</div>

<div class="modal-desc">${surveyResult.description}</div>

<div class="modal-button-group"><button class="button js_pm2_p_window"
data-messages="${surveyResult.message}">Xem chi tiết</button></div>

</div>

`);

  sendMessage("survey_finish");
  showModal(".md-survey-result");
}

function hideModal() {
  const $modal = $(".modal.show");

  if ($modal.length) {
    $modal.modal("hide");
  }
}

function showModal(modalSelector, cb) {
  hideModal();

  const $modal = $(modalSelector);

  if ($modal.length) {
    clearTimeout(modalTimeout);

    modalTimeout = setTimeout(() => {
      if (cb && typeof cb === "function") cb();

      $modal.modal("show");
    }, 300);
  }
}

function timeFormat(time, type = 1) {
  let seconds = Math.floor(time % 60);

  let minutes = Math.floor((time / 60) % 60);

  if (type === 1) {
    seconds = ("0" + seconds).slice(-2);

    return minutes + ":" + seconds;
  }

  if (type === 2) {
    minutes = minutes ? minutes + " phút" : "";

    seconds = seconds ? seconds + " giây" : "";

    return [minutes, seconds].filter((time) => time).join(" ");
  }

  return "";
}

// file input
$(function () {
  const $el = $(".js-file-upload");
  const $list = $el.find(".file-input__list");
  const $counter = $el.find(".file-input__counter");
  const input = $el.find(".js-file-input").get(0);

  $(input).on("change", renderFileList);

  $el.on("click", ".file-input__remove", function (e) {
    e.preventDefault();
    e.stopPropagation();

    const index = $(this).data("index");

    if (index === undefined) return false;

    const dt = new DataTransfer();
    const { files } = input;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (index !== i) dt.items.add(file);
    }

    input.files = dt.files;

    renderFileList();
  });

  function renderFileList() {
    $list.empty();

    const { files } = input;

    if (files.length) {
      $el.addClass("has-file");
    } else {
      $el.removeClass("has-file");
    }

    if (files.length > 0 && files.length < 11) {
      $(".js-upload-file-alert").removeClass("d-none");
    } else {
      $(".js-upload-file-alert").addClass("d-none");
    }

    $counter.text(`Đã tải lên ${files.length}/11`);

    Array.from(files).forEach((file, index) => {
      $list.append(`
<div class="file-input__item">
  <div class="file-input__small-icon">
    <i class="fal fa-image"></i>
  </div>
  <div class="file-input__name">${file.name}</div>
  <span class="file-input__remove ms-auto" data-index="${index}">
    <i class="fal fa-times"></i>
  </span>
</div>
      `);
    });
  }
});

function getCookie(key) {
  const cookieObj = {};

  document.cookie.split(";").forEach((str) => {
    const [key, value] = str.trim().split("=");
    cookieObj[key] = value;
  });

  return cookieObj[key] && unescape(cookieObj[key]);
}

function setCookie(key, value, days = 30) {
  let expires = "";
  let domain = "";

  if (days !== undefined) {
    days = Number(days) || 0;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }

  if (window.cookieDomainName && typeof window.cookieDomainName === "string") {
    domain = "; domain=" + escape(window.cookieDomainName);
  }

  document.cookie =
    key + "=" + escape(value || "") + expires + domain + "; path=/";
}
