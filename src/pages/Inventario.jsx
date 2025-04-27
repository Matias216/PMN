import React from 'react';
import './Inventario.css';

const productos = [
  { id: 1, nombre: 'Tornillos', cantidad: 120 },
  { id: 2, nombre: 'Tuercas', cantidad: 45 },
  { id: 3, nombre: 'Arandelas', cantidad: 0 },
  { id: 4, nombre: 'Clavos', cantidad: 8 },
  { id: 5, nombre: 'Bisagras', cantidad: 30 },
];

export default function Inventario() {
  return (
    <div className="inv-container">
      <h1>Inventario de Productos</h1>
      <table className="inv-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id} className={p.cantidad === 0 ? 'agotado' : p.cantidad < 10 ? 'bajo' : ''}>
              <td>{p.id}</td>
              <td>{p.nombre}</td>
              <td>{p.cantidad}</td>
              <td>
                {p.cantidad === 0
                  ? 'Agotado'
                  : p.cantidad < 10
                  ? 'Bajo'
                  : 'En stock'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
