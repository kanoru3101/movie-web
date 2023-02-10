import apiClient from ".";

const getTopRate = async(): Promise<any> => {
  return await apiClient.get('/movies/top-rate')
}


export default getTopRate;