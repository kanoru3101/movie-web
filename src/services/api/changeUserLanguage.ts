import apiClient from ".";
import { LANGUAGES } from '../../constants'

type AxiosResponse = {
  data: {
    status: 'OK'
  }
}

type ChangeUserLanguageProps = {
  language: LANGUAGES
}

type Response = AxiosResponse['data'];
const changeUserLanguage = async({ language }: ChangeUserLanguageProps): Promise<Response> => {
  const { data } = await apiClient.post('/users/language', { language })

  return data;
}

export default changeUserLanguage;
