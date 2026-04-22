import { WSS_BASE_URL } from "./ApiConfig";
import PlayerSecurity from "../Security/PlayerSecurity";

class WebSocketService {
  //private
  #socket = null;
  #eventHandlers = {};

  //public
  connect(options = {}) {
    if (this.#socket) {
      console.warn(
        "WebSocket connection already exists."
      );
      return;
    }

    const { protocols, handlers } = options;
    this.#socket = new WebSocket(WSS_BASE_URL, protocols);

    if (handlers) {
      this.#eventHandlers = handlers;
    }

    this.#socket.onopen = (event) => {
      console.log("WebSocket connection opened.");
      if (this.#eventHandlers.onOpen) {
        this.#eventHandlers.onOpen(event);
      }
    };

    this.#socket.onmessage = (event) => {
      console.log("WebSocket message received:", event.data);
      const message = JSON.parse(event.data);
      if (this.#eventHandlers.onMessage) {
        if (message.type === "handshake") {
          this.#eventHandlers.onMessage(
            event,
            PlayerSecurity.getPlayerId() //Proxy-Funktion 1
          );
        } else {
          this.#eventHandlers.onMessage(event);
        }
      }
    };

    this.#socket.onclose = (event) => {
      console.log("WebSocket connection closed.");
      if (this.#eventHandlers.onClose) {
        this.#eventHandlers.onClose(event);
      }
      this.#socket = null;
    };

    this.#socket.onerror = (event) => {
      console.error("WebSocket error:", event);
      if (this.#eventHandlers.onError) {
        this.#eventHandlers.onError(event);
      }
    };
  }

  send(data) {
    if (!this.#socket || this.#socket.readyState !== WebSocket.OPEN) {
      console.error("WebSocket is not connected.");
      return;
    }
    data.playerId = PlayerSecurity.getPlayerId(); //Proxy-Funktion 2
    const payload = typeof data === "string" ? data : JSON.stringify(data);
    this.#socket.send(payload);
  }

  close(reason, code = 1000) {
    if (this.#socket) {
      this.#socket.close(code, reason);
    } else {
      console.warn("WebSocket is not connected.");
    }
    console.log("WebSocket closed: " + reason + " (" + code + ")");
  }
}

// Singelton
const WebSocketServiceInstance = new WebSocketService();
export default WebSocketServiceInstance;
