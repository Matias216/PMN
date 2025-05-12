// src/pages/Registro.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import "./Registro.css";

const Registro = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [telefono, setTelefono] = useState("");
  const [pais, setPais] = useState("");
  const [idioma, setIdioma] = useState("Español");
  const [imagen, setImagen] = useState(null);
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");

  const navigate = useNavigate();

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImagen(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleRegistro = async (e) => {
    e.preventDefault();
    setError("");
    setExito("");

    if (!email || !contrasena || !nombre || !apellido) {
      setError("Completa todos los campos obligatorios");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, contrasena);
      const uid = userCredential.user.uid;

      await setDoc(doc(db, "usuarios", uid), {
        nombre,
        apellido,
        usuario,
        email,
        telefono,
        pais,
        idioma,
        imagen,
      });

      setExito("✅ Usuario registrado correctamente");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      console.error(err);
      setError("❌ Error al registrar. Intenta con otro correo.");
    }
  };

  return (
    <div className="registro-container">
      <form className="registro-form" onSubmit={handleRegistro}>
        <h1>Registro de Usuario</h1>

        <label>Nombre:</label>
        <input value={nombre} onChange={(e) => setNombre(e.target.value)} required />

        <label>Apellido:</label>
        <input value={apellido} onChange={(e) => setApellido(e.target.value)} required />

        <label>Nombre de usuario:</label>
        <input value={usuario} onChange={(e) => setUsuario(e.target.value)} />

        <label>Correo electrónico:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Contraseña:</label>
        <input type="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} required />

        <label>Teléfono:</label>
        <input value={telefono} onChange={(e) => setTelefono(e.target.value)} />

        <label>País:</label>
        <input value={pais} onChange={(e) => setPais(e.target.value)} />

        <label>Idioma:</label>
        <select value={idioma} onChange={(e) => setIdioma(e.target.value)}>
          <option>Español</option>
          <option>Inglés</option>
          <option>Portugués</option>
          <option>Francés</option>
        </select>

        <label>Imagen de perfil:</label>
        <input type="file" accept="image/*" onChange={handleImagenChange} />

        <button type="submit">Registrarse</button>

        {error && <p className="error">{error}</p>}
        {exito && <p className="success">{exito}</p>}
      </form>
    </div>
  );
};

export default Registro;
