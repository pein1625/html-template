// card game
const CARD_GAME = {};

$(function () {
  $(".js-card-game-finish").on("click", function () {
    GAME_CONTROL.showResult();
  });
});

function cardGameLoading() {
  window.location.href = '/game/find-card';
}
// end card game
