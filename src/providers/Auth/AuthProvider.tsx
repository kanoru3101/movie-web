import { AuthUser } from './type'
import React, { useState, useEffect, useMemo } from 'react'
import AuthContext from './AuthContext'
import getCookieUser from './getCookieUser'
import { getUser } from '../../services/api'

type Props = {
  children: React.ReactNode
}
const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null)

  useEffect(() => {
    const setUserDataFn = async () => {
      const userFromCookie = getCookieUser()

      if (userFromCookie) {
        const userData = await getUser()
        setUser(userData)
      } else {
        setUser(null)
      }
    }

    setUserDataFn()
  }, [setUser])

  const value = useMemo(
    () => ({
      setUser,
      user,
    }),
    [user, setUser]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
