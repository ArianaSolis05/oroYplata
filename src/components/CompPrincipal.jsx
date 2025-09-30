import React, { useEffect, useState } from "react";
import { getData } from "../services/fetch";
import "../styles/Inicio.css";

function CompPrincipal() {
  const [productos, setProductos] = useState([]);
  const [anillos, setAnillos] = useState([]);
  const [collares, setCollares] = useState([]);
  const [pulseras, setPulseras] = useState([]);
  const [aretes, setAretes] = useState([]);
  const [carrito, setCarrito] = useState(
    JSON.parse(localStorage.getItem("carrito")) || []
  );
  const [categoriaActiva, setCategoriaActiva] = useState("Inicio");
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  useEffect(() => {
    async function cargarProductos() {
      const data = await getData("joyeria");
      const sinCategoria = data.filter((joya)=>joya.categoriaProducto != "anillos" && joya.categoriaProducto != "collares" && joya.categoriaProducto != "pulseras" && joya.categoriaProducto != "aretes")
      const filtroAnillos = data.filter(
        (joya) => joya.categoriaProducto === "anillos"
      );
      const filtroCollares = data.filter(
        (joya) => joya.categoriaProducto === "collares"
      );
      const filtroPulseras = data.filter(
        (joya) => joya.categoriaProducto === "pulseras"
      );
      const filtroAretes = data.filter(
        (joya) => joya.categoriaProducto === "aretes"
      );
      setAnillos(filtroAnillos);
      setCollares(filtroCollares);
      setAretes(filtroAretes);
      setPulseras(filtroPulseras);
      setProductos(sinCategoria);
    }
    cargarProductos();
  }, []);

  const agregarAlCarrito = (producto) => {
    localStorage.setItem("carrito", JSON.stringify([...carrito, producto]));
    setCarrito([...carrito, producto]);
    console.log(carrito);
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter((item) => item.id !== id));
  };

  const comprarTodo = () => {
    if (carrito.length === 0) {
      alert("El carrito está vacío");
      return;
    }
    alert(
      `Compra realizada: ${carrito.map((p) => p.nombreProducto).join(", ")}`
    );
    setCarrito([]);
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Oro & Plata</h1>
        <nav>
          <ul>
            <li onClick={() => setCategoriaActiva("Inicio")}>Inicio</li>
            <li onClick={() => setCategoriaActiva("Anillos")}>Anillos</li>
            <li onClick={() => setCategoriaActiva("Pulseras")}>Pulseras</li>
            <li onClick={() => setCategoriaActiva("Aretes")}>Aretes</li>
            <li onClick={() => setCategoriaActiva("Collares")}>Collares</li>
            <li onClick={() => setCategoriaActiva("Contacto")}>Contacto</li>
          </ul>
        </nav>
      </header>

      <section className="hero-section">
        <h2>Descubre nuestra colección exclusiva</h2>
      </section>

      <aside className="cart-panel">
        <h3>Carrito de Compras</h3>
        <button
          onClick={()=>setMostrarCarrito(!mostrarCarrito)}
        >Mostrar Carrito</button>
        {mostrarCarrito && (
          <>
            {carrito.length === 0 ? (
              <p>El carrito está vacío</p>
            ) : (
              <div className="cart-items">
                {carrito.map((item, index) => (
                  <div key={index} className="cart-item">
                    <img
                      src={item.imgProducto}
                      alt={item.nombreProducto}
                      className="cart-img"
                    />
                    <span>{item.nombreProducto}</span>
                    <strong>₡{item.precioProducto}</strong>
                    <button onClick={() => eliminarDelCarrito(item.id)}>
                      Eliminar
                    </button>
                  </div>
                ))}
                <button onClick={comprarTodo} className="btn-comprar-todo">
                  Comprar Todo
                </button>
              </div>
            )}
          </>
        )}
      </aside>

      <section className="products-section">
        {categoriaActiva !== "Contacto" && <h3>Productos</h3>}
        
        <h3>Sin categoría</h3>
        <div className="product-grid">
          {productos.map((p) => (
                <div key={p.id} className="product-card">
                  <img src={p.imgProducto} alt={p.nombreProducto} />
                  <h4>{p.nombreProducto}</h4>
                  <p>{p.descripcionProducto}</p>
                  <strong>₡{p.precioProducto}</strong>
                  <p>
                    <em>{p.categoriaProducto}</em>
                  </p>
                  <button
                    className="btn-comprar"
                    onClick={() => agregarAlCarrito(p)}
                  >
                    Comprar
                  </button>
                </div>
              ))}
        </div>
        {(categoriaActiva === "Inicio" || categoriaActiva === "Anillos") && (
          <>
            <h3>Anillos</h3>
            <div className="product-grid">
              {anillos.map((p) => (
                <div key={p.id} className="product-card">
                  <img src={p.imgProducto} alt={p.nombreProducto} />
                  <h4>{p.nombreProducto}</h4>
                  <p>{p.descripcionProducto}</p>
                  <strong>₡{p.precioProducto}</strong>
                  <p>
                    <em>{p.categoriaProducto}</em>
                  </p>
                  <button
                    className="btn-comprar"
                    onClick={() => agregarAlCarrito(p)}
                  >
                    Comprar
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {(categoriaActiva === "Inicio" || categoriaActiva === "Collares") && (
          <>
            <h3>Collares</h3>
            <div className="product-grid">
              {collares.map((p) => (
                <div key={p.id} className="product-card">
                  <img src={p.imgProducto} alt={p.nombreProducto} />
                  <h4>{p.nombreProducto}</h4>
                  <p>{p.descripcionProducto}</p>
                  <strong>₡{p.precioProducto}</strong>
                  <p>
                    <em>{p.categoriaProducto}</em>
                  </p>
                  <button
                    className="btn-comprar"
                    onClick={() => agregarAlCarrito(p)}
                  >
                    Comprar
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {(categoriaActiva === "Inicio" || categoriaActiva === "Pulseras") && (
          <>
            <h3>Pulseras</h3>
            <div className="product-grid">
              {pulseras.map((p) => (
                <div key={p.id} className="product-card">
                  <img src={p.imgProducto} alt={p.nombreProducto} />
                  <h4>{p.nombreProducto}</h4>
                  <p>{p.descripcionProducto}</p>
                  <strong>₡{p.precioProducto}</strong>
                  <p>
                    <em>{p.categoriaProducto}</em>
                  </p>
                  <button
                    className="btn-comprar"
                    onClick={() => agregarAlCarrito(p)}
                  >
                    Comprar
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {(categoriaActiva === "Inicio" || categoriaActiva === "Aretes") && (
          <>
            <h3>Aretes</h3>
            <div className="product-grid">
              {aretes.map((p) => (
                <div key={p.id} className="product-card">
                  <img src={p.imgProducto} alt={p.nombreProducto} />
                  <h4>{p.nombreProducto}</h4>
                  <p>{p.descripcionProducto}</p>
                  <strong>₡{p.precioProducto}</strong>
                  <p>
                    <em>{p.categoriaProducto}</em>
                  </p>
                  <button
                    className="btn-comprar"
                    onClick={() => agregarAlCarrito(p)}
                  >
                    Comprar
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {categoriaActiva === "Contacto" && (
          <>
            <div className="contact-info">
              <p>📞 Teléfono: +506 2245 6787</p>
              <p>
                📸 Instagram:{" "}
                <a
                  href="https://www.instagram.com/_oro&plata"
                  target="_blank"
                  rel="noreferrer"
                >
                  _oro&plata
                </a>
              </p>
              <p>
                💬{" "}
                <a
                  href="https://wa.me/50622456787"
                  target="_blank"
                  rel="noreferrer"
                >
                  Chatear por WhatsApp
                </a>
              </p>
            </div>
          </>
        )}
      </section>

      <footer className="home-footer">
        <p>© 2025 Joyería Elegancia. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default CompPrincipal;
