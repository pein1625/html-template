
// const eyeBalls = document.querySelectorAll('.eyeball');
// const pageContent = document.querySelector('.page__content');

// pageContent.addEventListener('mousemove', eyeBallMove);
// pageContent.addEventListener('mouseleave', eyeBallCentering)

// function eyeBallMove() {
//   eyeBalls.forEach(function(eyeBall) {
//     let iris = eyeBall.querySelector('.iris');
//     let x = (eyeBall.getBoundingClientRect().left) + (eyeBall.clientWidth / 2);
//     let y = (eyeBall.getBoundingClientRect().top) + (eyeBall.clientHeight / 2);
//     let radian = Math.atan2(event.pageX - x, event.pageY - y);
//     let rotation = (radian * (180 / Math.PI) * -1) + 270;
//     eyeBall.style.transform = "rotate(" + rotation + "deg)";
//     iris.style.transform = "translate(-30%, 0) rotateY(20deg) rotateZ(" + (-rotation) + "deg)";
//   });
// }

// function eyeBallCentering() {
//     eyeBalls.forEach(function(eyeBall) {
//       let iris = eyeBall.querySelector('.iris');
//       eyeBall.style.transform = "rotate(0deg)";
//       iris.style.transform = "translate(0, 0) rotateY(0deg) rotateZ(0deg)";
//     });
// }

// Home page
$(function() {
  if (!document.querySelector('#head')) return;
  const container = document.querySelector('.page__content');
  const head = document.querySelector('.head');
  const mouth = document.querySelector('.mouth');
  const nose = document.querySelector('.nose');
  const eyes = document.querySelectorAll('.eye');
  const eyeBrows = document.querySelectorAll('.eyebrow');

  container.addEventListener('mousemove', function(e) {
    let xAxis = (window.innerWidth / 2 - e.pageX) / 10;
    let yAxis = (window.innerHeight / 2 - e.pageY) / 10;
    head.style.transform = `rotateX(${yAxis}deg) rotateY(${xAxis}deg)`;
  });

  container.addEventListener('mouseenter', function() {
    head.style.transition = 'none';
    eyes.forEach(function(eye) {
      eye.style.transition = 'none';
      eye.style.transform = `translateX(-50%) translateZ(15px)`;
    });
    eyeBrows.forEach(function(eyeBrow) {
      eyeBrow.style.transition = 'none';
      eyeBrow.style.transform = `translateX(-50%) translateZ(15px)`;
    });
    mouth.style.transition = 'none';
    mouth.style.transform = 'translateX(-50%) translateZ(15px)';
    nose.style.transition = 'none';
    nose.style.transform = 'translateX(-50%) translateZ(15px)';
  });

  container.addEventListener('mouseleave', function() {
    head.style.transition = 'all 0.5s';
    head.style.transform = 'rotateX(0deg) rotateY(0deg)';
    eyes.forEach(function(eye) {
      eye.style.transition = 'all 0.5s';
      eye.style.transform = `translateX(-50%) translateZ(0px)`;
    });
    eyeBrows.forEach(function(eyeBrow) {
      eyeBrow.style.transition = 'all 0.5s';
      eyeBrow.style.transform = `translateX(-50%) translateZ(0px)`;
    });
    mouth.style.transition = 'all 0.5s';
    mouth.style.transform = 'translateX(-50%) translateZ(0px)';
    nose.style.transition = 'all 0.5s';
    nose.style.transform = 'translateX(-50%) translateZ(0px)';
  });
});

// Character page
$(function() {
  if ($("#picker").length < 1) return;

  const $gradientCheck = $('.js-gradient-check');
  const $gradientTab = $('.js-gradient-tab');

  var colorPicker = new iro.ColorPicker('#picker');
  var colorPicker2 = new iro.ColorPicker('#picker2');

  colorPicker.on('color:change', function(color) {
    updateColor();
  });

  colorPicker2.on('color:change', function(color) {
    updateColor();
  });

  $gradientCheck.on('change', function() {
    $gradientTab.toggle();
  });

  function updateColor() {
    const sectionId = $('.js-section-input:checked').val();
    const $section = $(sectionId);
    const $stop = $section.find('stop');

    $stop.attr('stop-color', colorPicker.color.hexString);

    if ($gradientCheck.prop('checked')) {
      $stop.eq(1).attr('stop-color', colorPicker2.color.hexString);
    }
  }
});
