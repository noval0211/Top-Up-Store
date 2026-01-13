import { api } from "@/lib/api/axios";

export const orderProduct = async (productPackId, productPackName, paymentMethod) => {
    try {
        const response = await api.post('/payment/create', {
            productPackId,
            productPackName,
            method: paymentMethod
        });
        return response.data;
    } catch (error) {
        console.error("Error ordering product:", error);
        throw error;
    }
}  