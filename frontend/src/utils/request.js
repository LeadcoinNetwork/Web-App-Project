import axios from "axios"

export default function fetchBackend(method, url, data) {
  return axios({
    url: process.env.BACKEND + url,
    method,
    data: data || undefined,
    withCredentials: true,
  })
    .then(a => {
      return a.data
    })
    .catch(e => {
      if (!e.response) {
        return {
          isError: true,
          data: {
            error: "NETWORK ERROR",
          },
        }
      }
      e.response.isError = e.response.data
      return e.response
    })
}
