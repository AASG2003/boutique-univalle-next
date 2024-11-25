"use client"
import { Button } from "@/components/ui/button";

export default function NotFound() {

    return (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h1>404 - Page Not Found</h1>
            <p>Pagina no encontrada</p>
            <a href='/protected/products'>
                <Button>
                    Regresar
                </Button>
            </a>
        </div>
    );
}
