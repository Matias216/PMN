// src/pages/AdministrarInventario.jsx
import React, { useEffect, useState } from "react";
import "./AdministrarInventario.css";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function AdministrarInventario() {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [mensaje, setMensaje] = useState("");

  const productosRef = collection(db, "productos");

  const calcularEstado = (cantidad) => {
    if (cantidad === 0) return "Agotado";
    if (cantidad < 10) return "Bajo";
    return "En stock";
  };

  const cargarProductos = async () => {
    const snapshot = await getDocs(productosRef);
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProductos(data);
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre.trim() || !cantidad.trim()) {
      setMensaje("Por favor completa todos los campos.");
      return;
    }

    const cantidadInt = parseInt(cantidad);
    const nuevoEstado = calcularEstado(cantidadInt);

    try {
      if (editandoId) {
        const productoRef = doc(db, "productos", editandoId);
        await updateDoc(productoRef, {
          nombre,
          cantidad: cantidadInt,
          estado: nuevoEstado,
        });
        setMensaje("Producto actualizado correctamente.");
      } else {
        await addDoc(productosRef, {
          nombre,
          cantidad: cantidadInt,
          estado: nuevoEstado,
        });
        setMensaje("Producto agregado correctamente.");
      }

      setNombre("");
      setCantidad("");
      setEditandoId(null);
      cargarProductos();
    } catch (error) {
      console.error("Error al guardar:", error);
      setMensaje("Ocurrió un error. Intenta nuevamente.");
    }
  };

  const handleEditar = (producto) => {
    setNombre(producto.nombre);
    setCantidad(producto.cantidad);
    setEditandoId(producto.id);
    setMensaje("Editando producto...");
  };

  const handleEliminar = async (id) => {
    try {
      await deleteDoc(doc(db, "productos", id));
      setMensaje("Producto eliminado correctamente.");
      cargarProductos();
    } catch (error) {
      console.error("Error al eliminar:", error);
      setMensaje("No se pudo eliminar.");
    }
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
          {editandoId ? "Actualizar Producto" : "Agregar Producto"}
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
              {productos.map((producto, index) => (
                <tr key={producto.id}>
                  <td>{index + 1}</td>
                  <td>{producto.nombre}</td>
                  <td>{producto.cantidad}</td>
                  <td>{producto.estado}</td>
                  <td>
                    <button
                      className="btn-editar"
                      onClick={() => handleEditar(producto)}
                      title="Editar"
                    >
                      ✏
                    </button>
                    <button
                      className="btn-eliminar"
                      onClick={() => handleEliminar(producto.id)}
                      title="Eliminar"
                    >
                      🗑
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
