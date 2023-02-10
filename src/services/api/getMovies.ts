import apiClient from ".";

const getMovies = async(): Promise<any> => {
  return await apiClient.get('/movies')
}


export default getMovies;