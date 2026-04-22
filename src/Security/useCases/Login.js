import PlayerSecurity from "../PlayerSecurity";
import { isEmpty } from "../Validation";
import UserLoginAndRegisterApi from "../../Network/Api/UserLoginAndRegisterApi";

const ERROR_MESSAGES = {
  missingToken: "Invalid response: Token missing.",
  missingInput: "Username or password must not be empty or blanks only",
};

export default async function login(username, password) {
  if (isEmpty(username) || isEmpty(password)) {
    throw new Error(ERROR_MESSAGES.missingInput);
  }

  const response = await UserLoginAndRegisterApi.login(username, password);

  if (!response || !response.token) {
    throw new Error(ERROR_MESSAGES.missingToken);
  }

  PlayerSecurity.setAuthData(response.token, response.playerId);

  return { username: response.playerId };
}



