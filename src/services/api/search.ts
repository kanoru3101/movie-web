import apiClient from '.'
import { APIPagination, Movie, Person } from './types'
import { SEARCH_FILTERS } from '../../constants'

type AxiosResponse = {
  data: APIPagination & {
    data: {
      movies: Array<Movie>,
      people: Array<Person>
    }
  }
}

type Response = AxiosResponse['data']
const search = async ({
  type,
  query,
}: {
  query: string
  type: SEARCH_FILTERS
}): Promise<Response> => {
  const { data } = await apiClient.get(`/search/multi`, { params: {query, type }})
  return data
}

export default search
