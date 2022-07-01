$(function() {
  const $videoBody = $('.videos__body');
  const $frame = $('.videos__frame');
  const $videoList = $('.videos__list');
  const $videoTitle = $('.js-video-title');

  $videoBody.on('click', '.n-video', function() {
    const $video = $(this);

    if ($video.hasClass('active')) return;

    $videoBody.find('.n-video.active').removeClass('active');
    $video.addClass('active');

    const videoId = $video.data('video-id');
    const videoTitle = $video.attr('title');

    $videoTitle.html(videoTitle);
    $frame.attr('src', `https://www.youtube.com/embed/${videoId}?autoplay=1`);
  });

  $('.videos__btn').on('click', function(e) {
    if ($(this).hasClass('active')) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    $('.videos__btn.active').removeClass('active');
    $(this).addClass('active');

    let videoList = $(this).data('list') || '';

    videoList = typeof videoList === 'string' ? JSON.parse(videoList) : videoList;

    if (!Array.isArray(videoList) || videoList.length < 1) return false;

    $frame.attr('src', `https://www.youtube.com/embed/${videoList[0].id}`);

    $videoTitle.html(videoList[0].title);

    $videoList.empty();

    videoList.slice(1).forEach(item => {
      $videoList.append(`
<div class="videos__item">
  <div class="n-video ratio ratio-16x9" data-video-id="${item.id}" title="${item.title}"><img class="n-video__img" src="https://img.youtube.com/vi/${item.id}/sddefault.jpg" alt="">
      <div class="n-video__overlay"></div>
    </div>
</div>`);
    });
  });
});

$(function() {
  const ipnElement = document.querySelector('.js-copy-text-input')
  const btnElement = document.querySelector('.js-copy-text')

  if (!btnElement) return false;

  btnElement.addEventListener('click', function() {
    btnElement.innerText = 'Đã sao chép!' // step 3
    ipnElement.select()              // step 4
    document.execCommand('copy')     // step 5
  })
});

$(function() {
  $('.tab-btn').on('click', function(e) {
    e.preventDefault();
    const $el = $(this);

    if ($el.hasClass('active')) return false;
    var url = $el.attr('href');
    $el.siblings('.active').removeClass('active');
    $el.addClass('active');

    $el.closest('.layout').find('.layout__iframe').attr('src', url);
  });
});

$(function() {
  $('.intro__content-close').on('click', function() {
    $('.intro__content').addClass('is-close');
  });
});
