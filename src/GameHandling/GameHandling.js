import { EventTypes } from "./models/eventTypes";
import GameWebSocketServices from "./services/GameWebSocketServices";
import HandshakeServices from "./services/HandshakeServices";
import MatchServices from "./services/MatchServices";
import GameServices from "./services/GameServices";
import { useGameState } from "./Api/useGameState";

class GameHandling {
  constructor() {
    const {
      setPlayer,
      setOpponent,
      setCurrentEvent,
      setCurrentGameWinner,
      setMatchWinner,
    } = useGameState.getState();

    this.gameStarted = false;
    this.setPlayer = setPlayer;
    this.setOpponent = setOpponent;
    this.setCurrentEvent = setCurrentEvent;
    this.setCurrentGameWinner = setCurrentGameWinner;
    this.setMatchWinner = setMatchWinner;

    this.myMatchUserId = null;
    this.roomId = null;

    this.GameWebSocketServices = new GameWebSocketServices(this);
    this.HandshakeServices = new HandshakeServices(this);
    this.MatchServices = new MatchServices(this);
    this.GameServices = new GameServices(this);
  }

  processGameMessage(message, myMatchUserId) {
    try {
      const data = JSON.parse(message);
      switch (data.type) {
        case EventTypes.HANDSHAKE:
          this.HandshakeServices.handleHandshake(data, myMatchUserId);
          break;
        case EventTypes.GAME_STARTED:
          this.GameServices.handleGameStarted(data);
          break;
        case EventTypes.NEXT_TURN:
          this.GameServices.handleNextTurn(data);
          break;
        case EventTypes.GAME_OVER:
          this.GameServices.handleGameOver(data);
          break;
        case EventTypes.MATCH_OVER:
          this.MatchServices.handleMatchOver(data);
          break;
        case EventTypes.MATCH_ABORTED:
          const opponentId = useGameState.getState().opponent.username;
          this.MatchServices.handleMatchAborted(data, opponentId);
          break;
        default:
          console.warn(`Unknown type: ${data.type}`);
      }
    } catch (error) {
      console.error("Error processing message: ", message, error);
    }
  }

  updateGameStates(data, eventType, isOver = false) {
    const state = useGameState.getState();
    const playerIsActive = data.gameState.activePlayer === this.myMatchUserId;
    const players = this.GameServices.determinePlayers(data);

    state.player.updateGameState(
      players.user,
      data.gameState.dieRollValue,
      playerIsActive
    );
    state.opponent.updateGameState(
      players.opponent,
      data.gameState.dieRollValue,
      !playerIsActive
    );

    if (isOver) {
      state.player.gameState.isMyTurn = false;
      state.opponent.gameState.isMyTurn = false;
      const gameWinner = this.GameServices.determineGameWinner(data);
      this.setCurrentGameWinner(gameWinner);
    }
    this.setCurrentEvent(eventType);
  }
}

// Singleton
const GameHandlingInstance = new GameHandling();
export default GameHandlingInstance;
