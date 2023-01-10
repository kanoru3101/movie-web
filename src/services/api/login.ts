import apiClient from ".";

type Props = {
    email: string
    password: string
}
const login = async({ email, password}: Props): Promise<any> => {
    const { data } = await apiClient.post('/auth', {
        email,
        password
    })

    return data
}

export default login;
