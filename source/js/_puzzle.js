const PUZZLE = {
  arr: [0,1,2,3,4,5,6,7,8,9,10,11],
  playing: false,
  time: 0,
  timeLimit: 60,
  point: 10,
  interval: null,
  isCompleted: false,
  images: [],
  result: '',
  el: null,
  timeEl: null,
}

const classesToRemove = PUZZLE.arr.reduce((carry, item, index) => {
  return carry + ' ' + 'cell--' + index;
}, '');

$(function() {
  gameLoading();
});

async function gameLoading() {
  const data = await getPuzzleData();

  PUZZLE.images = data.piece_jigsaw;
  PUZZLE.result = data.result;

  PUZZLE.el = $('.js-puzzle');

  PUZZLE.timeEl = PUZZLE.el.find('.puzzle__remaining');

  PUZZLE.el.on('click', '.js-puzzle-start', puzzleStart);

  PUZZLE.el.on('click', '.cell', puzzleMove);

  puzzleReset();

  $('.js-puzzle-result, .js-puzzle-guide').on('click', '.js-puzzle-continue', puzzleContinue);
}

function puzzleReset() {
  PUZZLE.arr = [0,1,2,3,4,5,6,7,8,9,10,11];
  PUZZLE.time = 0;
  PUZZLE.interval = null;
  PUZZLE.isCompleted = false;

  const cellImages = [,,,...PUZZLE.images];

  PUZZLE.el.find('.cell').each(function(index, el) {
    if (!cellImages[index]) return;

    $(el).empty().append(`<img class="cell-img" src="${cellImages[index]}" alt="">`);
  });

  PUZZLE.timeEl.text(`${PUZZLE.timeLimit - PUZZLE.time}s`);

  reIndexing();
}

function puzzleStart() {
  PUZZLE.playing = true;

  shuffle();

  clearInterval(PUZZLE.interval);

  PUZZLE.interval = setInterval(() => {
    PUZZLE.time++;

    let remainingTime = PUZZLE.timeLimit - PUZZLE.time;

    PUZZLE.timeEl.text(remainingTime + 's');

    if (!remainingTime) puzzleFinish();
  }, 1000);

  PUZZLE.el.addClass('unlock');
}

function puzzleContinue() {
  console.log('puzzleContinue');

  if (PUZZLE.isCompleted) {
    return false;
  }

  PUZZLE.el.removeClass('unlock');

  puzzleReset();

  showModal('.md-puzzle');
}

function puzzleFinish() {
  PUZZLE.playing = false;

  clearInterval(PUZZLE.interval);

  if (PUZZLE.isCompleted) {
    $('.js-puzzle-result').empty().append(`
      <div class="game-result">
        <div class="modal-card"><img src="${PUZZLE.result}" alt=""></div>
        <div class="modal-title">Xin chúc mừng!</div>
        <div class="modal-subtitle">Chúc mừng bạn đã mở khóa Minigame 2 & 3.<br/>Tham gia ngay để trúng giải thưởng!</div>
        <div class="modal-button-group">
            <button class="button js-puzzle-continue" type="button">Tiếp tục</button>
        </div>
      </div>
    `);
  } else {
    $('.js-puzzle-result').empty().append(`
      <div class="game-result">
        <div class="modal-card"><img src="${PUZZLE.result}" alt=""></div>
        <div class="modal-title">Opps,</div>
        <div class="modal-subtitle">Thử lại để nhận cơ hội tiếp tục tham gia Minigame 2 & 3 để trúng giải thưởng từ BIDV</div>
        <div class="modal-button-group">
            <button class="button js-puzzle-continue" type="button">Chơi lại</button>
        </div>
      </div>
    `);
  }

  showModal('.md-puzzle-result');
}

function puzzleMove(e) {
  e.preventDefault();

  const index = Number($(this).data('index'));
  const value = PUZZLE.arr[index];

  if (value === 0 || value === 1 || value === 2) return false;

  if (isSlideAble(index)) {
    const zeroIndex = getZeroIndex();

    PUZZLE.arr[zeroIndex] = value;
    PUZZLE.arr[index] = 0;

    reIndexing();

    if (checkResult()) {
      PUZZLE.isCompleted = true;
      puzzleFinish();
    }
  }
}

function reIndexing() {
  const $cell = $('.cell');

  $cell.removeClass(classesToRemove);

  PUZZLE.arr.forEach((value, index) => {
    $cell.eq(value).addClass('cell--' + index).data('index', index);
  });
}

function isSlideAble(index) {
  const sideBySide = getSideBySide(index);
  const zeroIndex = getZeroIndex();

  return sideBySide.includes(zeroIndex);
}

function getZeroIndex() {
  for (let i = 0; i < PUZZLE.arr.length; i++) {
    if (PUZZLE.arr[i] === 0) return i;
  }

  return 0;
}

function getSideBySide(index) {
  const items = [];

  if (index - 3 >= 0) items.push(index - 3);
  if (index % 3 > 0) items.push(index - 1);
  if (index % 3 < 2) items.push(index + 1);
  if (index + 3 < 12) items.push(index + 3);

  return items.filter(index => index !== 1 && index !== 2);
}

function checkResult() {
  let maxValue = 0;
  let errorIndex = PUZZLE.arr.findIndex((item) => {
    if (item < maxValue) return true;

    maxValue = item;
    return false;
  });

  return errorIndex < 0;
}

function shuffle() {
  for (let i = 0; i < 1000; i++) {
    randomMove();
  }

  reIndexing();
}

function randomMove() {
  const zeroIndex = getZeroIndex();
  const sideBySide = getSideBySide(zeroIndex);

  const randomIndex = sideBySide[Math.floor(Math.random() * sideBySide.length)];

  PUZZLE.arr[zeroIndex] = PUZZLE.arr[randomIndex];
  PUZZLE.arr[randomIndex] = 0;
}
