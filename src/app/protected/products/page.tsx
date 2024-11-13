import React from 'react';
import ProductTable from '@/components/ProductTable';
import CreateProductForm
  from "@/app/protected/products/components/createProductForm";
// import CreateProductForm from '@/components/CreateProductForm';


const productsPage = () => {
    return (
      <div className="flex flex-col gap-4 p-4 pt-0">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold mb-4">Productos</h1>

          <CreateProductForm/>
        </div>

        <ProductTable/>
      </div>
    );
};

export default productsPage;
  