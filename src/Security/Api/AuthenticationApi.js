import PlayerSecurity from "../PlayerSecurity";
import register from "../useCases/Register";
import login from "../useCases/Login";
import changePassword from "../useCases/ChangePassword";

//Singleton
export default Object.freeze({
  register(username, password, repeatedPassword) {
    return register(username, password, repeatedPassword);
  },

  login(username, password) {
    return login(username, password);
  },

  changePassword(currentPassword, newPassword) {
    return changePassword(
      currentPassword,
      newPassword
    );
  },

  isAuthenticated() {
    return PlayerSecurity.isAuthenticated();
  },

  logout() {
    PlayerSecurity.logout();
  },

  getPlayerId() {
    return PlayerSecurity.getPlayerId();
  }
})

