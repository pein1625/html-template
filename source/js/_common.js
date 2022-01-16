// countdown timer
// .js-countdown(data-countdown="2021-1-24T12:45:04")
$(function () {
  $(".js-countdown").each(function () {
    let countdown = $(this).data("countdown");

    if (!countdown) return;

    let endTime = parseDate(countdown);
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
    //   let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
      let hours = Math.floor((duration / (1000 * 60 * 60)));
      let days = Math.floor(duration / (1000 * 60 * 60 * 24));
      let ampm = hours >= 12 ? "pm" : "am";

      // hours = hours * 12;

      seconds = ("0" + seconds).slice(-2);
      minutes = ("0" + minutes).slice(-2);
      hours = hours >= 10 ? hours : ("0" + hours).slice(-2);

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

  function parseDate(s) {
    var dateTime = s.split("T");
    var dateBits = dateTime[0].split("-");
    var timeBits = dateTime[1].split(":");
    return new Date(
      dateBits[0],
      parseInt(dateBits[1]) - 1,
      dateBits[2],
      timeBits[0],
      timeBits[1],
      timeBits[2]
    ).valueOf();
  }

  function getCountDownTemplate(timer = {}) {
    return `
  <span>
    <span>${timer.hours}</span>:<span>${timer.minutes}</span>:<span>${timer.seconds}</span>
  </span>
      `;
  }
});
