import React from "react";
import "../styles/carrito.css";

const Carrito = ({ carrito, setCarrito, comprarTodo }) => {

  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter((item) => item.id !== id));
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
              <strong>${item.precioProducto}</strong>
              <button onClick={() => eliminarDelCarrito(item.id)}>Eliminar</button>
            </div>
          ))}
          <button onClick={comprarTodo} className="btn-comprar-todo">Comprar Todo</button>
        </div>
      )}
    </aside>
  )
}

export default Carrito;

