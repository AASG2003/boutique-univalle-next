"use client"

import React, { useState } from 'react';
import { z } from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import productService from '@/services/productService';

import { toast } from "sonner"

import {
  Sheet,
  SheetContent,
  SheetHeader, SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {PlusIcon} from "lucide-react";
import {FormControl, FormItem, FormMessage} from "@/components/ui/form";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";

const productSchema = z.object({
  name: z.string().min(1, "EL nombre del producto es requerido").max(100, "El nombre es muy largo"),
  unitPrice: z.number().multipleOf(0.1).positive("El precio unitario debe ser positivo").max(99999, "El Precio es muy alto"),
  image: z
    .any()
    .refine((file) => file instanceof File, "Archivo de imagen es obligatorio")
    .optional()
});

type ProductFormData = z.infer<typeof productSchema>;

export const CreateProductForm: React.FC = () =>  {

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
      toast("Producto creado", {
        description: "El producto ha sido creado correctamente.",
      })


    } catch (error) {
      console.log(error)
      console.error('Error al crear un producto:', error);
      toast.error("Error", {
        description: "Error al crear un producto:",
      })
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
    <Sheet>
      <SheetTrigger asChild>
        <Button className="hover:bg-green-600">
          <PlusIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader className="mb-5">
          <SheetTitle>Crea un nuevo producto</SheetTitle>
        </SheetHeader>
        <section>
          <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormItem>
                <Label htmlFor="name">Nombre del producto</Label>
                <FormControl>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Chaqueta Bomber"
                    {...register('name')}
                  />
                </FormControl>
                {errors.name && <FormMessage>{errors.name.message}</FormMessage>}
              </FormItem>

              <FormItem className="pt-4">
                <Label htmlFor="UnitPrice">Precio unitario</Label>
                <FormControl>
                  <Input
                    id="unitPrice"
                    type="number"
                    step="any"
                    placeholder="Bs. 000"
                    {...register('unitPrice', { valueAsNumber: true })}
                  />
                </FormControl>
                {errors.unitPrice && <FormMessage>{errors.unitPrice.message}</FormMessage>}
              </FormItem>

              <FormItem className="pt-4">
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
              <div className="pt-4">
                <Button type="submit" disabled={isLoading} >
                  {isLoading ? 'Creando...' : 'Crear'}
                </Button>
              </div>

            </form>
          </FormProvider>
        </section>
      </SheetContent>
    </Sheet>
  )
}

export default CreateProductForm;