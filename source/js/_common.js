
const eyeBalls = document.querySelectorAll('.eyeball');
const pageContent = document.querySelector('.page__content');

pageContent.addEventListener('mousemove', eyeBallMove);
pageContent.addEventListener('mouseleave', eyeBallCentering)

function eyeBallMove() {
  eyeBalls.forEach(function(eyeBall) {
    let iris = eyeBall.querySelector('.iris');
    let x = (eyeBall.getBoundingClientRect().left) + (eyeBall.clientWidth / 2);
    let y = (eyeBall.getBoundingClientRect().top) + (eyeBall.clientHeight / 2);
    let radian = Math.atan2(event.pageX - x, event.pageY - y);
    let rotation = (radian * (180 / Math.PI) * -1) + 270;
    eyeBall.style.transform = "rotate(" + rotation + "deg)";
    iris.style.transform = "translate(-30%, 0) rotateY(20deg) rotateZ(" + (-rotation) + "deg)";
  });
}

function eyeBallCentering() {
    eyeBalls.forEach(function(eyeBall) {
      let iris = eyeBall.querySelector('.iris');
      eyeBall.style.transform = "rotate(0deg)";
      iris.style.transform = "translate(0, 0) rotateY(0deg) rotateZ(0deg)";
    });
}