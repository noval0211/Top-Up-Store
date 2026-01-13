import { api } from "@/lib/api/axios"

export const HistoryTransaction = async () => {
    const data = await api.get('/transaction')
    return data.data
}