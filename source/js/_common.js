$(function() {
  const $videoBody = $('.videos__body');
  const $frame = $('.videos__frame');
  const $videoList = $('.videos__list');

  $videoBody.on('click', '.n-video', function() {
    const $video = $(this);

    if ($video.hasClass('active')) return;

    $videoBody.find('.n-video.active').removeClass('active');
    $video.addClass('active');

    const videoId = $video.data('video-id');

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

    let idList = $(this).data('list') || '';

    idList = idList.split(',');

    if (idList.length < 1) return false;

    $frame.attr('src', `https://www.youtube.com/embed/${idList[0]}`);
    console.log(idList);
    $videoList.empty();

    idList.slice(1).forEach(videoId => {
      $videoList.append(`
<div class="videos__item">
  <div class="n-video ratio ratio-16x9" data-video-id="${videoId}"><img class="n-video__img" src="https://img.youtube.com/vi/${videoId}/sddefault.jpg" alt="">
      <div class="n-video__overlay"></div>
    </div>
</div>`);
    });
  });
});
