import { PLAYER_ENDPOINTS } from "../ApiConfig";
import sendRequest from "../RestService";
import AuthenticationApi from "../../Security/Api/AuthenticationApi";

//Singleton
export default Object.freeze({
  updateProfilePicture(newImage) {
    return sendRequest(
      PLAYER_ENDPOINTS.UPDATE_PROFILE_PICTURE,
      { playerId: AuthenticationApi.getPlayerId(), newImage }
    );
  },

  getProfilePicture() {
    return sendRequest(
      PLAYER_ENDPOINTS.PROFILE_PICTURE,
      { playerId: AuthenticationApi.getPlayerId() }
    );
  },

  getHistory() {
    return sendRequest(
      PLAYER_ENDPOINTS.HISTORY,
      { playerId: AuthenticationApi.getPlayerId() }
    );
  }
})
