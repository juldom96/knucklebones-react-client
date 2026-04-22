import GameConnectionApi from "../../Network/Api/GameConnectionApi";
import PlayerSecurity from "../../Security/PlayerSecurity";
import { EventTypes } from "../models/eventTypes";

export default class GameWebSocketServices {
  constructor(gameHandler) {
    this.gameHandler = gameHandler;
  }

  initializeWebSocketForGame(matchType) {
    const options = {
      handlers: {
        onOpen: () => {
          console.log("WebSocket connected, sending initial message...");
          this.sendWantToPlay(matchType);
        },
        onMessage: (event, playerId = null) => {
          this.gameHandler.processGameMessage(event.data, playerId);
        },
        onClose: () => {
          console.log("WebSocket connection closed by the server.");
        },
        onError: (error) => {
          console.error("WebSocket error: ", error);
        },
      },
    };

    GameConnectionApi.connect(options);
  }

  abortFindingOpponent() {
    GameConnectionApi.close(
      "User has cancelled the search for an opponent."
    );
    this.gameHandler.setCurrentEvent(null);
  }

  sendMessage(message) {
    message.playerId = this.gameHandler.myMatchUserId;
    GameConnectionApi.send(message);
  }

  sendWantToPlay(matchType) {
    const message = {
      type: "wantToPlay",
      matchType: matchType,
      token: PlayerSecurity.getAuthToken()
    };
    this.sendMessage(message);
  }

  sendPlaceDie(rowIndex) {
    const message = {
      type: "placeDie",
      roomId: this.gameHandler.roomId,
      rowIndex: rowIndex,
    };
    this.sendMessage(message);
  }

  sendQuitMatch() {
    const message = {
      type: "quitMatch",
      roomId: this.gameHandler.roomId,
    };
    this.sendMessage(message);

    this.gameHandler.setCurrentEvent(EventTypes.QUIT_MATCH);
    this.gameHandler.gameStarted = false;

    GameConnectionApi.close(
      `${this.gameHandler.myMatchUserId} quit the match.`
    );
  }
}
