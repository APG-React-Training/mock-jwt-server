// @ts-ignore
import cookieCutter from '@boiseitguru/cookie-cutter'
//import { config } from '@/config'
import { UserType } from './User.type'

/// CONFIG OPTIES: 
const COOKIE = 'apg-cookie-jar'
const JWT_LOGIN = `http://localhost:4001/api/Accounts/log-in`
const JWT_VALIDATE = `http://localhost:4001/api/Accounts/validate`

export const getAuthentication = () => {
  try {
    const d = cookieCutter.get(COOKIE)
    console.log(d)

    const { token, email } = JSON.parse(d)
    return { token, email }
  } catch (err) {
    return false
  }
}

export const saveAuthentication = (email: string, token: string) => {
  const auth = JSON.stringify({ token: token, email: email })
  cookieCutter.set(COOKIE, auth)
}

export const logout = async () => {
  cookieCutter.set(COOKIE, {})
}

export const login = (email: string, password: string): Promise<UserType> =>
  new Promise((resolve, reject) => {
    fetch(JWT_LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      //body: JSON.stringify({ email: email, password: password })
      body: JSON.stringify({ email: email, wachtwoord: password })
    })
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) throw new Error(response.status.toString())
        return response.json()
      })
      .then((response) => {
        saveAuthentication(response.email, response.token)
        resolve(response)
      })
      .catch((err) => reject(err))
  })

export const validate = (email: string, token: string): Promise<UserType> =>
  new Promise((resolve, reject) => {
    fetch(JWT_VALIDATE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      //body: JSON.stringify({ email: email })
      body: JSON.stringify({ email: email, token: token })
    })
      .then((response) => {
        //console.log(response)
        if (response.status !== 200 && response.status !== 201) throw new Error(response.status.toString())
        return response.json()
      })
      .then((response) => resolve(response))
      .catch((err) => reject(err))
  })
