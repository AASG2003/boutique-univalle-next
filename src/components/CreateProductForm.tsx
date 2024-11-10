"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import productService from '../services/productService';
import {
    Form,
    FormField,
    FormItem,
    FormControl,
    FormMessage,
} from './ui/form';

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';


const productSchema = z.object({
    name: z.string().min(1, "EL nombre del producto es requerido").max(100, "El nombre es muy largo"),
    unitPrice: z.number().multipleOf(0.01).positive("El precio unitario debe ser positivo").max(99999, "El Precio es muy alto"),
    image: z
        .any()
        .refine((file) => file instanceof File, "Archivo de imagen es obligatorio")
        .optional()
});

type ProductFormData = z.infer<typeof productSchema>;

const CreateProductForm: React.FC = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const formMethods = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
    });

    const { register, handleSubmit, formState: { errors } } = formMethods;

    const onSubmit = async (data: ProductFormData) => {
        setIsLoading(true);

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('unitPrice', data.unitPrice.toFixed(2));
        console.log(formData.get('unitPrice') + "component")
        if (imageFile) {
            formData.append('file', imageFile);
        }
        try {
            await productService.createProduct(formData);
            router.refresh()
        } catch (error) {
            console.error('Error al crear un producto:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImageFile(e.target.files[0]);
            formMethods.setValue('image', e.target.files[0]); // Establecer el valor en react-hook-form
        } else {
            setImageFile(null);
            formMethods.setValue('image', undefined); // Limpiar el valor en caso de no seleccionar un archivo
        }
    };

    return (
        <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormItem>
                    <Label htmlFor="name">Nombre del producto</Label>
                    <FormControl>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Inserte un nombre del producto"
                            {...register('name')}
                        />
                    </FormControl>
                    {errors.name && <FormMessage>{errors.name.message}</FormMessage>}
                </FormItem>

                <FormItem>
                    <Label htmlFor="UnitPrice">Precio unitario</Label>
                    <FormControl>
                        <Input
                            id="unitPrice"
                            type="number"
                            step="any"
                            placeholder="Inserte el precio unitario"
                            {...register('unitPrice', { valueAsNumber: true })}
                        />
                    </FormControl>
                    {errors.unitPrice && <FormMessage>{errors.unitPrice.message}</FormMessage>}
                </FormItem>

                <FormItem>
                    <Label htmlFor="image">Imagen del producto</Label>
                    <FormControl>
                        <Input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </FormControl>
                    {errors.image && <FormMessage>{errors.image.message}</FormMessage>}
                </FormItem>

                <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Creando...' : 'Producto creado'}
                </Button>
            </form>
        </FormProvider>
    );
};

export default CreateProductForm;
