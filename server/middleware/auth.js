const jwt = require('jsonwebtoken')
const secret = 'test'

const auth = async (req, res, next) => {
  console.log(req.headers.authorization)
  try {
    //TODO: DIRECT COKKIE ACESS
    // || req.cookies.accessToken
    const token = req.headers.authorization.split(' ')[1]
    const isCustomAuth = token.length < 500

    let decodedData

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, process.env.JWT_KEY)
      req.userId = decodedData?.id
    } else {
      decodedData = jwt.decode(token)
      req.userId = decodedData?.sub
    }

    next()
  } catch (error) {
    console.log(error)
  }
}

module.exports = auth
