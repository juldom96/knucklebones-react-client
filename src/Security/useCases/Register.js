import PlayerSecurity from "../PlayerSecurity";
import { isEmpty, validatePassword, repeatPasswordCheck } from "../Validation";
import UserLoginAndRegisterApi from "../../Network/Api/UserLoginAndRegisterApi";

const ERROR_MESSAGES = {
  registrationSuccessful: "Registration successful.",
  missingToken: "Invalid response: Token missing.",
  missingUsernameOrPw:
    "Username or password must not be empty and must not contain only blanks.",
};


export default async function register(username, password, repeatPassword) {
  try {
    if (isEmpty(username) || isEmpty(password)) {
      throw new Error(ERROR_MESSAGES.missingUsernameOrPw);
    }
    validatePassword(password);
    repeatPasswordCheck(password, repeatPassword);

    const response = await UserLoginAndRegisterApi.register(
      username,
      password
    );

    if (!response || !response.token) {
      throw new Error(ERROR_MESSAGES.missingToken);
    }

    PlayerSecurity.setAuthData(response.token, response.playerId);

    return {
      success: true,
      message: ERROR_MESSAGES.registrationSuccessful,
      username: response.playerId,
    };
  } catch (error) {
    throw error;
  }
}

