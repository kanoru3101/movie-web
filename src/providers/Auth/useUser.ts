import { useCallback, useContext } from 'react'
import AuthContext from './AuthContext'
import { AuthUser } from './type'
import jwt_decode, { JwtPayload } from 'jwt-decode'
import { createCookie } from '../../services/cookie'
import { getUser } from '../../services/api'

type User = AuthUser | null
type SetUser = (token: string | null) => Promise<void>
const useUser = (): {user: User, setUser: SetUser} => {
  const { user, setUser: setUserInContext } = useContext(AuthContext)
  const setUser: SetUser = useCallback(
    async token => {
      if (token) {
        const decodedToken = jwt_decode<JwtPayload & AuthUser>(token)

        if (decodedToken.id) {
          await createCookie({ key: 'auth', value: token, days: 30 })
          const userData = await getUser()
          setUserInContext(userData)
          return
        }
      }

      setUserInContext(null)
    },
    [setUserInContext]
  )

  return { user, setUser }
}

export default useUser
