import apiClient from ".";
import { Cast, Movie, Person } from './types'

type AxiosResponse = {
  data: Person & {
    cast: Array<Cast> & {
      movie: Movie
    }
  };
}

type Response = AxiosResponse['data'];
const getPerson = async({ imdbId }: { imdbId: string}): Promise<Response> => {
  const { data } = await apiClient.get(`/people/${imdbId}`)

  return data;
}

export default getPerson;
