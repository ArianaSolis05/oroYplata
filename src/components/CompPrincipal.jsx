import React, { useEffect, useState } from 'react'
import { getData } from '../services/fetch' 
import "../styles/Inicio.css";

function CompPrincipal() {
  const [productos, setProductos] = useState([])
  const [anillos, setAnillos] = useState([])
  const [collares, setCollares] = useState([])
  const [pulseras, setPulseras] = useState([])
  const [aretes, setAretes] = useState([])

  /* 🔹 ESTADO DEL CARRITO */
  const [carrito, setCarrito] = useState([])

  useEffect(() => {
    async function cargarProductos() {
      const data = await getData("joyeria") 
      const filtroAnillos = data.filter((joya)=>joya.categoriaProducto === "anillos")
      const filtroCollares = data.filter((joya)=>joya.categoriaProducto === "collares")
      const filtroPulseras = data.filter((joya)=>joya.categoriaProducto === "pulseras")
      const filtroAretes = data.filter((joya)=>joya.categoriaProducto === "aretes")
      setAnillos(filtroAnillos)
      setCollares(filtroCollares)
      setAretes(filtroAretes)
      setPulseras(filtroPulseras)
      setProductos(data)
    }
    cargarProductos()
  }, [])

  /* 🔹 FUNCIONES DEL CARRITO */
  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto])
  }

  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter((item) => item.id !== id))
  }

  const comprarTodo = () => {
    if(carrito.length === 0) {
      alert("El carrito está vacío")
      return
    }
    alert(`Compra realizada: ${carrito.map(p => p.nombreProducto).join(", ")}`)
    setCarrito([])
  }

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Oro & Plata</h1>
        <nav>
          <ul>
            <li>Inicio</li>
            <li>Aretes</li>
            <li>Collares</li>
            <li>Anillos</li>
            <li>Contacto</li>
          </ul>
        </nav>
      </header>

      <section className="hero-section">
        <h2>Descubre nuestra colección exclusiva</h2>
      </section>

     
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
            <button onClick={comprarTodo} className="btn-comprar-todo">Comprar Todo</button> 
          </div>
        )}
      </aside>

      <section className="products-section">
        <h3>Productos</h3>

        <h3>Anillos</h3>
        <div className="product-grid">
          {anillos.map((p) => (
            <div key={p.id} className="product-card">
              <img src={p.imgProducto} alt={p.nombreProducto} />
              <h4>{p.nombreProducto}</h4>
              <p>{p.descripcionProducto}</p>
              <strong>₡{p.precioProducto}</strong>
              <p><em>{p.categoriaProducto}</em></p>
              {/* 🔹 BOTÓN DE COMPRAR AÑADIDO */}
              <button className="btn-comprar" onClick={() => agregarAlCarrito(p)}>Comprar</button> {/* 🔹 FUNCIÓN AGREGAR */}
            </div>
          ))}
        </div>

        <h3>Collares</h3>
        <div className="product-grid">
          {collares.map((p) => (
            <div key={p.id} className="product-card">
              <img src={p.imgProducto} alt={p.nombreProducto} />
              <h4>{p.nombreProducto}</h4>
              <p>{p.descripcionProducto}</p>
              <strong>₡{p.precioProducto}</strong>
              <p><em>{p.categoriaProducto}</em></p>
              <button className="btn-comprar" onClick={() => agregarAlCarrito(p)}>Comprar</button>
            </div>
          ))}
        </div>

        <h3>Pulseras</h3>
        <div className="product-grid">
          {pulseras.map((p) => (
            <div key={p.id} className="product-card">
              <img src={p.imgProducto} alt={p.nombreProducto} />
              <h4>{p.nombreProducto}</h4>
              <p>{p.descripcionProducto}</p>
              <strong>${p.precioProducto}</strong>
              <p><em>{p.categoriaProducto}</em></p>
              <button className="btn-comprar" onClick={() => agregarAlCarrito(p)}>Comprar</button>
            </div>
          ))}
        </div>

        <h3>Aretes</h3>
        <div className="product-grid">
          {aretes.map((p) => (
            <div key={p.id} className="product-card">
              <img src={p.imgProducto} alt={p.nombreProducto} />
              <h4>{p.nombreProducto}</h4>
              <p>{p.descripcionProducto}</p>
              <strong>${p.precioProducto}</strong>
              <p><em>{p.categoriaProducto}</em></p>
              <button className="btn-comprar" onClick={() => agregarAlCarrito(p)}>Comprar</button>
            </div>
          ))}
        </div>
      </section>

      <footer className="home-footer">
        <p>© 2025 Joyería Elegancia. Todos los derechos reservados.</p>
      </footer>
    </div>
  )
}

export default CompPrincipal
