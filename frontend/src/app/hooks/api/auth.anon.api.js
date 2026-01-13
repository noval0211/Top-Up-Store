import { api } from "@/lib/api/axios";

export const AnonymousAuth = async (token) => {
    const { data } = await api.post(
        '/auth/anonymous',
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    return data;
}