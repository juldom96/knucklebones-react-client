import Player from "./player";

export default class Opponent extends Player {
  constructor(opponentData, dieValue, isMyTurn) {
    super(opponentData, dieValue, isMyTurn);
    this.profilePictureUrl = opponentData.profilePictureURL;
    this.username = opponentData.playerId;
  }
}
