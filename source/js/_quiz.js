// QUIZ

const QUIZ = {
  questions: [],
  current: 0,
  correct: 0,
  time: 0, // Tính bằng giây
  timeLimit: 0, // Tính bằng giây
  timeInterval: null,
  el: null,
  restTime: 3, // Tính bằng giây
  restInterval: null,
};

$(function() {
  QUIZ.el = $('.js-quiz');

  if (!QUIZ.el.length) return false;

  QUIZ.timeLimit = Number(QUIZ.el.data('time-limit')) || 0;

  $('.js-quiz-start').on('click', quizStart);

  $('.js-quiz').on('change', '.js-quiz-option', onSelectQuizOption);
});

async function quizStart() {
  QUIZ.current = 0;
  QUIZ.correct = 0;
  QUIZ.time = 0;
  QUIZ.questions = await getQuizQuestions();

  renderQuizQuestion();

  showModal('.md-quiz-question');
}

function renderQuizQuestion() {
  const question = QUIZ.questions[QUIZ.current];

  if (!question) return false;

  QUIZ.el.empty().append(`
<div class="quiz">
  <div class="quiz__title modal-title">Câu hỏi số ${QUIZ.current + 1}</div>
  <div class="quiz__question">${question.question}</div>
  ${renderQuizAnswers(question.options)}
  <div class="quiz__info">
      <div>Câu hỏi đã trả lời:&nbsp;<span class="text-warning">${QUIZ.current}/${QUIZ.questions.length}</span></div>
      <div>Thời gian:&nbsp;<span class="text-warning"><span class="quiz__time">${timeFormat(QUIZ.time)}</span> /${timeFormat(QUIZ.timeLimit, 2)}</span></div>
      <div class="quiz__rest-time" style="display: none">Câu hỏi tiếp theo sẽ xuất hiện sau: s</div>
  </div>
</div>`);

  clearInterval(QUIZ.timeInterval);

  QUIZ.timeInterval = setInterval(() => {
    QUIZ.time++;

    QUIZ.el.find('.quiz__time').text(timeFormat(QUIZ.time));

    if (QUIZ.time >= QUIZ.timeLimit) {
      clearInterval(QUIZ.timeInterval);
      showQuizResult();
    }
  }, 1000);
}

function renderQuizAnswers(options) {
  let answerHTML = '';

  for (const [key, answer] of Object.entries(options)) {
    answerHTML += `
<label class="quiz__answer" data-key="${key}">
    <input class="js-quiz-option" type="radio" name="quiz"><span>${key}. ${answer}</span>
</label>
    `;
  }

  return `<div class="quiz__answers">${answerHTML}</div>`;
}

function onSelectQuizOption(e) {
  clearInterval(QUIZ.timeInterval);

  const question = QUIZ.questions[QUIZ.current];

  const $answer = $(this).closest('.quiz__answer');

  const answerKey = $answer.data('key');

  QUIZ.el.find('.js-quiz-option').prop('disabled', true);
  QUIZ.el.find(`.quiz__answer[data-key="${question.answer}"]`).addClass('is-correct');

  if (answerKey !== question.answer) {
    QUIZ.el.find(`.quiz__answer[data-key="${answerKey}"]`).addClass('is-incorrect');
  } else {
    QUIZ.correct++;
  }

  showNextQuizQuestion();
}

function showNextQuizQuestion() {
  QUIZ.current++;

  if (QUIZ.current >= QUIZ.questions.length) {
    showQuizResult();
    return true;
  }

  clearInterval(QUIZ.restInterval);

  let rest = 0;

  QUIZ.restInterval = setInterval(() => {
    QUIZ.el.find('.quiz__rest-time').show().text(`Câu hỏi tiếp theo sẽ xuất hiện sau: ${QUIZ.restTime - rest}s`);

    rest += 1;

    if (rest > QUIZ.restTime) {
      clearInterval(QUIZ.restInterval);
      renderQuizQuestion();
    }
  }, 1000);
}

function showQuizResult() {
  hideModal();

  showModal('.md-quiz-question', function() {
    QUIZ.el.empty().append(`
<div class="quiz-result">
  <div class="modal-title">Xin chúc mừng!<br>Bạn đã trả lời đúng <span class="text-warning">${QUIZ.correct}/${QUIZ.questions.length}</span> câu hỏi</div>
  <div class="quiz-result__score">+${QUIZ.correct * 10} điểm</div>
  <div class="modal-button-group">
      <button class="button" type="button">Tiếp tục</button>
  </div>
</div>
      `);
  });
}
