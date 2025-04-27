import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Alertas.css';

export default function Alertas() {
  const [alertas, setAlertas] = useState([]);

  useEffect(() => {
    const productosSimulados = [
      { id: 1, nombre: 'Tornillos', cantidad: 5, ventas: 2 },
      { id: 2, nombre: 'Tuercas', cantidad: 0, ventas: 20 },
      { id: 3, nombre: 'Arandelas', cantidad: 15, ventas: 0 },
      { id: 4, nombre: 'Clavos', cantidad: 3, ventas: 12 },
      { id: 5, nombre: 'Bisagras', cantidad: 50, ventas: 30 },
    ];

    const nuevasAlertas = productosSimulados.map((producto) => {
      if (producto.cantidad === 0 && producto.ventas > 10) {
        return {
          tipo: 'negativa',
          mensaje: `❗ El producto "${producto.nombre}" se agotó demasiado rápido.`,
        };
      }
      if (producto.cantidad <= 5) {
        return {
          tipo: 'negativa',
          mensaje: `⚠️ Queda muy poco stock de "${producto.nombre}".`,
        };
      }
      if (producto.ventas === 0) {
        return {
          tipo: 'negativa',
          mensaje: `🛑 El producto "${producto.nombre}" no se está vendiendo.`,
        };
      }
      if (producto.ventas > 25) {
        return {
          tipo: 'positiva',
          mensaje: `✅ ¡El producto "${producto.nombre}" tiene excelente rotación!`,
        };
      }
      return {
        tipo: 'positiva',
        mensaje: `👌 Stock y ventas de "${producto.nombre}" están equilibrados.`,
      };
    });

    setAlertas(nuevasAlertas);
  }, []);

  return (
    <div className="alertas-container">
      <h1>📢 Alertas Inteligentes de Inventario 📢</h1>
      {alertas.length === 0 ? (
        <p className="sin-alertas">No hay alertas disponibles.</p>
      ) : (
        <div className="alertas-lista">
          {alertas.map((alerta, index) => (
            <div
              key={index}
              className={`alerta-card ${
                alerta.tipo === 'positiva' ? 'alerta-positiva' : 'alerta-negativa'
              }`}
            >
              <p>{alerta.mensaje}</p>
              <Link to="/administrar" className="btn-atender">
                Atender
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
