import React, { useState, useEffect } from 'react';
import './AsistenciaIA.css';

export default function AsistenciaIA() {
  const [productos, setProductos] = useState([]);

  // Simulación de predicción de demanda
  useEffect(() => {
    const productosSimulados = [
      { id: 1, nombre: 'Tornillos', ventas: 10, prediccion: 'Aumento' },
      { id: 2, nombre: 'Tuercas', ventas: 5, prediccion: 'Bajo' },
      { id: 3, nombre: 'Arandelas', ventas: 20, prediccion: 'Estable' },
      { id: 4, nombre: 'Clavos', ventas: 2, prediccion: 'Aumento' },
      { id: 5, nombre: 'Bisagras', ventas: 30, prediccion: 'Estable' },
    ];
    setProductos(productosSimulados);
  }, []);

  return (
    <div className="asistencia-container">
      <h1>Predicciones de Demanda – Asistencia Simulada IA</h1>

      {productos.map((producto) => (
        <div key={producto.id} className="producto-prediccion">
          <h2>{producto.nombre}</h2>

          <div className="mensaje-prediccion">
            {producto.prediccion === 'Aumento' ? (
              <p className="sube">🔼 La demanda está en aumento.</p>
            ) : producto.prediccion === 'Bajo' ? (
              <p className="baja">🔽 La demanda está disminuyendo.</p>
            ) : (
              <p className="estable">➡️ La demanda se mantiene estable.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
