const jwt = require('jsonwebtoken')
const User = require('../userModel.js')

const requireAuth = async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers

  if (!authorization) {
    next()
  }

  const token = authorization.split(' ')[1]

  try {
    const { _id } = jwt.verify(token, 'rjrjjrr')

    req.user = await User.findOne({ _id }).select('_id')
    next()

  } catch (error) {
    console.log(error)
    res.status(401).json({error: 'Request is not authorized'})
  }
}

module.exports = requireAuth