// pages/products/create.tsx
import React from 'react';
import CreateProductForm from '../../components/CreateProductForm';

const CreateProductPage: React.FC = () => {
    return (
        <div className="container mx-auto my-8">
            <h1 className="text-2xl font-bold mb-4">Create New Product</h1>
            <CreateProductForm />
        </div>
    );
};

export default CreateProductPage;
