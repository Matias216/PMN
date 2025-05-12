// src/pages/Inventario.jsx
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import "./Inventario.css";

export default function Inventario() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const productosRef = collection(db, "productos");
        const snapshot = await getDocs(productosRef);
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProductos(docs);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };

    cargarProductos();
  }, []);

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
          {productos.map((p, index) => (
            <tr
              key={p.id}
              className={
                p.cantidad === 0 ? "agotado" : p.cantidad < 10 ? "bajo" : ""
              }
            >
              <td>{index + 1}</td>
              <td>{p.nombre}</td>
              <td>{p.cantidad}</td>
              <td>
                {p.cantidad === 0
                  ? "Agotado"
                  : p.cantidad < 10
                  ? "Bajo"
                  : "En stock"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
