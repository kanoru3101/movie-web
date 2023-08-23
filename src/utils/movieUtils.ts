import moment from "moment";

export const getRealiseYear = (date: string): string => moment(date).format('YYYY')
