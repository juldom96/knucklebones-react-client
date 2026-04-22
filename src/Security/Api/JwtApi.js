import PlayerSecurity from "../PlayerSecurity";

//Singleton
export default Object.freeze({
  getAuthToken() {
    return PlayerSecurity.getAuthToken();
  },

  setAuthToken(token) {
    PlayerSecurity.setToken(token);
  }
})
