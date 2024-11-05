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
    name: z.string().min(1, "Product name is required").max(100, "Name is too long"),
    unitPrice: z.number().positive("Unit price must be positive").max(99999, "Price too high"),
    image: z
        .any()
        .refine((file) => file instanceof File, "Image file is required")
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
        formData.append('unitPrice', data.unitPrice.toString());
        if (imageFile) {
            formData.append('file', imageFile);
        }
        console.log(imageFile?.name)
        try {
            await productService.createProduct(formData);
            router.push('/products');
        } catch (error) {
            console.error('Error creating product:', error);
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
                    <Label htmlFor="name">Product Name</Label>
                    <FormControl>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Enter product name"
                            {...register('name')}
                        />
                    </FormControl>
                    {errors.name && <FormMessage>{errors.name.message}</FormMessage>}
                </FormItem>

                <FormItem>
                    <Label htmlFor="unitPrice">Unit Price</Label>
                    <FormControl>
                        <Input
                            id="unitPrice"
                            type="number"
                            placeholder="Enter unit price"
                            {...register('unitPrice', { valueAsNumber: true })}
                        />
                    </FormControl>
                    {errors.unitPrice && <FormMessage>{errors.unitPrice.message}</FormMessage>}
                </FormItem>

                <FormItem>
                    <Label htmlFor="image">Product Image</Label>
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
                    {isLoading ? 'Creating...' : 'Create Product'}
                </Button>
            </form>
        </FormProvider>
    );
};

export default CreateProductForm;
