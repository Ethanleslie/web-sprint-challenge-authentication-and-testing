 const {JWT_SECRET} = require('../../secrets/index')
 const jwt = require('jsonwebtoken')
 
 
 const restrict = (req, res, next) => {
  console.log('header', req.headers)
  const token = req.headers.authorization
  if(!token) {
    return next({status: 401, message: 'token required'})
  }
  jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
    if(err) {
      next({ status: 401, message: 'token invalid'})
    } else {
      req.decodedToken = decodedToken
      next()
    }
  })
  /*
    IMPLEMENT

    1- On valid token in the Authorization header, call next.

    2- On missing token in the Authorization header,
      the response body should include a string exactly as follows: "token required".

    3- On invalid or expired token in the Authorization header,
      the response body should include a string exactly as follows: "token invalid".
  */
};




module.exports = 
  restrict