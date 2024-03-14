import {
  createToken,
  createSchema,
  scramblePassword,
  comparePassword,
  createUser,
  userExists,
  fetchUserByEmail
} from './index.js'

import { z } from 'zod'

const userSchema = z
  .object({
    first_name: z.string().min(2, { message: 'First name is required' }),
    last_name: z.string().min(2, { message: 'Last name is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(5, { message: 'Password must be at least 5 characters' }),
    roles: z.array()
  })
  .strict()

const loginSchema = z
  .object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(5, { message: 'Password must be at least 5 characters' })
  })
  .strict()

const validateSchema = z
  .object({
    email: z.string().email({ message: 'Invalid email address' }),
  })
  .strict()

export const init = async () => {
  await createSchema()
}

export const checkStruct = (data, schema) => {
  let isOk = true
  let msg = []
  try {
    const parsed = schema.parse(data)
  } catch (err) {
    if (err instanceof z.ZodError) {
      isOk = false
      msg = err.issues.map((item) => item.message)
    }
  }
  return { isOk, msg }
}

export const registration = async (User) => {
  const valid = checkStruct(User, userSchema)
  if (!valid.isOk) return { status: 400, User: { ...User, msg: valid.msg } }

  const exists = await userExists(User.email)
  if (exists) return { status: 409, User }

  let u = await scramblePassword(User)
  await createUser(u)
  u = await createToken(u, User.email)
  return { status: 201, User: u }
}

export const login = async (User) => {
  const valid = checkStruct(User, loginSchema)
  if (!valid.isOk) return { status: 400, User: { ...User, msg: valid.msg } }

  let u = await fetchUserByEmail(User.email)
  if (!u) return { status: 401, User }
  if (!(await comparePassword(User.password, u))) return { status: 401, User }

  u = await createToken(u, User.email)
  return { status: 200, User: u }
}

export const validate = async (User) => {
  const valid = checkStruct(User, validateSchema)
  if (!valid.isOk) return { status: 400, User: { ...User, msg: valid.msg } }
  let u = await fetchUserByEmail(User.email)
  if (!u) return { status: 401, User }

  u = await createToken(u, User.email)
  return { status: 200, User: u }
}