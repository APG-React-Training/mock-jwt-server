
//// LET OP!!!! NEXTJS
import { useState, useEffect } from 'react'
import { validate } from './generic'
import { useRouter } from 'next/navigation'
import { UserType } from './User.type'

const useAuth = (auth: any) => {
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [, setLoggingIn] = useState(true)
  const [user, setUser] = useState({})
  const [authError, setAuthError] = useState({})
  const { token, email } = auth

  const router = useRouter()

  if (!token || !email) router.push('/login')

  useEffect(() => {
    if (token && email) {
      validate(email, token)
        .then((response: UserType) => {
          setLoggedIn(true)
          setUser(response)
          setAuthError(false)
          setLoggingIn(false)
        })
        .catch((error) => {
          console.log({ ERROR: error })
          setLoggedIn(false)
          setAuthError(error)
          setLoggingIn(true)
          router.push('/login')
        })
    }
  }, [email, token, router])

  return [isLoggedIn, user, authError, token]
}

export default useAuth
