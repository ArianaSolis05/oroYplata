import React from "react";
import "../styles/carrito.css";
import { postData } from "../services/fetch";

const Carrito = ({ carrito, setCarrito }) => {

  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter((item) => item.id !== id));
  }
  async function comprar() {
    console.log("acaaa");
    
    const datosCompra = JSON.parse(localStorage.getItem("carrito"))
    const datosUsuario = JSON.parse(localStorage.getItem("usuario"))
    const objCompra = {
        productos: datosCompra,
        idUsuario: datosUsuario.id,
        correoUsuario: datosUsuario.correo
    }

    const peticion = await postData(objCompra,"carrito")
    console.log(peticion);
    
  }
    
  return (
    <aside className="cart-panel">
      <h3>Carrito de Compras</h3>
      {carrito.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <div className="cart-items">
          {carrito.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.imgProducto} alt={item.nombreProducto} className="cart-img" />
              <span>{item.nombreProducto}</span>
              <strong>₡{item.precioProducto}</strong>
              <button onClick={() => eliminarDelCarrito(item.id)}>Eliminar</button>
            </div>
          ))}
          <button onClick={comprar} className="btn-comprar-todo">Comprar Todo</button>
        </div>
      )}
    </aside>
  )
}

export default Carrito;

