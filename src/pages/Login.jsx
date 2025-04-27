import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate
import './Login.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Hook para la redirección

  const handleLogin = (e) => {
    e.preventDefault();

    // Validación simple de los campos
    if (!username || !password) {
      setError('Por favor, ingresa usuario y contraseña');
      return;
    }

    // Simulación de login (puedes agregar lógica de autenticación aquí)
    console.log('Login realizado con:', username, password);
    setError(''); // Limpiar error si el login es correcto

    // Redirigir a Inventario después de login
    navigate('/inventario'); // Redirección a Inventario
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Iniciar sesión</h1>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="username">Usuario</label>
            <input
              type="text"
              id="username"
              placeholder="Ingresa tu usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-btn">Iniciar sesión</button>
        </form>
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
}
