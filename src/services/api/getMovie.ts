import apiClient from ".";
import { Movie } from './types'

type AxiosResponse = {
  data: Movie;
}

type Response = AxiosResponse['data'];
const getMovie = async({ imdbId }: { imdbId: string}): Promise<Response> => {
  const { data } = await apiClient.get(`/movies/${imdbId}`)

  return data;
}

export default getMovie;
