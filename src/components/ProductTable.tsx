"use client"
import React, { useEffect, useState } from 'react';
import productService, { Product} from '../services/productService';
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
import {Ellipsis, Pencil, Trash} from "lucide-react";
import UpdateProductForm from '@/app/protected/products/components/updateProductForm';

const ProductTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [updateSheet, setUpdateSheet] = useState<boolean>(false);
  const [idProduct, setIdProduct] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("data")
        const data = await productService.fetchAllProducts();
        setProducts(data);
        console.log("prueba");
        console.log(data.length)
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleEdit = (id: number) => {
    setIdProduct(id);
    setUpdateSheet(true);
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

  if (products.length === 0) {
    return <h2>No se encontraron productos</h2>;
  }

  return (
    <section className="border rounded-lg">
      <UpdateProductForm idProduct={idProduct} sheetOpen={updateSheet}/>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Precio Unitario</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.idproducts}>
              <TableCell>{product.idproducts}</TableCell>
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
                      <Pencil />
                      <span>Editar</span>
                      {/*<Button variant="outline" onClick={() => handleEdit(product.idproducts)}>Editar</Button>*/}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleOpenDeleteDialog(product)}>
                      <Trash />
                      <span>Eliminar</span>
                      {/*<Button variant="destructive" >Eliminar</Button>*/}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>


              </TableCell>
            </TableRow>
          ))}
        </TableBody>
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
      </Table>
    </section>

  );
};

export default ProductTable;
