$(function () {
  $dealine = $("#js-deadline");

  $(".js-deadline").each(function () {
    var deadline = $(this).data("deadline");

    initialClock(this, deadline);
  });
});

function initialClock(el, endtime) {
  var clock = el;
  if (!clock) {
    return;
  }
  var timeinterval = setInterval(function () {
    var t = getTimeRemaining(endtime);
    clock.innerHTML = `
<span>${t.hours}</span>
<span>${t.minutes}</span>
<span>${t.seconds}</span>
    `;
    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }, 1000);
}

function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  if (t < 0)
    return {
      total: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  if (days > 99) {
    days = 99;
  }

  seconds = seconds < 10 ? "0" + seconds : seconds;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  hours = hours < 10 ? "0" + hours : hours;
  days = days < 10 ? "0" + days : days;

  return {
    total: t,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
}
