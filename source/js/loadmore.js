// Load more content

$(function () {
  const $window = $(window);
  const $loadMore = $(".loadmore");
  let isLoading = false;

  if (!$loadMore.length) return;

  $('.js-load-more-order').on('click', function(e) {
    e.preventDefault();
    loadMoreContent();
  });

  $window.on("scroll", function () {
    const viewHeight = $window.height();
    const scrollTop = $window.scrollTop();
    const offsetTop = $loadMore.offset().top;

    if (scrollTop + viewHeight > offsetTop) {
      loadMoreContent();
    }
  });

  function loadMoreContent() {
    if (isLoading) return;

    isLoading = true;
    updateLoadingStatus(isLoading);

    const lastOrderId = $(".od-section").last().data("id"); // Lấy Order ID cuối cùng để chỉ loading những ID cũ hơn nó

    $.ajax({
      url: "https://hub.dummyapis.com/delay?seconds=1", // Thay API load more orders
      method: "get",
      contentType: "",
      data: {
        lastOrderId,
      },
      success: (res) => {
        // Xử lý loading thành công
        isLoading = false;
        updateLoadingStatus(isLoading);

        // Giả sử api trả về data HTML như sau: (res)
        const data = `
  <section class="od-section mt-4" data-id="10">
  <div class="od-section__header">
    <div class="od-section__icon">
      <i class="fal fa-fw fal-lg fa-store"></i>
    </div>
    <div class="od-section__title-wrap">
      <h2 class="od-section__title">
        <a class="od-section__title-link" href="./order-detail.html"
          >Cơ sở sản xuất miến dong Chiến Thọ</a
          ><a class="badge text-secondary border-secondary" href="#!"
          >Sàn Long An</a
          >
      </h2>
    </div>
    <div class="od-section__badge">
      <span class="badge ms-auto text-primary bg-primary-light">Đã huỷ</span>
    </div>
  </div>
  <div class="od-section__body">
    <div class="od-item">
      <a class="od-item__frame" href="#!"
        ><img src="./images/order-item-img.jpg" alt=""
        /></a>
      <div class="od-item__info">
        <div>
          <a href="#!"><strong>Chao môn ngon Hưng Phát size nhỏ 200g</strong></a
            >
        </div>
        <div>x2</div>
      </div>
      <div class="od-item__price">70.000 ₫</div>
    </div>
    <div class="od-item">
      <a class="od-item__frame" href="#!"
        ><img src="./images/order-item-img.jpg" alt=""
        /></a>
      <div class="od-item__info">
        <div>
          <a href="#!"
            ><strong>Chao môn ngon Hưng Phát size nhỏ 200g</strong></a
            >
        </div>
        <div>x2</div>
      </div>
      <div class="od-item__price">70.000 ₫</div>
    </div>
  </div>
  <div class="od-section__footer">
    <div class="od-section__btns">
      <a class="btn px-30 btn-outline" href="#!">Chi tiết hủy</a>
    </div>
    <div class="text-sm-end">
      <span class="me-3">Tổng số tiền (2 sản phẩm):</span
        ><strong>140.000 ₫</strong>
      <div class="od-section__note">
        <i class="fal fa-fw fa-clipboard-list me-2 text-primary"></i
          ><i>Ghi chú: Đổi ý không mua nữa</i>
      </div>
    </div>
  </div>
  </section>
        `;

        renderHTML(data);
      },
      error: (res) => {
        // Xử lý lỗi ko load được
        isLoading = false;
        updateLoadingStatus(isLoading);
        console.log('Loading error', res);
      }
    })
  }

  function updateLoadingStatus(isLoading = true) {
    const $loadMore = $('.loadmore');

    if (isLoading) {
      $loadMore.show();
    } else {
      $loadMore.hide();
    }
  }

  function renderHTML(htmlData) {
    $(".od-section").last().after(htmlData);
  }
});
