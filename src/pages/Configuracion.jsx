import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Configuracion.css";

const Configuracion = () => {
  const [nombre, setNombre] = useState("Juan");
  const [apellido, setApellido] = useState("Pérez");
  const [usuario, setUsuario] = useState("usuario_demo");
  const [email, setEmail] = useState("demo@ejemplo.com");
  const [telefono, setTelefono] = useState("+54 123456789");
  const [pais, setPais] = useState("Argentina");
  const [idioma, setIdioma] = useState("Español");
  const [imagen, setImagen] = useState(null);
  const [confirmMsg, setConfirmMsg] = useState("");
  const navigate = useNavigate();

  const handleGuardar = () => {
    setConfirmMsg("✅ Datos guardados correctamente");
    setTimeout(() => setConfirmMsg(""), 3000);
  };

  const handleCerrarSesion = () => {
    alert("Sesión cerrada correctamente");
    navigate("/");
  };

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImagen(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="config-page">
      <div className="config-card">
        <div className="config-header">
          <h2>Configuración de Usuario</h2>
          {imagen && <img src={imagen} alt="Perfil" className="profile-img" />}
        </div>

        <label>Nombre:</label>
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />

        <label>Apellido:</label>
        <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />

        <label>Nombre de usuario:</label>
        <input type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} />

        <label>Correo electrónico:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Número telefónico:</label>
        <input type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} />

        <label>País de origen:</label>
        <input type="text" value={pais} onChange={(e) => setPais(e.target.value)} />

        <label>Idioma:</label>
        <select value={idioma} onChange={(e) => setIdioma(e.target.value)}>
          <option>Español</option>
          <option>Inglés</option>
          <option>Portugués</option>
          <option>Francés</option>
        </select>

        <label>Imagen de perfil:</label>
        <input type="file" accept="image/*" onChange={handleImagenChange} />

        <div className="config-buttons">
          <button className="btn-primary" onClick={handleGuardar}>Guardar Cambios</button>
          <button className="btn-danger" onClick={handleCerrarSesion}>Cerrar Sesión</button>
        </div>

        {confirmMsg && <p className="confirm-msg">{confirmMsg}</p>}
      </div>
    </div>
  );
};

export default Configuracion;
