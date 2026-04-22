import GameState from "./gameState";

export default class Player {
  constructor(playerData, dieValue, isMyTurn) {
    this.gameState = new GameState(playerData, dieValue, isMyTurn);
  }

  updateGameState(gameState, dieValue, isMyTurn) {
    this.gameState.updateGameState(gameState, dieValue, isMyTurn);
  }
}
