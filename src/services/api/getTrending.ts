import apiClient from ".";
import { Movie } from './types'

type AxiosResponse = {
  data: {
    results: Movie[]
    total_pages: number
    total_results: number
    page: number
  }
}

type Response = AxiosResponse['data'];

const getTrending = async(): Promise<Response> => {
  const { data } = await apiClient.get('/movies/trending') as unknown as AxiosResponse
  return data;
}


export default getTrending;
