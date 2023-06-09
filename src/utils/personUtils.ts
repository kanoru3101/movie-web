import moment from 'moment'
import 'moment/locale/uk'
import { MOVIE_LANGUAGE } from '../constants'

export const getPersonGender = (gender?: number): string => {
  let genderLabel
  switch (gender) {
    case 1:
      genderLabel = 'personPage.female'
      break
    case 2:
      genderLabel = 'personPage.male'
      break

    case 3:
      genderLabel = 'personPage.it'
      break
    default:
      genderLabel = 'personPage.it'
  }

  return genderLabel
}

export const generateAgesByLanguage = (
  years: number,
  language: MOVIE_LANGUAGE
) => {
  moment.locale(language)

  const duration = moment.duration(years, 'years')
  return duration.humanize()
}

export const getYears = (
  startDate: string,
  endDate: string,
  format: string
): number => {
  return Math.abs(
    moment(endDate, format).diff(moment(startDate, format), 'years')
  )
}
