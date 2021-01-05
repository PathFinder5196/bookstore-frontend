import axios from "axios";
import idx from "idx";

export function getAllBooks() {
  return axios({
    method: "get",
    url: `/api/books`,
  })
    .then((resp) => resp)
    .catch((error) => idx(error, (_) => _.response.data));
}

export function addBook(data) {
  return axios({
    method: "post",
    url: `/api/books`,
    data,
  })
    .then((resp) => resp)
    .catch((error) => idx(error, (_) => _.response.data));
}

export function updateBook(id, data) {
  return axios({
    method: "post",
    url: `/api/books/update/${id}`,
    data,
  })
    .then((resp) => resp)
    .catch((error) => idx(error, (_) => _.response.data));
}

export function removeBook(id) {
  return axios({
    method: "DELETE",
    url: `/api/books`,
    data: { id },
  })
    .then((resp) => resp)
    .catch((error) => idx(error, (_) => _.response.data));
}
