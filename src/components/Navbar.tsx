"use client"; // Asegúrate de que sea un componente de cliente si usas estado

import { Button } from '@/components/ui/button'; // Ajusta la ruta según tu estructura
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'; // Importa los componentes necesarios
import { signOut } from 'next-auth/react';
import Link from 'next/link';

export const Navbar = () => {
    const handleLogout = async () => {
        await signOut({ redirect: false}); // Redirige a la página principal después de cerrar sesión
      };
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-lg font-bold text-white">
          Mi Aplicación
        </Link>
        <div className="flex space-x-4">
          <Link href="/" className="text-white hover:text-gray-300">
            Inicio
          </Link>
          <Link href="/about" className="text-white hover:text-gray-300">
            Acerca de
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="text-white">
                Productos
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Link href="/products" className="dropdown-item">
                <DropdownMenuItem>Todos los Productos</DropdownMenuItem>
              </Link>
              <Link href="/products/new" className="dropdown-item">
                <DropdownMenuItem>Agregar Producto</DropdownMenuItem>
              </Link>
              {/* Agrega más elementos al menú desplegable según sea necesario */}
            </DropdownMenuContent>
          </DropdownMenu>
          <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
        </div>
      </div>
    </nav>
  );
};
