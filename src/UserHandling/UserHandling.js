
import RemoteUserInformationApi from "../Network/Api/RemoteUserInformationApi";
import AuthenticationApi from "../Security/Api/AuthenticationApi";
import History from "./models/History";

class UserHandling {
  #currentUser = null;

  async loginUser(username, password) {
    const res = await AuthenticationApi.login(username, password);
    this.#currentUser = res.username;
  }

  async registerUser(username, password, repeatPassword) {
    const res = await AuthenticationApi.register(
      username,
      password,
      repeatPassword
    );
    this.#currentUser = res.username;
  }


  async getProfilePictureUrl() {
    this.#assertUserLoggedIn();

    try {
      const res = await RemoteUserInformationApi.getProfilePicture();
      return res.profile_image_url;
    } catch (error) {
      console.error("Failed to get profile picture:", error);
      throw error;
    }
  }

  async getHistory() {
    this.#assertUserLoggedIn();

    try {
      const historyData = await RemoteUserInformationApi.getHistory();
      return new History(historyData);
    } catch (error) {
      console.error("Failed to get history:", error);
      throw error;
    }
  }

  getCurrentUser() {
    return this.#currentUser;
  }

  logoutUser() {
    AuthenticationApi.logout();
    this.#currentUser = null;
  }

  #assertUserLoggedIn() {
    if (!this.#currentUser) {
      throw new Error("User not logged in");
    }
  }

  // unused function
  // async updateProfilePicture(newImage) {
  //   if (!this.#currentUser) {
  //     throw new Error("User not logged in");
  //   }

  //   try {
  //     const response = await RemoteUserInformationApi.updateProfilePicture(
  //       newImage
  //     );
  //     return response;
  //   } catch (error) {
  //     console.error("Failed to update profile picture:", error);
  //     throw error;
  //   }
  // }
}

// Singleton
const userHandling = new UserHandling();
export default userHandling;
