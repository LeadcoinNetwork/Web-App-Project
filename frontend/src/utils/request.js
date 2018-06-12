import axios from "axios"
export default function fetchBackend(method, url, data) {
  if (typeof data == "object") {
    return axios({
      url: process.env.BACKEND + url,
      method,
      data,
      withCredentials: true,
    })
  }
}
