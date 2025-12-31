import { api } from "../axios"

export const GoogleAuth = async (token) => {
    const { data } = await api.post('/auth/firebase', {token} )
    return data
}