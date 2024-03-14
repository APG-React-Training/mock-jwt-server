import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const { TOKEN_KEY, TOKEN_EXPIRES_IN } = process.env

export const createToken = (User, email) => {
  const token = jwt.sign({ user_id: User._id, email }, TOKEN_KEY, {
    expiresIn: TOKEN_EXPIRES_IN
  })
  return { ...User, token }
}

export const auth = (req, res, next) => {
  const token =
    req.body.token ||
    req.query.token ||
    req.params.token ||
    req.headers['x-access-token'] ||
    req.headers['authorization'].split(' ')[1]

  if (!token) return res.status(403).send('A token is required for authentication')

  try {
    req.user = jwt.verify(token, TOKEN_KEY)
  } catch (err) {
    return res.status(401).send('Invalid Token')
  }
  return next()
}
