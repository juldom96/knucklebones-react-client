import GameConnectionApi from "../../Network/Api/GameConnectionApi";
import { EventTypes } from "../models/eventTypes";

export default class MatchServices {
  constructor(gameHandler) {
    this.gameHandler = gameHandler;
  }

  handleMatchOver(data) {
    this.gameHandler.updateGameStates(data, EventTypes.MATCH_OVER, true);
    const matchWinner = this.findMatchWinner(data);
    this.gameHandler.setMatchWinner(matchWinner);
    this.gameHandler.gameStarted = false;
    GameConnectionApi.close("The match is over.");
  }

  handleMatchAborted(data, opponent) {
    const quitter =
      data.won === this.gameHandler.myMatchUserId
        ? opponent
        : this.gameHandler.myMatchUserId;

    this.gameHandler.setMatchWinner(data.won);
    this.gameHandler.setCurrentEvent(EventTypes.MATCH_ABORTED);

    GameConnectionApi.close(`${quitter} has aborted the match.`);
  }

  findMatchWinner(data) {
    const players = data.gameState.players;

    const matchWinner = players.reduce((highest, player) =>
      player.gamesWon > (highest?.gamesWon || 0) ? player : highest
    ).playerId;

    return matchWinner;
  }
}