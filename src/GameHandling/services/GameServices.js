import { EventTypes } from "../models/eventTypes";
import Player from "../models/player";
import Opponent from "../models/opponent";

export default class GameServices {
  constructor(gameHandler) {
    this.gameHandler = gameHandler;
  }

  handleGameStarted(data) {
    if (!this.gameHandler.gameStarted) {
      this.inizializePlayers(data);
    } else {
      this.gameHandler.updateGameStates(data, EventTypes.GAME_STARTED);
    }
  }

  handleNextTurn(data) {
    this.gameHandler.updateGameStates(data, EventTypes.NEXT_TURN);
  }

  handleGameOver(data) {
    this.gameHandler.updateGameStates(data, EventTypes.GAME_OVER, true);
  }

  inizializePlayers(data) {
    const isPlayerActive =
      data.gameState.activePlayer === this.gameHandler.myMatchUserId;
    const players = this.determinePlayers(data);

    const player = new Player(
      players.user,
      data.gameState.dieRollValue,
      isPlayerActive
    );
    const opponent = new Opponent(
      players.opponent,
      data.gameState.dieRollValue,
      !isPlayerActive
    );

    this.gameHandler.setPlayer(player);
    this.gameHandler.setOpponent(opponent);

    this.gameHandler.setCurrentEvent(EventTypes.GAME_STARTED);
    this.gameHandler.gameStarted = true;
  }

  determinePlayers(data) {
    const players = data.gameState.players;
    const playerIndices = this.findPlayerIndices(players);
    return {
      user: players[playerIndices.playerIndex],
      opponent: players[playerIndices.opponentIndex],
    };
  }

  findPlayerIndices(players) {
    const playerIndex = players.findIndex(
      (player) => player.playerId === this.gameHandler.myMatchUserId
    );
    return {
      playerIndex: playerIndex,
      opponentIndex: Math.abs(playerIndex - 1),
    };
  }

  determineGameWinner(data) {
    const players = data.gameState.players;

    const gameWinner = players.reduce((highest, player) =>
      player.totalScore > (highest?.totalScore || 0) ? player : highest
    ).playerId;

    return gameWinner;
  }
}

