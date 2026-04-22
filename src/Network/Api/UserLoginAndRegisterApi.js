import { AUTH_ENDPOINTS } from "../ApiConfig";
import sendRequest from "../RestService";

//private
const MISSING_USERNAME_OR_PW = "Username and/or password are missing.";
const WRONG_USERNAME_OR_PW = "Something is wrong within username, password or repeated password.";

//Singleton
export default Object.freeze({

  async login(username, password) {
    if (username && password) {
      return sendRequest(AUTH_ENDPOINTS.LOGIN, {
        playerId: username,
        password,
      });
    } else {
      throw new Error(MISSING_USERNAME_OR_PW);
    }
  },

  async register(username, password) {
    if (username && password) {
      return sendRequest(AUTH_ENDPOINTS.REGISTER, {
        playerId: username,
        password,
      });
    } else {
      throw new Error(MISSING_USERNAME_OR_PW);
    }
  },

  async changePassword(playerId, currentPassword, newPassword) {
    if (playerId && currentPassword && newPassword) {
      return sendRequest(AUTH_ENDPOINTS.CHANGE_PW, {
        playerId,
        currentPassword,
        newPassword,
      });
    } else {
      throw new Error(WRONG_USERNAME_OR_PW)
    }
  }
})