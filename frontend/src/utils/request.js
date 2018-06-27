import axios from "axios"

export default function fetchBackend(method, url, data) {
  var notBefore = new Date().valueOf() + 150
  return new Promise(realResolve => {
    function resolve(data) {
      setTimeout(realResolve.bind(null, data), notBefore - new Date().valueOf())
    }
    axios({
      url: process.env.BACKEND + url,
      method,
      data: data || undefined,
      withCredentials: true,
    })
      .then(a => {
        resolve(a.data)
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
        resolve(e.response)
      })
  })
}
