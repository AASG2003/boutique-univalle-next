import React from 'react';
import ProductTable from '@/components/ProductTable';
import Link from 'next/link';
// import CreateProductForm from '@/components/CreateProductForm';


const productsPage = () => {
    return (
      <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">Productos</h1>
            <Link href="/protected/products/create">
              Crear Nuevo
            </Link>
            <ProductTable />
        </div>
    );
  };

export default productsPage;
  