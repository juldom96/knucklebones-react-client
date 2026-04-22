import userHandling from "../UserHandling";

export default Object.freeze({
    async loginUser(username, password) {
        return userHandling.loginUser(username, password)
    },

    async registerUser(username, password, repeatPassword) {
        return userHandling.registerUser(username, password, repeatPassword);
    },

    async getProfilePictureUrl() {
        return userHandling.getProfilePictureUrl()
    },

    async getHistory() {
        return userHandling.getHistory()
    },

    getCurrentUser() {
        return userHandling.getCurrentUser()

    },

    logoutUser() {
        return userHandling.logoutUser()
    }
})
