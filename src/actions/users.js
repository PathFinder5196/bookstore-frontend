import axios from "axios";
import idx from "idx";
import { API_URL } from "../clientConfig";

export function login(loginData) {
  return axios({
    method: "post",
    url: `${API_URL}api/users/authenticate`,
    data: loginData,
  })
    .then((resp) => {
      if (resp?.data?.accessToken) {
        localStorage.setItem("user", JSON.stringify(resp.data));
      }

      return resp;
    })
    .catch((error) => idx(error, (_) => _.response.data));
}

export function registerUser(data) {
  return axios({
    method: "post",
    url: `${API_URL}api/users/register`,
    data,
  })
    .then((resp) => resp)
    .catch((error) => idx(error, (_) => _.response.data));
}

export function verifyToken() {
  return axios({
    method: "get",
    url: `${API_URL}api/users/checkToken`,
  })
    .then((resp) => resp)
    .catch((error) => idx(error, (_) => _.response.data));
}

export function isAuthenticated() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.accessToken) {
    return true;
  }
  return false;
}

export function logout() {
  localStorage.clear();
}
