import apiClient from ".";

type Props = {
    email: string
    password: string
}

type Response = {
    token: string
}
const login = async({ email, password}: Props): Promise<Response> => {
    const { data } = await apiClient.post('/auth', {
        email,
        password
    })

    return data
}

export default login;
