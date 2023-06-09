import { useCallback, useContext } from 'react'
import AuthContext from './AuthContext'
import { AuthUser } from './type'
import jwt_decode, { JwtPayload } from 'jwt-decode'
import { createCookie, getCookie } from '../../services/cookie'
import { getUser } from '../../services/api'
import { LANGUAGE_COOKIE } from './constants'
import { LANGUAGES } from '../../constants'

export type UseUser = AuthUser | null
type SetUser = (token: string | null) => Promise<void>
const useUser = (): {user: UseUser, setUser: SetUser, language: LANGUAGES} => {
  const { user, setUser: setUserInContext } = useContext(AuthContext)

  const setUser: SetUser = useCallback(
    async token => {
      if (token) {
        const decodedToken = jwt_decode<JwtPayload & AuthUser>(token)

        if (decodedToken.id) {
          await createCookie({ key: 'auth', value: token, days: 30 })
          const userData = await getUser()
          setUserInContext(userData)
          return;
        }
      }

      setUserInContext(null)
    },
    [setUserInContext]
  )

  const language = (user?.language || getCookie(LANGUAGE_COOKIE) || LANGUAGES.EN) as LANGUAGES

  return { user, setUser, language }
}

export default useUser
