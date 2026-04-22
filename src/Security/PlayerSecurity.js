
class PlayerSecurity {

  //private
  #token = null;
  #playerId = null;

  //public
  isAuthenticated() {
    return !!this.#token;
  }

  logout() {
    this.#token = null;
    this.#playerId = null;
  }

  setAuthData(token, playerId) {
    this.setToken(token);
    this.setPlayerId(playerId);
  }

  setToken(token) {
    this.#token = token;
  }

  setPlayerId(id) {
    this.#playerId = id;
  }

  getAuthToken() {
    return this.#token;
  }

  getPlayerId() {
    return this.#playerId;
  }
}

// Singleton
const playerSecurityInstance = new PlayerSecurity();
export default playerSecurityInstance;
