import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Inventario from './pages/Inventario';
import AdministrarInventario from './pages/AdministrarInventario';
import Alertas from './pages/Alertas';
import AsistenciaIA from './pages/AsistenciaIA';

function App() {
  return (
    <Router>
      <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', background: '#f0f0f0' }}>
        <Link to="/">Login</Link>
        <Link to="/inventario">Inventario</Link>
        <Link to="/administrar">Administrar</Link>
        <Link to="/alertas">Alertas</Link>
        <Link to="/ia">IA</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/inventario" element={<Inventario />} />
        <Route path="/administrar" element={<AdministrarInventario />} />
        <Route path="/alertas" element={<Alertas />} />
        <Route path="/ia" element={<AsistenciaIA />} />
      </Routes>
    </Router>
  );
}

export default App;
