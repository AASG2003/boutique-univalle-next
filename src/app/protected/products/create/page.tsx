import React from 'react';
import Link from 'next/link';
import CreateProductForm from '@/components/CreateProductForm';

const productsPage = () => {
    return (
      <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">Productos</h1>
            <Link href="/protected/products/create">
              Crear Nuevo
            </Link>

            <CreateProductForm/>
        </div>
    );
  };
  
export default productsPage;
  