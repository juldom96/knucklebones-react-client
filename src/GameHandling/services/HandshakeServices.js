export default class HandshakeServices {
  constructor(gameHandler) {
    this.gameHandler = gameHandler;
  }

  handleHandshake(data, myMatchUserId) {
    this.gameHandler.roomId = data.roomId;
    this.gameHandler.myMatchUserId = myMatchUserId;
  }
}
