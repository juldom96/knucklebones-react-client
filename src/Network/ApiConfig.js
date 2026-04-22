export const API_BASE_URL = "https://lyra.et-inf.fho-emden.de:20036/api";
export const WSS_BASE_URL = "wss://lyra.et-inf.fho-emden.de:20036/api/game-socket";

// export const API_BASE_URL = "https://pfw2024.proxy.beeceptor.com";
// export const WSS_BASE_URL = "ws://localhost:8080";

const AUTH_ROUTE = "/auth";
const PLAYER_ROUTE = "/player";

export const AUTH_ENDPOINTS = {
  LOGIN: AUTH_ROUTE + "/login",
  REGISTER: AUTH_ROUTE + "/register",
  CHANGE_PW: AUTH_ROUTE + "/change-pw",
};

export const PLAYER_ENDPOINTS = {
  PROFILE_PICTURE: PLAYER_ROUTE + "/profile-picture",
  UPDATE_PROFILE_PICTURE: PLAYER_ROUTE + "/update-profile-picture",
  HISTORY: PLAYER_ROUTE + "/history",
};
