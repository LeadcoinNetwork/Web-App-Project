const parseQueryString = queryString => {
  if (!queryString) {
    return {}
  }
  let queryObject = {}
  let queryElements = queryString.split("&")

  queryElements.map(function(queryElement) {
    if (queryElement.indexOf("=") === -1) {
      queryObject[queryElement] = true
    } else {
      let [key, value] = queryElement.split("=")
      if (value.indexOf("[") === 0 || value.indexOf("{") === 0) {
        value = JSON.parse(value)
      }
      queryObject[key.trim()] = value
    }
  })

  return queryObject
}

const queryParser = (req, res, next) => {
  const queryString = decodeURIComponent(
    req.url.slice(req.url.indexOf("?") + 1),
  )
  req.query = parseQueryString(queryString)
  next()
}

export default queryParser
