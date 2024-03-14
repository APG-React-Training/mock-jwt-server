import express from 'express'
import dotenv from 'dotenv'
import { disconnect, auth } from './lib/index.js'
import * as server from './lib/server.js'

dotenv.config()
const app = express()
const { API_PORT } = process.env

app.use(express.json({ limit: '50mb' }))

app.use((request, result, next) => {
  result.setHeader("Access-Control-Allow-Origin", "*")
  result.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
  result.setHeader("Access-Control-Allow-Headers", "Origin,Content-Type,Accept,Authorization")
  next()
})

await server.init()

app.post('/register', async (req, res) => {
  const { status, User } = await server.registration(req.body)
  res.status(status).json(User)
})

app.post('/login', async (req, res) => {
  const { status, User } = await server.login(req.body)
  res.status(status).json(User)
})

app.get('/welcome', auth, (req, res) => {
  res.status(200).send('Welcome 🙌 ')
})

app.post('/validate', auth, async (req, res) => {
  const { status, User } = await server.validate(req.body)
  res.status(status).json(User)
})

app.listen(API_PORT, () => {
  console.log(`JWT Server running on port ${API_PORT}`)
})

process.on('SIGINT', async () => {
  console.log('\nShutting down...')
  await disconnect()
  process.exit(0)
})
