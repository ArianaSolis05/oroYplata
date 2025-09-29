import { useState } from "react"
import "../styles/Login.css"
import { Link, useNavigate } from 'react-router-dom'
import { getData } from "../services/fetch"



function Login() {
  const [correoUsuario,setCorreoUsuario] = useState("")
  const [claveUsuario,setClaveUsuario]= useState("")
  const navigate = useNavigate()
    async function validarUsuario() {
       const usuariosRegistrados = await getData("usuarios")

       const validarUsuario = usuariosRegistrados.find((usuario)=>usuario.correo === correoUsuario && usuario.clave === claveUsuario && usuario.tipoUsuario === "usuario")

        const validarAdmin = usuariosRegistrados.find((usuario)=>usuario.correo === correoUsuario && usuario.clave === claveUsuario && usuario.tipoUsuario === "admin")

        console.log(validarAdmin);
        
        
        if (validarUsuario) {
          navigate("/principal")
        }else{
          if (validarAdmin) {
               navigate("/admin")
          }else{
            console.log("Error");
            
          }
        }


    }

  return (
    <div>
<form className="login-card">
  <h2 className="login-title">Iniciar sesión</h2>
  <p className="login-sub">Bienvenido de nuevo</p>

  <div className="input-row">
    <label>
      <input type="email" name="email" placeholder=" " required onChange={(e)=>setCorreoUsuario(e.target.value)} />
      <span className="label-text">Correo electrónico</span>
    </label>
  </div>

  <div className="input-row">
    <label>
      <input type="password" name="password" placeholder=" " required onChange={(e)=>setClaveUsuario(e.target.value)} />
      <span className="label-text">Contraseña</span>
    </label>
  </div>

  <button className="login-btn" type="button" onClick={validarUsuario} >Ingresar</button>
  

  <p className="login-foot">¿No tienes cuenta? <Link to ="/Formulario">Regístrate</Link></p>
</form>
      
    </div>
  )
}

export default Login
