import apiClient from ".";
import { Movie } from './types'

type AxiosResponse = {
  data: Movie[]
}

type Response = AxiosResponse['data'];
const getTopRate = async(): Promise<Response> => {
  const { data } = await apiClient.get('/movies/top-rate')

  return data;
}

export default getTopRate;
