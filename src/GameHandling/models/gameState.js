import Board from "../models/board";
export default class GameState {
  constructor(gameState, dieValue, isMyTurn) {
    this.createGameState(gameState, dieValue, isMyTurn);
  }

  updateGameState(gameState, dieValue, isMyTurn) {
    this.createGameState(gameState, dieValue, isMyTurn);
  }

  createGameState(gameState, dieValue, isMyTurn) {
    this.isMyTurn = isMyTurn;
    this.dieValue = isMyTurn ? dieValue : null;
    this.totalScore = gameState.totalScore;
    this.remainingDice = gameState.remainingDice;
    this.gamesWon = gameState.gamesWon;
    this.board = new Board(gameState.board);
  }
}
