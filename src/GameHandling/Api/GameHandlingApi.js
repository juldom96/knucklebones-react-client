import GameHandling from "../GameHandling";
import GameWebSocketServices from "../services/GameWebSocketServices";

//private
const GAME_WEBSOCKET_SERVICES = new GameWebSocketServices(GameHandling);

//Singleton
export default Object.freeze({
  sendWantToPlay(matchType) {
    GAME_WEBSOCKET_SERVICES.initializeWebSocketForGame(matchType);
  },

  abortFindingOpponent() {
    GAME_WEBSOCKET_SERVICES.abortFindingOpponent();
  },


  sendPlaceDie(rowIndex) {
    GAME_WEBSOCKET_SERVICES.sendPlaceDie(rowIndex);
  },

  sendQuitMatch() {
    GAME_WEBSOCKET_SERVICES.sendQuitMatch()
  }
})