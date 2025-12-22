$(function() {
    $elements = $('.js-select2');

    if (!$elements.length) return;

    $elements.each(function() {
        const data = {};
        const $el = $(this);

        if ($el.data('placeholder')) {
            data.placeholder = $el.data('placeholder');
        }

        $el.select2(data);
    });
});

$(function() {
    $('.js-toggle-show-password').on('click', function() {
        const $parent = $(this).closest('.input-group');
        const $input = $parent.find('input');

        $parent.toggleClass('active');

        if ($parent.hasClass('active')) {
            $input.attr('type', 'text');
        } else {
            $input.attr('type', 'password');
        }
    })
})

$(function() {
    $('.js-datepicker').datepicker({
        format: 'dd/mm/yyyy',
    });
});

$(function() {
    const $form = $('.js-register-form');
    const $modal = $('.md-confirm');

    if (!$form.length || !$modal.length) return;

    const $previewIdFront = $('.js-preview-id-front');
    const $previewIdBack = $('.js-preview-id-back');
    const $previewBill = $('.js-preview-bill');

    const $mdPreviewIdFront = $('.js-modal-preview-id-front');
    const $mdPreviewIdBack = $('.js-modal-preview-id-back');
    const $mdPreviewBill = $('.js-modal-preview-bill');

    $('.js-open-confirm-modal').on('click', function(e) {
        e.preventDefault();

        $form.serializeArray().forEach(({ name, value }) => {
            const $field = $modal.find(`.md-confirm__field[data-name="${name}"]`);

            if (!$field.length) return;

            $field.find('strong').text(value);
        });

        $mdPreviewIdFront.empty().append($previewIdFront.children().clone());
        $mdPreviewIdBack.empty().append($previewIdBack.children().clone());
        $mdPreviewBill.empty().append($previewBill.children().clone());

        $modal.modal('show');
    });

    $('.js-modal-confirm-submit').on('click', function() {
        $form.submit();
    });
});

$(function() {
    $('.js-file-input').on('change', function (event) {
        const target = $(this).data('preview');
        const $target = $(target);

        if (!$target.length) return;

        $target.removeClass('active').find('img, iframe').remove();

        const file = event.target.files[0];

        console.log('file', file);

        if (!file) return;

        const isPdf = file.type === 'application/pdf';

        const reader = new FileReader();

        reader.onload = function(e) {
            const url = e.target.result;
            $target.addClass('active');

            if (isPdf) {
                $target.append(`
<iframe src="${url}" />
                `);
            } else {
                $target.append(`<img src="${url}" alt="" />`);
            }
        };

        reader.readAsDataURL(file);
    });

    $('.js-clear-file-input').on('click', function() {
        const target = $(this).data('target');
        const $target = $(target);

        if (!$target.length) return false;

        $target.val('').trigger('change');
    })
})

// countdown timer
// .js-countdown(data-countdown="2021-1-24 12:45:04")
$(function () {
    $(".js-countdown").each(function () {
      let countdown = $(this).data("countdown");

      if (!countdown) return;

      let endTime = new Date(countdown).getTime();
      let interval;

      const buildClock = () => {
        let thisTime = new Date().getTime();
        let duration = endTime - thisTime;

        if (duration < 0 && interval) {
          clearInterval(interval);
          return;
        }

        let seconds = Math.floor((duration / 1000) % 60);
        let minutes = Math.floor((duration / (1000 * 60)) % 60);
        let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
        let days = Math.floor(duration / (1000 * 60 * 60 * 24));
        let ampm = hours >= 12 ? "pm" : "am";

        // hours = hours * 12;

        seconds = ("0" + seconds).slice(-2);
        minutes = ("0" + minutes).slice(-2);
        hours = ("0" + hours).slice(-2);

        $(this).html(
          getCountDownTemplate({
            seconds,
            minutes,
            hours,
            days,
            ampm,
          })
        );
      };

      buildClock();

      interval = setInterval(buildClock, 1000);
    });

    function getCountDownTemplate(timer = {}) {
      return `
<div class="countdown__item">
    <span class="countdown__number">${timer.days}</span>
    <span>ngày</span>
</div>
<div class="countdown__item">
    <span class="countdown__number">${timer.hours}</span>
    <span>giờ</span>
</div>
<div class="countdown__item">
    <span class="countdown__number">${timer.minutes}</span>
    <span>phút</span>
</div>
<div class="countdown__item">
    <span class="countdown__number">${timer.seconds}</span>
    <span>giây</span>
</div>
      `;
    }
});

$(function() {
    $('.js-open-modal-gift').on('click', function() {
        $('.md-gift').modal('show');
    });
});

$(function() {
    $('.js-input-cccd').on('change', function() {
        if (this.checked) {
            showCCCDField()
        } else {
            hideCCCDField()
        }
    });

    $('.js-input-shk, .js-input-passport').on('change', function() {
        if (!this.checked) {
            showCCCDField();
        } else {
            const text = $(this).hasClass('js-input-shk') ? 'Tải sổ hộ khẩu' : 'Tải hộ chiếu';
            const shk = $(this).hasClass('js-input-shk');
            hideCCCDField(text, shk)
        }
    })
});

function showCCCDField() {
    $('.js-show-back-photo').removeClass('hide-field');
    $('.js-back-upload-btn').removeClass('d-none');
    $('.js-front-upload-btn').find('span').text('Tải mặt trước');
    $('.js-show-label').removeClass('d-none');
    $('.js-label-number').text('Số CCCD:');
    $('.js-label-place').text('Nơi cấp CCCD');
    $('.js-label-date').text('Ngày cấp CCCD');
}

function hideCCCDField(btnText, shk) {
    if (shk) {
        $('.js-show-label').addClass('d-none');
        $('.js-label-number').text('Số hộ khẩu:');
    } else {
        $('.js-show-label').removeClass('d-none');
        $('.js-label-number').text('Số hộ chiếu:');
    }

    $('.js-show-back-photo').addClass('hide-field');
    $('.js-back-upload-btn').addClass('d-none');
    $('.js-front-upload-btn').find('span').text(btnText);
    $('.js-label-place').text('Nơi cấp hộ chiếu');
    $('.js-label-date').text('Ngày cấp hộ chiếu');
}

$(function() {
    $('.box').on('click', function() {
        $(this).toggleClass('active');
    })
})

$(function() {
    const $game = $('.game');
    const url = $game.data('url');

    $('.js-giftbox').on('click', function() {
        $game.addClass('picked');
        $(this).addClass('active');

        setTimeout(function() {
            callApi(url);
        }, 2500);
    });
})

function callApi(url) {
    $.ajax({
        url: url,
        method: 'get',
        success: function(res) {
            if (res.error && res.error.message) {
                handleError(res.error.message)
                return;
            }

            const prizeType = res.message;

            if (!(['special', 'first', 'second', 'consolation'].includes(prizeType))) {
                handleError('Đã xảy ra lỗi, vui lòng thử lại sau');
                console.log('API trả về ko prize type ko đúng: ', res);
                return;
            }

            handleSuccess(res.message);
        },
        error: function(e) {
            handleError(e.message);
        },
    });
}

function handleSuccess(prizeType) {
    const $game = $('.game');

    $game.addClass('show');
    $game.addClass(prizeType)
}

function handleError(errMsg) {
    alert(errMsg);
}

$(function() {
    return null; // todo hapk remove this
    const $table = $('.js-datatable');

    if (!$table.length) return;

    const url = $table.data('url');

    const dataTable = $table.DataTable({
        ajax: {
            url: url + '?filter=this_week', // URL API trả về dữ liệu JSON
            type: 'GET',             // Phương thức yêu cầu
            dataSrc: ''              // Nguồn dữ liệu (đối với JSON Array)
        },
        columns: [
            { // Cột STT
                data: null, // Không lấy dữ liệu từ server
                title: 'STT',
                render: function (data, type, row, meta) {
                    return meta.row + 1; // Tính số thứ tự dựa trên index
                },
                orderable: false, // Không sắp xếp theo cột này
                searchable: false  // Không cho phép tìm kiếm theo cột này
            },
            { data: 'customer_name', title: 'Khách hàng' },
            { data: 'customer_phone', title: 'Số điện thoại' },
            { data: 'identifier_number', title: 'Số CCCD/CMND' },
            { data: 'created_at', title: 'Ngày đăng ký' },
            { data: 'prize_name', title: 'Giải thưởng' },
            { data: 'dealer_name', title: 'Đại lý' }
        ],
        paging: true,         // Bật/Tắt phân trang
        searching: true,      // Bật/Tắt ô tìm kiếm
        ordering: true,       // Bật/Tắt sắp xếp
        pageLength: 10,        // Số dòng mỗi trang
        lengthMenu: false,
        dom:  't<"bottom-bar"fip>',
        language: {
            lengthMenu: "Hiển thị _MENU_ dòng",
            zeroRecords: "Không tìm thấy dữ liệu",
            info: "Hiển thị từ _START_ đến _END_ của _TOTAL_ dòng",
            search: "",
            paginate: {
                first: "Đầu",
                last: "Cuối",
                next: "Tiếp",
                previous: "Trước"
            }
        }
    });

    $('.js-filter-btn').on('click', function () {
        $('.js-filter-btn').removeClass('button--secondary');
        $(this).addClass('button--secondary');

        const filter = $(this).data('filter');

        dataTable.ajax.url(url + '?filter=' + filter).load();
    });
})

$(function() {
    $('.register-form__nav-btn').on('click', function() {
        if ($(this).hasClass('active')) {
            return false;
        }

        const target = $(this).data('target');
        const $target = $(target);

        if (!$target.length) return;

        $('.register-form__nav-btn').removeClass('active');
        $(this).addClass('active');

        $('.register-form__tab').removeClass('active');
        $target.addClass('active');
    })
});

$(function() {
    $('.pf-page__nav-btn').on('click', function() {
        if ($(this).hasClass('active')) {
            return false;
        }

        const target = $(this).data('target');
        const $target = $(target);

        if (!$target.length) return;

        $('.pf-page__nav-btn').removeClass('active');
        $(this).addClass('active');

        $('.pf-page__tab').removeClass('active');
        $target.addClass('active');
    })
});

$(function() {
    const $header = $('.header');

    if (!$header.length) return;

    $(window).on('scroll', function() {
        const scrollTop = $(window).scrollTop();

        if (scrollTop > 100) {
            $header.addClass('is-fixed');
        } else {
            $header.removeClass('is-fixed');
        }
    });
});
