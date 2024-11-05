"use client"
import React, { useEffect, useState } from 'react';
import productService, { Product } from '../services/productService';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

const ProductTable: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await productService.fetchAllProducts();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleEdit = (id: number) => {
        // Redirigir a la página de edición
        router.push(`/products/edit/${id}`);
    };

    const handleOpenDeleteDialog = (product: Product) => {
        setSelectedProduct(product);
        setIsDeleteDialogOpen(true);
    };

    const handleCloseDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
        setSelectedProduct(null);
    };

    const handleDelete = async () => {
        if (selectedProduct) {
            try {
                await productService.deleteProduct(selectedProduct.idproducts);
                setProducts(products.filter(product => product.idproducts !== selectedProduct.idproducts));
            } catch (error) {
                console.error('Error deleting product:', error);
            } finally {
                handleCloseDeleteDialog();
            }
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (products.length === 0) {
        return <div>No products found.</div>;
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Unit Price</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {products.map((product) => (
                    <TableRow key={product.idproducts}>
                        <TableCell>{product.idproducts}</TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.UnitPrice}</TableCell>
                        <TableCell>
                            <Button onClick={() => handleEdit(product.idproducts)}>Edit/View</Button>
                            <Button variant="destructive" onClick={() => handleOpenDeleteDialog(product)}>Delete</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                        <p>Are you sure you want to delete this product? This action cannot be undone.</p>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={handleCloseDeleteDialog}>Cancel</Button>
                        <Button variant="destructive" onClick={handleDelete}>Confirm</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Table>
    );
};

export default ProductTable;
