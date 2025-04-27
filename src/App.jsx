import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Inventario from './pages/Inventario';
import AdministrarInventario from './pages/AdministrarInventario';
import Alertas from './pages/Alertas';
import AsistenciaIA from './pages/AsistenciaIA';
import './App.css';


export default function App() {
  return (
    <Router>
      <div className="app-container">
        <aside className="sidebar">
          <nav>
            <ul>
              <li>
                <Link to="/">
                  🏠 <span className="link-text">Login</span>
                </Link>
              </li>
              <li>
                <Link to="/inventario">
                  📦 <span className="link-text">Inventario</span>
                </Link>
              </li>
              <li>
                <Link to="/administrar">
                  ✏️ <span className="link-text">Administrar</span>
                </Link>
              </li>
              <li>
                <Link to="/alertas">
                  🚨 <span className="link-text">Alertas</span>
                </Link>
              </li>
              <li>
                <Link to="/ia">
                  🤖 <span className="link-text">Asistencia IA</span>
                </Link>
              </li>
            </ul>
          </nav>
          <div className="user-icon">
            <Link to="/configuracion">
              ⚙️ <span className="link-text">Configuración</span>
            </Link>
          </div>
        </aside>
        <main className="content">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/inventario" element={<Inventario />} />
            <Route path="/administrar" element={<AdministrarInventario />} />
            <Route path="/alertas" element={<Alertas />} />
            <Route path="/ia" element={<AsistenciaIA />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
