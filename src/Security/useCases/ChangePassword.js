import PlayerSecurity from "../PlayerSecurity";
import { validatePassword, repeatPasswordCheck } from "../Validation";
import UserLoginAndRegisterApi from "../../Network/Api/UserLoginAndRegisterApi";


const ERROR_MESSAGES = {
  missingToken: "Invalid response: Token missing.",
  changePasswordSucceeded: "Password changed successfully.",
};

export default async function changePassword(currentPassword, newPassword, repeatedNewPassword) {
  try {
    validatePassword(newPassword);
    repeatPasswordCheck(newPassword, repeatedNewPassword);

    const response = await UserLoginAndRegisterApi.changePassword(
      PlayerSecurity.getPlayerId(),
      currentPassword,
      newPassword
    );

    if (!response || !response.token) {
      throw new Error(ERROR_MESSAGES.missingToken);
    }

    PlayerSecurity.setToken(response.token);

    return {
      success: true,
      message: ERROR_MESSAGES.changePasswordSucceeded,
    };
  } catch (error) {
    throw error;
  }
}

