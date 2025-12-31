import { api } from "../axios"

// DELETE PRODUCT API
export const DeleteProductById = async (productId) => {
    const { data } = await api.delete('/product/delete', {
        params: { productId }
    })
    return data
}

// GET ALL DATA PRODUCT
export const getProduct = async () => {
    const { data } = await api.get('/product')
    return data

}

// GET PRODUCT WITH FILTERING BY TYPE
export const getProductByType = async (type) => {
    const { data } = await api.get('/product/get', {
        params: { type }
    })
    return data
}

// GET PRODUCT WITH FILTERING BY ID
export const getProductById = async (productId) => {
    const { data } = await api.get(`/product/get/${productId}`)
    return data
}

// POST PRODUCT - (FORMDATA) 
export const AddProduct = async (formData) => {
    const data = await api.post('/product/add', formData)
    return data
}