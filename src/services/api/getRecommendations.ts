import apiClient from ".";
import { Movie } from './types'

type AxiosResponse = {
  data: Movie[]
}

type Response = AxiosResponse['data'];
const getRecommendations = async({ imdbId }: { imdbId: string}): Promise<Response> => {
  const { data } = await apiClient.get(`/movies/${imdbId}/recommendations`)

  return data;
}

export default getRecommendations;
