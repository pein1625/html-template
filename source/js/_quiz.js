// quiz game
const QUIZ = {
  questions: [],
  current: 0,
  answered: 0, // count
  correct: 0,
  maxPoint: 40,
  time: 0, // giây
  startTime: 0,
  timeLimit: 5 * 60, // giây
  timeInterval: null,
  restTime: 3, // giây
  restInterval: null,
  el: null,
};

$(function () {
  QUIZ.el = $(".js-quiz");

  if (!QUIZ.el.length) return false;

  QUIZ.timeLimit = 5 * 60;
  QUIZ.current = 0;
  QUIZ.correct = 0;
  QUIZ.time = startTimestamp
    ? Math.round((new Date().getTime() - startTimestamp * 1000) / 1000)
    : 0;

  if (QUIZ.time >= QUIZ.timeLimit) QUIZ.time = QUIZ.timeLimit;

  const quizData = getQuizData();
  let count = 0;

  const step = Number(window.location.pathname.replace(/\/quiz\/?/, "")) || 0;

  QUIZ.current = step ? step - 1 : 0;

  for (const [, question] of Object.entries(quizData)) {
    count++;

    QUIZ.questions.push(question);

    if (question.answered) {
      QUIZ.answered++;

      if (question.answered === question.true_option) {
        QUIZ.correct++;
      }
    }
  }

  QUIZ.time = Math.floor(QUIZ.time);

  setCookie("quiz_start_timestamp", startTimestamp);

  if (QUIZ.answered >= QUIZ.questions.length) {
    quizShowResult();
  } else if (step) {
    quizStart();
  } else if (!step) {
    showModal(".md-quiz-begin");
  }

  $(".js-quiz-start").on("click", async () => {
    if (window.sendMessage && typeof window.sendMessage === "function") {
      window.sendMessage("game_quiz_start");
    }
    // quizStart();
  });

  QUIZ.el
    .on("change", ".js-quiz-option", quizSelectOption)
    .on("click", ".js-quiz-continue", async function () {
      if (
        window.cardGameLoading &&
        typeof window.cardGameLoading === "function"
      ) {
        window.cardGameLoading();
      }
    });
});

async function quizStart() {
  renderQuizQuestion();

  showModal(".md-quiz-question");
}

function renderQuizQuestion() {
  const question = QUIZ.questions[QUIZ.current];

  if (!question) return false;

  QUIZ.startTime = new Date().getTime();

  const answeredCount = QUIZ.questions.reduce((total, question) => {
    if (question.answered) return total + 1;
    return total;
  }, 0);

  QUIZ.el.empty().append(`
<div class="quiz">
<div class="quiz__title modal-title">Câu hỏi số ${QUIZ.current + 1}</div>
<div class="quiz__question">${question.question}</div>
${quizRenderAnswer(question.options)}
<div class="quiz__info">
    <div>Câu hỏi đã trả lời:&nbsp;<span class="text-warning js-quiz-answered-count">${answeredCount}/${
    QUIZ.questions.length
  }</span></div>
    <div class="quiz__rest-time" style="display: none">Câu hỏi tiếp theo sẽ xuất hiện sau: s</div>
</div>
</div>`);

  const answered = question.answered;
  const isCorrect = question.answered === question.true_option;

  if (answered || QUIZ.time >= QUIZ.timeLimit) {
    QUIZ.el.find(".js-quiz-option").prop("disabled", true);
    QUIZ.el
      .find(`.quiz__answer[data-key="${question.true_option}"]`)
      .addClass("is-correct");

    if (!isCorrect) {
      QUIZ.el
        .find(`.quiz__answer[data-key="${question.answered}"]`)
        .addClass("is-incorrect");
    }
  }

  clearInterval(QUIZ.timeInterval);

  QUIZ.timeInterval = setInterval(() => {
    if (QUIZ.time >= QUIZ.timeLimit) {
      gameLog("quiz", "end");
      setCookie("quiz_time", QUIZ.time);
      quizEnd();
      return;
    }

    QUIZ.time++;

    QUIZ.el.find(".quiz__time").text(timeFormat(QUIZ.time));
  }, 1000);
}

function quizRenderAnswer(options) {
  let answerHTML = "";

  for (const [key, answer] of Object.entries(options)) {
    answerHTML += `
<label class="quiz__answer" data-key="${key}">
  <input class="js-quiz-option" type="radio" name="quiz"><span>${key}. ${answer}</span>
</label>
  `;
  }

  return `<div class="quiz__answers">${answerHTML}</div>`;
}

async function quizSelectOption(e) {
  QUIZ.answered++;

  const question = QUIZ.questions[QUIZ.current];

  const $answer = $(this).closest(".quiz__answer");

  const answerKey = $answer.data("key");

  QUIZ.el.find(".js-quiz-option").prop("disabled", true);
  QUIZ.el
    .find(`.quiz__answer[data-key="${question.true_option}"]`)
    .addClass("is-correct");

  const isCorrect = answerKey === question.true_option;

  if (isCorrect) {
    QUIZ.correct++;
  } else {
    QUIZ.el
      .find(`.quiz__answer[data-key="${answerKey}"]`)
      .addClass("is-incorrect");
  }

  const answeredCount = QUIZ.questions.reduce((total, question) => {
    if (question.answered) return total + 1;
    return total;
  }, 0);

  QUIZ.el
    .find(".js-quiz-answered-count")
    .text(`${answeredCount + 1}/${QUIZ.questions.length}`);

  await gameLog("quiz", "process", {
    quiz_id: question.id,
    answer: answerKey,
    correct: isCorrect ? 1 : 0,
  });

  let quizScore = QUIZ.correct === 5 ? QUIZ.maxPoint : QUIZ.correct;

  setCookie("quiz_score", quizScore);

  if (QUIZ.answered >= QUIZ.questions.length) {
    setCookie("quiz_time", QUIZ.time);
    quizEnd();
  } else {
    sendMessage("game_quiz_process");
  }
}

async function quizEnd() {
  clearInterval(QUIZ.timeInterval);
  clearInterval(QUIZ.restInterval);

  gameLog("quiz", "end");

  if (window.sendMessage && typeof window.sendMessage === "function") {
    sendMessage("game_quiz_finish");
  }
}

function quizShowResult() {
  clearInterval(QUIZ.timeInterval);
  hideModal();

  const point =
    QUIZ.correct && QUIZ.correct === QUIZ.questions.length
      ? QUIZ.maxPoint
      : QUIZ.correct;

  $(".js-md-quiz-question-close").data(
    "messages",
    "quiz_end_close_button_click"
  );

  showModal(".md-quiz-question", function () {
    QUIZ.el.empty().append(`
<div class="quiz-result">
<div class="modal-title">Xin chúc mừng!<br>Bạn đã trả lời đúng <span class="text-warning">${QUIZ.correct}/${QUIZ.questions.length}</span> câu hỏi</div>
<div class="quiz-result__score">+${point} điểm</div>
<div class="modal-button-group">
    <button class="button js-quiz-continue js_pm2_p_window" data-point="${point}" type="button" data-messages="result_quiz_click_continue">Tiếp tục</button>
</div>
</div>
    `);
  });
}

$(function () {
  const $summary = $(".js-quiz-summary");

  if (!$summary.length) return false;

  const quizData = getQuizData();

  const answered = quizData
    .reduce((carry, quiz, index) => {
      if (quiz.answered) {
        carry.push(index + 1);
      }

      return carry;
    }, [])
    .join(",");

  let quizScore = Number(window.quizScore) || 0;

  setCookie("quiz_score", quizScore);
  setCookie("quiz_answered", answered);
  setCookie("quiz_start_timestamp", startTimestamp);

  if (!startTimestamp) {
    setCookie("quiz_time", 0, 0);
  }

  let interval = null;

  interval = setInterval(() => {
    const now = new Date().getTime();

    const startTime = Number(getCookie("quiz_start_timestamp")) * 1000 || 0;

    const quizTime = Number(getCookie("quiz_time")) || 0;
    const quizScore = Number(getCookie("quiz_score")) || 0;

    let time = quizTime ? quizTime : Math.round((now - startTime) / 1000);

    let totalTime;

    if (!startTime) {
      totalTime = "Chưa bắt đầu";
    } else if (time >= QUIZ.timeLimit) {
      totalTime = "Hết giờ";
    } else {
      totalTime = timeFormat(time);
    }

    if (startTime && !quizTime && time >= QUIZ.timeLimit) {
      clearInterval(interval);
      setCookie("quiz_time", time);
      quizEnd();
    }

    $summary.empty().append(`
<div class="summary">
  <div class="summary__info">Tổng điểm: <span class="summary__total-point">${quizScore}</span></div>
  <div class="summary__info">Tổng thời gian: <span class="summary__total-time">${totalTime}</span></div>
</div>
      `);
  }, 1000);
});
// end quiz game
