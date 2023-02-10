import apiClient from ".";
import { User } from './types'

const getUser = async(): Promise<User> => {
  const { data } = await apiClient.get('/users')
  return data;
}


export default getUser;
