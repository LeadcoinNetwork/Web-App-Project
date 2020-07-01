const checkIsInRole = role => (req, res, next) => {
  if (!req.user || req.user.role !== role) {
    res.status(401).send()
  }
  next()
}

export default checkIsInRole
