import Cookies from 'js-cookie'

type CreateCookie = {
  key: string
  value: string
  days?: number
}

type DeleteCookie = {
  key: string
}
export const createCookie = ({ key, value, days = 7 }: CreateCookie): void => {
  Cookies.set(key, value, { expires: days })
}

export const deleteCookie = ({ key }: DeleteCookie): void => {
  Cookies.remove(key)
}
