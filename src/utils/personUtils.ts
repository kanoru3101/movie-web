import moment from 'moment'

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

export  const getYears = (startDate: string, endDate: string): number => {
  return Math.abs(moment(endDate).diff(startDate, 'years', false));
}
