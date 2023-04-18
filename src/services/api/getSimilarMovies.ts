import apiClient from ".";
import { Movie } from './types'

type AxiosResponse = {
  data: Movie[]
}

type Response = AxiosResponse['data'];
const getSimilarMovies = async({ imdbId }: { imdbId: string}): Promise<Response> => {
  const { data } = await apiClient.get(`/movies/${imdbId}/similar`)

  return data;
}

export default getSimilarMovies;
