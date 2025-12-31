import { api } from "../axios"


// GET ALL DATA BANNER
export const GetBanner = async () => {
    const { data } = await api.get('/banner/get')
    return data
}

export const AddBanner = async (image) => {
    const { data } = await api.post('/banner/add', image)
    return data
}

export const RemoveBanner = async (id) => {
    const { data } = await api.delete(`/banner/remove/${id}`)
    return data
} 