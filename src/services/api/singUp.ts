import apiClient from ".";

type Props = {
    email: string
    password: string
}

type Response = {
    token: string
}
const signUp = async({ email, password}: Props): Promise<Response> => {
    const { data } = await apiClient.put('/auth', {
        email,
        password
    })

    return data;
}

export default signUp;
