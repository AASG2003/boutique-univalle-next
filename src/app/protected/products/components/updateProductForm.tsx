"use client"

import productService, { Product } from '@/services/productService';
import React, { useEffect, useState, useCallback } from 'react';
import { z } from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { toast } from "sonner"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area"

// Zod schema for form validation
const productSchema = z.object({
  name: z.string().min(1, "El nombre del producto es requerido").max(100, "El nombre es muy largo"),
  unitPrice: z.number().multipleOf(0.1).positive("El precio unitario debe ser positivo").max(99999, "El Precio es muy alto"),
  image: z
    .any()
    .refine((file) => file instanceof File, "Archivo de imagen es obligatorio")
    .optional()
});

type ProductFormData = z.infer<typeof productSchema>;

// Updated props interface to include onOpenChange
interface UpdateProductFormProps {
  idProduct: number;
  sheetOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const UpdateProductForm: React.FC<UpdateProductFormProps> = ({ idProduct, sheetOpen, onOpenChange }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const formMethods = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  // Fetch product data when idProduct changes
  const fetchProduct = useCallback(async () => {
    try {
      const response = await productService.fetchProductByIdWithImage(idProduct);
      setProduct(response.product);
      setImageSrc(response.image);
      // Set form values after fetching product data
      formMethods.reset({
        name: response.product.name,
        unitPrice: response.product.unitPrice,
        image: undefined
      });
    } catch (error) {
      console.error("Error al obtener el producto:", error);
    }
  }, [idProduct, formMethods]);

  useEffect(() => {
    if (idProduct) {
      fetchProduct();
      // Reset form values when idProduct changes
      formMethods.reset({
        name: '',
        unitPrice: 0,
        image: undefined
      });
    }
  }, [idProduct]);

  const { register, handleSubmit, formState: { errors } } = formMethods;

  // Form submission handler
  const onSubmit = async (data: ProductFormData) => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('unitPrice', data.unitPrice.toFixed(2));
    if (imageFile) {
      formData.append('file', imageFile);
    }

    try {
      await productService.updateProduct(idProduct, formData);
      toast("Producto Actualizado", {
        description: "El producto ha sido actualizado correctamente.",
      });
      onOpenChange(false); // Close the sheet after successful update
    } catch (error) {
      console.error('Error al actualizar un producto:', error);
      toast.error("Error", {
        description: "Error al actualizar el producto.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Image file change handler
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
      formMethods.setValue('image', e.target.files[0]);
    } else {
      setImageFile(null);
      formMethods.setValue('image', undefined);
    }
  };

  return (
    <Sheet open={sheetOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader className="mb-5">
          <SheetTitle>Actualizar Producto</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-8rem)] pr-4">
          <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <FormItem>
                <Label htmlFor="name">Nombre del producto</Label>
                <FormControl>
                  <Input
                    id="name"
                    type="text"
                    value={formMethods.watch('name')}
                    placeholder="Chaqueta Bomber"
                    {...register('name')}
                  />
                </FormControl>
                {errors.name && <FormMessage>{errors.name.message}</FormMessage>}
              </FormItem>

              <FormItem>
                <Label htmlFor="unitPrice">Precio unitario</Label>
                <FormControl>
                  <Input
                    id="unitPrice"
                    type="number"
                    step="any"
                    value={formMethods.watch('unitPrice')}
                    placeholder="Bs. 000"
                    {...register('unitPrice', { valueAsNumber: true })}
                  />
                </FormControl>
                {errors.unitPrice && <FormMessage>{errors.unitPrice.message}</FormMessage>}
              </FormItem>

              <FormItem>
                <Label htmlFor="image">Imagen del producto</Label>
                {imageSrc && (
                  <div className="relative w-full h-40 mb-4">
                    <Image 
                      src={imageSrc} 
                      alt="Imagen del producto" 
                      layout="fill" 
                      objectFit="contain"
                    />
                  </div>
                )}
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

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? 'Actualizando...' : 'Actualizar'}
              </Button>
            </form>
          </FormProvider>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

export default UpdateProductForm;

