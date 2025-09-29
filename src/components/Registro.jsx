import { useEffect, useState } from "react";
import "../styles/Registro.css";
import { Link } from "react-router-dom";
import { postData } from "../services/fetch";
function Registro() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [mensaje, setMensaje] = useState("");

  async function datosUsuario() {
    if (nombre == "" || correo == "" || clave == "") {
      setMensaje("Llene los espacios en blanco");
      return
    }

    const Usuario = {
      nombre: nombre,
      correo: correo,
      clave: clave,
      tipoUsuario: "usuario",
    };
    await postData(Usuario, "usuarios");
  }

  useEffect(()=>{
     setTimeout(() => {
        setMensaje("")
     }, 1500);
  },[mensaje])

  return (
    <div className="contenedor-registro">
      <form className="cuadro">
        <h2 className="titulo-crear-cuenta">Crear cuenta</h2>
        <p className="regístrarse">Regístrate</p>

        <div className="input">
          <label>
            <input
              type="text"
              name="name"
              placeholder=""
              onChange={(e) => setNombre(e.target.value)}
            />
            <span className="label">Nombre completo</span>
          </label>
        </div>

        <div className="input">
          <label>
            <input
              type="email"
              name="email"
              placeholder=""
              onChange={(e) => setCorreo(e.target.value)}
            />
            <span className="label">Correo electrónico</span>
          </label>
        </div>

        <div className="input">
          <label>
            <input
              type="password"
              name="password"
              placeholder=""
              onChange={(e) => setClave(e.target.value)}
            />
            <span className="label">Contraseña</span>
          </label>
        </div>

        <button className="btn" type="submit" onClick={datosUsuario}>
          Crear cuenta
        </button>

        <p className="tienes-cuenta">
          ¿Ya tienes cuenta? <Link to={"/"}>Inicia sesión</Link>
        </p>
      </form>
      <div>
        <p>{mensaje}</p>
      </div>
    </div>
  );
}

export default Registro;
