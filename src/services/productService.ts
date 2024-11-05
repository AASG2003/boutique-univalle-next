// services/productService.ts
import axios from 'axios';

// Define la URL base de tu API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL+"/tienda/product";

// Define la interfaz para un producto
export interface Product {
    idproducts: number;
    name: string;
    imageUrl: string;
    unitPrice: number;
    is_deleted: number;
}

// Define la interfaz para la respuesta de la imagen
export interface ProductWithImage {
    product: Product;
    image: string; // Base64 image string
}

const productService = {
    async createProduct(data: FormData): Promise<Product> {
        console.log(API_BASE_URL)
        const response = await axios.post(`${API_BASE_URL}/create`, data);
        return response.data;
    },

    async fetchAllProducts(): Promise<Product[]> {
        const response = await axios.get(`${API_BASE_URL}/findAll`);
        return response.data;
    },

    async fetchProductById(id: number): Promise<Product> {
        const response = await axios.get(`${API_BASE_URL}/findOne/${id}`);
        return response.data;
    },

    async fetchProductByIdWithImage(id: number): Promise<ProductWithImage> {
        const response = await axios.get(`${API_BASE_URL}/fetchByIdWithImage/${id}`);
        return response.data;
    },

    async updateProduct(id: number, data: Partial<Product>): Promise<Product> {
        const response = await axios.patch(`${API_BASE_URL}/updateOne/${id}`, data);
        return response.data;
    },

    async deleteProduct(id: number): Promise<Product> {
        const response = await axios.delete(`${API_BASE_URL}/deleteOne/${id}`);
        return response.data;
    }
};

export default productService;