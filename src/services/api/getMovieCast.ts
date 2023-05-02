import apiClient from ".";
import { Cast } from './types'

type AxiosResponse = {
  data: Cast[];
}

type Response = AxiosResponse['data'];
const getMovieCast = async({ movieImdb }: { movieImdb: string}): Promise<Response> => {
  const { data } = await apiClient.get(`/movies/${movieImdb}/cast`)
  return data;
}

export default getMovieCast;
