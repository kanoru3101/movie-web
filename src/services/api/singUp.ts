import apiClient from ".";

type Props = {
    email: string
    password: string
}
const signUp = async({ email, password}: Props): Promise<any> => {
    const { data } = await apiClient.put('/auth', {
        email,
        password
    })

    return data;
}

export default signUp;
