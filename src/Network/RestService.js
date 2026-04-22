import { API_BASE_URL } from "./ApiConfig";
import JwtApi from "../Security/Api/JwtApi";

const defaultHeaders = {
  "Content-Type": "application/json",
};

function addAuthToken(headers) {
  const token = JwtApi.getAuthToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
}

function configureHeaders(customHeaders = {}, method = "POST") {
  const headers = { ...defaultHeaders, ...customHeaders };

  if (["GET", "HEAD"].includes(method)) {
    delete headers["Content-Type"];
  }

  addAuthToken(headers);
  return headers;
}

function configureOptions(method, customHeaders, body) {
  const headers = configureHeaders(customHeaders, method);
  return {
    method,
    headers,
    body: body && ["POST", "PUT", "PATCH"].includes(method)
      ? JSON.stringify(body)
      : null,
  };
}

export default async function sendRequest(endpoint, body = null, customHeaders = {}, method = "POST") {
  const options = configureOptions(method, customHeaders, body);

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`${response.status} - ${response.statusText}: ${errorText}`);
    }

    const contentType = response.headers.get("Content-Type") || "";
    if (contentType.includes("application/json")) {
      return await response.json();
    }
    return await response.text();
  } catch (error) {
    console.error("Network error:", error.message);
    throw error;
  }
}
