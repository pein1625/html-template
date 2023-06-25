// card game
const CARD_GAME = {};

$(function () {
  $(".js-card-game-finish").on("click", function () {
    GAME_CONTROL.showResult();
  });
});

function cardGameLoading() {
  showModal(".md-card-game-intro");
}
// end card game
