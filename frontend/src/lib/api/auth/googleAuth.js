import { api } from "../axios"

export const GoogleAuth = async (token) => {
    const { data } = await api.post(
        '/auth/firebase',
        null,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    return data
}