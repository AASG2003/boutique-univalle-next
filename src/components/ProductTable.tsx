"use client"
import React, { useEffect, useState } from 'react';
import productService, { Product } from '../services/productService';
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from './ui/dialog';
import { Ellipsis, Pencil, Trash } from 'lucide-react';
import UpdateProductForm from '@/app/protected/products/components/updateProductForm';

const ProductTable: React.FC = () => {
  // State declarations
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [updateSheet, setUpdateSheet] = useState<boolean>(false);
  const [idProduct, setIdProduct] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Fetch products on component mount
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

  // Handler for edit button click
  const handleEdit = (id: number) => {
    setIdProduct(id);
    setUpdateSheet(true);
  };

  // Handler for delete dialog open
  const handleOpenDeleteDialog = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteDialogOpen(true);
  };

  // Handler for delete dialog close
  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setSelectedProduct(null);
  };

  // Handler for product deletion
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

  // New handler for sheet open state
  const handleSheetOpenChange = (open: boolean) => {
    setUpdateSheet(open);
    if (!open) {
      setIdProduct(0); // Reset idProduct when sheet is closed
    }
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="flex flex-col">
        <Skeleton className="h-[125px] w-full rounded-xl"/>
        <div className="pt-2 space-y-2">
          <Skeleton className="h-8 w-full "/>
          <Skeleton className="h-8 w-full "/>
          <Skeleton className="h-8 w-full "/>
          <Skeleton className="h-8 w-full "/>
          <Skeleton className="h-8 w-full "/>
        </div>
      </div>
    );
  }

  // No products found
  if (products.length === 0) {
    return <h2>No se encontraron productos</h2>;
  }

  // Render product table
  return (
    <section className="border rounded-lg">
      <UpdateProductForm 
        idProduct={idProduct} 
        sheetOpen={updateSheet}
        onOpenChange={handleSheetOpenChange} // New prop for handling sheet state
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Precio Unitario</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.idproducts}>
              <TableCell>{product.name}</TableCell>
              <TableCell><span>Bs. </span>{product.unitPrice}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Ellipsis />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleEdit(product.idproducts)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      <span>Editar</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleOpenDeleteDialog(product)}>
                      <Trash className="mr-2 h-4 w-4" />
                      <span>Eliminar</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {/* Delete confirmation dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Eliminar Producto?</DialogTitle>
            <p>Esta acción no se puede deshacer.</p>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDeleteDialog}>Cancelar</Button>
            <Button variant="destructive" onClick={handleDelete}>Eliminar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProductTable;

