// services/productService.ts
import axios from 'axios';
import { getSession } from 'next-auth/react';

// Define la URL base de tu API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL+"/tienda/product";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'ngrok-skip-browser-warning': 'true', // Agregar este encabezado para evitar el warningt
    }
  });

  api.interceptors.request.use(async (config) => {
    const session = await getSession();
    if (session?.accessToken) {
      config.headers['Authorization'] = `Bearer ${session.accessToken}`;
    }
    return config;
  });
  
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
        const response = await api.post(`${API_BASE_URL}/create`, data);
        console.log(response.data.unitPrice);
        return response.data;
    },

    async fetchAllProducts(): Promise<Product[]> {
        const response = await api.get(`${API_BASE_URL}/findAll`);
        return response.data;
    },

    async fetchProductById(id: number): Promise<Product> {
        const response = await api.get(`${API_BASE_URL}/findOne/${id}`);
        return response.data;
    },

    async fetchProductByIdWithImage(id: number): Promise<ProductWithImage> {
        const response = await api.get(`${API_BASE_URL}/fetchByIdWithImage/${id}`);
        return response.data;
    },

    async updateProduct(id: number, data: Partial<Product>): Promise<Product> {
        const response = await api.patch(`${API_BASE_URL}/updateOne/${id}`, data);
        return response.data;
    },

    async deleteProduct(id: number): Promise<Product> {
        const response = await api.delete(`${API_BASE_URL}/deleteOne/${id}`);
        return response.data;
    }
};

export default productService;
