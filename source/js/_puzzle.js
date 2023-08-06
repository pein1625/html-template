// game puzzle
const PUZZLE = {
  arr: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  playing: false,
  time: 0,
  timeLimit: 60,
  point: 10,
  interval: null,
  isCompleted: false,
  images: [],
  result: "",
  el: null,
  timeEl: null,
  lastSelected: -1,
};

const classesToRemove = PUZZLE.arr.reduce((carry, item, index) => {
  return carry + " " + "cell--" + index;
}, "");

$(function () {
  puzzleLoading();
});

async function puzzleLoading() {
  try {
    const data = await getPuzzleData();

    if (!data) throw new Error("Puzzle data not found!");

    if (data.error) {
      throw new Error(data.error.message);
    }

    PUZZLE.images = data.piece_jigsaw;
    PUZZLE.result = data.result;

    PUZZLE.el = $(".js-puzzle");

    PUZZLE.timeEl = PUZZLE.el.find(".puzzle__remaining");

    PUZZLE.el.on("click", ".js-puzzle-start", puzzleStart);

    PUZZLE.el.on("click", ".js-puzzle-reset", puzzleReset);

    PUZZLE.el.on("click", ".cell", puzzleMove);

    puzzleReset();

    $(".js-puzzle-result, .js-puzzle-guide").on(
      "click",
      ".js-puzzle-continue",
      puzzleContinue
    );
  } catch (error) {
    $(".js-puzzle-error").find(".modal-desc").text(error.message);

    showModal(".md-puzzle-error");
  }
}

function puzzleReset() {
  PUZZLE.arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  PUZZLE.time = 0;
  PUZZLE.interval = null;
  PUZZLE.isCompleted = false;

  const cellImages = [, , , ...PUZZLE.images];

  PUZZLE.el.find(".cell").each(function (index, el) {
    if (!cellImages[index]) return;

    $(el)
      .empty()
      .append(`<img class="cell-img" src="${cellImages[index]}" alt="">`);
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

    PUZZLE.timeEl.text(remainingTime + "s");

    if (!remainingTime) puzzleFinish();
  }, 1000);

  PUZZLE.el.addClass("unlock");
}

function puzzleContinue() {
  if (PUZZLE.isCompleted) {
    window.location.href = "/quiz";
    return;
  }

  PUZZLE.el.removeClass("unlock");

  puzzleReset();

  showModal(".md-puzzle");
}

function puzzleFinish() {
  PUZZLE.playing = false;

  clearInterval(PUZZLE.interval);

  if (PUZZLE.isCompleted) {
    sendMessage("game_puzzle_success");
    document.cookie = "puzzle_finished=1;path=/;domain=vrplus.com.vn";
    $(".js-puzzle-result").empty().append(`
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
    $(".js-puzzle-result").empty().append(`
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

  showModal(".md-puzzle-result");
}

function puzzleMove(e) {
  e.preventDefault();

  const index = Number($(this).data("index"));
  const value = PUZZLE.arr[index];

  if (value === 0 || value === 1 || value === 2) return false;

  if (PUZZLE.lastSelected < 0) {
    // Select
    PUZZLE.lastSelected = index;
    $(this).addClass("is-selected");
    return;
  }

  if (isSlideAble(index)) {
    // Switch
    const tmp = PUZZLE.arr[index];
    PUZZLE.arr[index] = PUZZLE.arr[PUZZLE.lastSelected];
    PUZZLE.arr[PUZZLE.lastSelected] = tmp;

    reIndexing();

    if (puzzleCheckResult()) {
      PUZZLE.isCompleted = true;
      PUZZLE.lastSelected = -1;
      $(".cell.is-selected").removeClass("is-selected");
      puzzleFinish();
    }
  }

  PUZZLE.lastSelected = -1;
  $(".cell.is-selected").removeClass("is-selected");
}

function reIndexing() {
  const $cell = $(".cell");

  $cell.removeClass(classesToRemove);

  PUZZLE.arr.forEach((value, index) => {
    $cell
      .eq(value)
      .addClass("cell--" + index)
      .data("index", index);
  });
}

function isSlideAble(index) {
  const sideBySide = getAvailableCells(PUZZLE.lastSelected);

  return PUZZLE.lastSelected >= 0 && sideBySide.includes(index);
}

function getZeroIndex() {
  for (let i = 0; i < PUZZLE.arr.length; i++) {
    if (PUZZLE.arr[i] === 0) return i;
  }

  return 0;
}

function getAvailableCells(index) {
  return [3,4,5,6,7,8,9,10,11].filter((id) => id !== 0 && id !== 1 && id !== 2 && id !== index);
}

function puzzleCheckResult() {
  let maxValue = 0;
  let errorIndex = PUZZLE.arr.findIndex((item) => {
    if (item < maxValue) return true;

    maxValue = item;
    return false;
  });

  return errorIndex < 0;
}

function shuffle() {
  // TODO edit shuffle
  for (let i = 0; i < 1000; i++) {
    randomMove();
  }
  reIndexing();
}

function randomMove() {
  const selected = Math.floor(Math.random() * 9) + 3;

  const available = getAvailableCells(selected);

  const randomSide = available[Math.floor(Math.random() * available.length)];

  const tmp = PUZZLE.arr[selected];

  PUZZLE.arr[selected] = PUZZLE.arr[randomSide];
  PUZZLE.arr[randomSide] = tmp;
}
// end puzzle
