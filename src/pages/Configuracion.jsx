import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import "./Configuracion.css";

const Configuracion = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [pais, setPais] = useState("");
  const [idioma, setIdioma] = useState("Español");
  const [imagen, setImagen] = useState(null);
  const [confirmMsg, setConfirmMsg] = useState("");
  const [uid, setUid] = useState(null);
  const navigate = useNavigate();

  // Cargar datos desde Firestore
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUid(user.uid);
      setEmail(user.email); // ya viene de Auth

      const userRef = doc(db, "usuarios", user.uid);
      getDoc(userRef).then((docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setNombre(data.nombre || "");
          setApellido(data.apellido || "");
          setUsuario(data.usuario || "");
          setTelefono(data.telefono || "");
          setPais(data.pais || "");
          setIdioma(data.idioma || "Español");
          setImagen(data.imagen || null);
        }
      });
    }
  }, []);

  const handleGuardar = async () => {
    if (!uid) return;

    const userRef = doc(db, "usuarios", uid);
    const newData = {
      nombre,
      apellido,
      usuario,
      email,
      telefono,
      pais,
      idioma,
      imagen,
    };

    try {
      await setDoc(userRef, newData, { merge: true });
      setConfirmMsg("✅ Datos guardados correctamente");
      setTimeout(() => setConfirmMsg(""), 3000);
    } catch (error) {
      console.error("Error al guardar configuración:", error);
      setConfirmMsg("❌ Error al guardar");
    }
  };

  const handleCerrarSesion = async () => {
    await signOut(auth);
    navigate("/login");
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
        <input type="email" value={email} disabled />

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
