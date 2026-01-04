import { api } from "../axios"

// DELETE PRODUCT API
export const DeleteProductById = async (productId) => {
    try {
        const { data } = await api.delete('/product/delete', {
            params: { productId }
        })
        return { success: true, data }
    } catch (err) {
        console.error(err)
        return { success: false, message: err.response?.data?.message || err.message || "server error" }
    }
}

// GET ALL DATA PRODUCT
export const getProduct = async () => {
    try {
        const { data } = await api.get('/product')
        return { success: true, data }
    } catch (err) {
        console.error(err)
        return { success: false, message: err.response?.data?.message || err.message || "server error" }
    }
}

// GET PRODUCT WITH FILTERING BY TYPE
export const getProductByType = async (type) => {
    try {
        const { data } = await api.get('/product/get', {
            params: { type }
        })
        return { success: true, data }
    } catch (err) {
        console.error(err)
        return { success: false, message: err.response?.data?.message || err.message || "server error" }
    }
}

// GET PRODUCT WITH FILTERING BY ID
export const getProductById = async (productId) => {
    try {
        const { data } = await api.get(`/product/get/${productId}`)
        return { success: true, data }
    } catch (err) {
        return { success: false, message: err.response?.data?.message || err.message || "server error" }
    }
}

// POST PRODUCT - (FORMDATA) 
export const AddProduct = async (formData) => {
    try {
        const { data } = await api.post('/product/add', formData)
        return { success: true, data }
    } catch (err) {
        console.error(err)
        return { success: false, message: err.response?.data?.message || err.message || "server error" }
    }
}

// POST PROCUT PACK - (FORMDATA)
export const AddPack = async (formData) => {
    try {
        const { data } = await api.post('/product/add-pack', formData)
        return { success: true, message: data.message, data }
    } catch (err) {
        console.error(err)
        return { success: false, message: err.response?.data?.message || err.message || "server error" }
    }
}