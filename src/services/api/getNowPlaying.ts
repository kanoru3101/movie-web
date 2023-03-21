import apiClient from ".";
import { Movie } from './types'

type AxiosResponse = {
  data: Movie[]
}

type Response = AxiosResponse['data'];
const getNowPlaying = async(): Promise<Response> => {
  const { data } = await apiClient.get('/movies/now-playing')

  return data;
}

export default getNowPlaying;
