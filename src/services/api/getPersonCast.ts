import apiClient from ".";
import { Cast } from './types'

type AxiosResponse = {
  data: Cast[];
}

type Response = AxiosResponse['data'];
const getPersonCast = async({ personImdb }: { personImdb: string}): Promise<Response> => {
  const { data } = await apiClient.get(`/people/${personImdb}/cast`)
  return data;
}

export default getPersonCast;
