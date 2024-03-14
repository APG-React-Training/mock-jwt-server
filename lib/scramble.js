import bcrypt from 'bcryptjs'

export const comparePassword = async (password, user) =>
  await bcrypt.compare(password, user.password)

export const scramblePassword = async (User) => {
  const scrambledPassword = await bcrypt.hash(User.password, 10)
  return { ...User, password: scrambledPassword }
}
