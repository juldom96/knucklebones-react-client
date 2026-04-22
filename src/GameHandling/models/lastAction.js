export default class LastAction {
  constructor(data) {
    this.processLastActionData(data);
  }

  processLastActionData(data) {
    if (!this.validateData(data)) {
      throw new Error("Invalid data provided for lastAction.");
    }
    const message = data.gameState.lastAction;
    this.type = message.type;
    this.username = message.playerId;
    this.placedInRow = message.placedInRow;
    this.dieValuePlaced = message.dieValuePlaced;
    this.removedFromRow = message.attack.removeFromRow;
  }

  validateData(data) {
    if (!data || typeof data !== "object") {
      console.error("Data must be an object.");
      return false;
    }
    if (!data.gameState || typeof data.gameState !== "object") {
      console.error("data.gameState is required and must be an object.");
      return false;
    }

    const message = data.gameState.lastAction;

    if (!message || typeof message !== "object") {
      console.error(
        "data.gameState.lastAction is required and must be an object."
      );
      return false;
    }
    if (typeof message.type !== "string") {
      console.error("message.type is required and must be a string.");
      return false;
    }
    if (typeof message.playerId !== "string") {
      console.error("message.playerId is required and must be a string.");
      return false;
    }
    if (
      !Number.isInteger(message.placedInRow) &&
      message.placedInRow !== null
    ) {
      console.error("message.placedInRow must be an integer or null.");
      return false;
    }
    if (
      !Number.isInteger(message.dieValuePlaced) &&
      message.dieValuePlaced !== null
    ) {
      console.error("message.dieValuePlaced must be an integer or null.");
      return false;
    }
    if (
      message.attack.removeFromRow !== null &&
      !Number.isInteger(message.attack.removeFromRow)
    ) {
      console.error("message.attack.removeFromRow must be an integer or null.");
      return false;
    }
    return true;
  }
}
