import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()

const { MONGO_URI, MONGO_DB, MONGO_COLLECTION } = process.env

const client = new MongoClient(MONGO_URI)
const database = client.db(MONGO_DB)
const users = database.collection(MONGO_COLLECTION)

export const createSchema = async () => {
  try {
    const cc = await database.createCollection(MONGO_COLLECTION)
    const uc = database.collection(MONGO_COLLECTION)
  } catch (err) {
    return false
  }
}

export const createIndex = async () => {
  try {
    const idx = await users.createIndex({ email: 1 }, { unique: true })
  } catch (err) {
    return false
  }
}

export const disconnect = async () => await client.close()
export const fetchUsers = async () => await users.find({}).toArray()

export const userExists = async (email) => {
  const exists = await users.find({ email: email }).toArray()
  return exists.length > 0
}

export const fetchUserByEmail = async (email) => {
  const user = await users.find({ email: email }).toArray()
  return user.length === 0 ? false : user[0]
}

export const createUser = async (user) => {
  try {
    const u = await users.insertOne(user)
    await createIndex()
    return u
  } catch (err) {
    return false
  }
}
