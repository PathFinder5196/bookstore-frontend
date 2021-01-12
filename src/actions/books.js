import axios from "axios";
import idx from "idx";
import { API_URL } from "../clientConfig";

export function getAllBooks() {
  return axios({
    method: "get",
    url: `${API_URL}api/books`,
  })
    .then((resp) => resp)
    .catch((error) => idx(error, (_) => _.response.data));
}

export function getBookById(id) {
  return axios({
    method: "get",
    url: `${API_URL}api/books/${id}`,
  })
    .then((resp) => resp)
    .catch((error) => idx(error, (_) => _.response.data));
}

export function addBook(data) {
  return axios({
    method: "post",
    url: `${API_URL}api/books`,
    data,
  })
    .then((resp) => resp)
    .catch((error) => idx(error, (_) => _.response.data));
}

export function updateBook(id, data) {
  return axios({
    method: "post",
    url: `${API_URL}api/books/update/${id}`,
    data,
  })
    .then((resp) => resp)
    .catch((error) => idx(error, (_) => _.response.data));
}

export function removeBook(id) {
  return axios({
    method: "DELETE",
    url: `${API_URL}api/books`,
    data: { id },
  })
    .then((resp) => resp)
    .catch((error) => idx(error, (_) => _.response.data));
}
