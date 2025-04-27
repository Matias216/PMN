import React, { useState } from 'react';
import './AdministrarInventario.css';

export default function AdministrarInventario() {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [editando, setEditando] = useState(null);
  const [mensaje, setMensaje] = useState('');

  const calcularEstado = (cantidad) => {
    if (cantidad === 0) return 'Agotado';
    if (cantidad < 10) return 'Bajo';
    return 'En stock';
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre.trim() || !cantidad.trim()) {
      setMensaje('Por favor completa todos los campos.');
      return;
    }

    if (editando !== null) {
      const nuevosProductos = productos.map((producto) =>
        producto.id === editando
          ? { ...producto, nombre, cantidad: parseInt(cantidad), estado: calcularEstado(parseInt(cantidad)) }
          : producto
      );
      setProductos(nuevosProductos);
      setMensaje('Producto actualizado correctamente.');
    } else {
      const nuevoProducto = {
        id: Date.now(),
        nombre,
        cantidad: parseInt(cantidad),
        estado: calcularEstado(parseInt(cantidad))
      };
      setProductos([...productos, nuevoProducto]);
      setMensaje('Producto agregado correctamente.');
    }

    setNombre('');
    setCantidad('');
    setEditando(null);
  };

  const handleEditar = (producto) => {
    setNombre(producto.nombre);
    setCantidad(producto.cantidad);
    setEditando(producto.id);
    setMensaje('Editando producto...');
  };

  const handleEliminar = (id) => {
    const nuevosProductos = productos.filter((producto) => producto.id !== id);
    setProductos(nuevosProductos);
    setMensaje('Producto eliminado correctamente.');
  };

  return (
    <div className="admin-container">
      <h1>Administrar Inventario</h1>

      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre del Producto</label>
          <input
            type="text"
            id="nombre"
            placeholder="Ej: Tornillos"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="cantidad">Cantidad</label>
          <input
            type="number"
            id="cantidad"
            placeholder="Ej: 100"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
          />
        </div>
        <button type="submit" className="admin-btn">
          {editando !== null ? 'Actualizar Producto' : 'Agregar Producto'}
        </button>
      </form>

      {mensaje && <p className="mensaje">{mensaje}</p>}

      <div className="productos-lista">
        <h2>Productos Agregados</h2>
        {productos.length === 0 ? (
          <p>No hay productos en el inventario.</p>
        ) : (
          <table className="productos-tabla">
            <thead>
              <tr>
                <th>ID</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr key={producto.id}>
                  <td>{producto.id}</td>
                  <td>{producto.nombre}</td>
                  <td>{producto.cantidad}</td>
                  <td>{producto.estado}</td>
                  <td>
                    <button
                      className="btn-editar"
                      onClick={() => handleEditar(producto)}
                      title="Editar"
                    >
                      ✏️
                    </button>
                    <button
                      className="btn-eliminar"
                      onClick={() => handleEliminar(producto.id)}
                      title="Eliminar"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
