import { useState, useEffect } from "react";
import { deleteData, getData, postData } from "../services/fetch";
import "../styles/Admin.css";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [nombreProducto, setNombreProducto] = useState("");
  const [precioProducto, setPrecioProducto] = useState("");
  const [categoriaProducto, setCategoriaProducto] = useState("");
  const [descripcionProducto, setDescripcionProducto] = useState("");
  const [imgProducto, setImgProducto] = useState("");
  const [menuOpen, setMenuOpen] = useState(true);
  const [openSubmenu, setOpenSubmenu] = useState("");
  const navigate = useNavigate();
  const [cantTotalProductos, setCantTotalProductos] = useState(0);
  const [cantTotalPedidos, setCantTotalPedidos] = useState(0);
  const [cantTotalUsuarios, setCantTotalUsuarios] = useState(0);
  const [listaProductos, setListaProductos] = useState([]);
  const [mostrar, setMostrar] = useState(false);
  const [recarga, setRecarga] = useState(false);

  useEffect(() => {
    async function traerInfo() {
      const datosProductos = await getData("joyeria");
      setCantTotalProductos(datosProductos.length);
      const datosUsuario = await getData("usuarios");
      setCantTotalUsuarios(datosUsuario.length);
      setListaProductos(datosProductos);
    }
    traerInfo();
  }, [recarga]);

  async function eliminarJoya(id) {
    const peticion = await fetch(`http://localhost:3001/joyeria/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const respuesta = await peticion.json();
    console.log(respuesta);
  }

  async function agregarProducto() {
    const objProducto = {
      nombreProducto,
      precioProducto,
      categoriaProducto, // --- ahora es un solo string ---
      descripcionProducto,
      imgProducto,
    };
    await postData(objProducto, "joyeria");
    setNombreProducto("");
    setPrecioProducto("");
    setCategoriaProducto(""); // --- limpia el select ---
    setDescripcionProducto("");
    setImgProducto("");
    alert("Se agregó el producto");
  }

  const toggleSubmenu = (menu) => {
    setOpenSubmenu(openSubmenu === menu ? "" : menu); // --- NUEVO ---
  };

  return (
    <div className="admin-container">
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      <aside className={`sidebar ${menuOpen ? "open" : ""}`}>
        <h2 className="sidebar-title">Oro & Plata</h2>
        <ul>
          <li onClick={() => toggleSubmenu("productos")}>
            Productos
            {openSubmenu === "productos" && (
              <ul className="submenu">
                <li
                  onClick={() => {
                    document
                      .querySelector(".add-product-form")
                      .scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Agregar Producto
                </li>
                <li
                  onClick={() => {
                    setMostrar(true);
                  }}
                >
                  Ver Productos
                </li>
              </ul>
            )}
          </li>

          <li onClick={() => navigate("/principal")}>Ir a Principal</li>

          <li onClick={() => toggleSubmenu("pedidos")}>
            Pedidos
            {openSubmenu === "pedidos" && (
              <ul className="submenu">
                <li
                  onClick={() => {
                    navigate("/admin/ver-pedidos");
                  }}
                >
                  Ver Pedidos
                </li>
              </ul>
            )}
          </li>
          <li
            onClick={() => {
              navigate("/");
              localStorage.clear();
            }}
          >
            Salir
          </li>
        </ul>
      </aside>

      <main className="main-content">
        <header className="header">
          <h1>Panel de Administración</h1>
        </header>

        <section className="cards">
          <div className="card">
            <h3>Total Productos</h3>
            <p>{cantTotalProductos}</p>
          </div>
          <div className="card">
            <h3>Pedidos Pendientes</h3>
            <p>{cantTotalPedidos}</p>
          </div>
          <div className="card">
            <h3>Usuarios Registrados</h3>
            <p>{cantTotalUsuarios}</p>
          </div>
        </section>

        <section className="table-section">
          <h2>Últimos Productos Agregados</h2>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Anillo de Oro</td>
                <td>$250</td>
                <td>20</td>
              </tr>
              <tr>
                <td>Collar de Plata</td>
                <td>$150</td>
                <td>15</td>
              </tr>
              <tr>
                <td>Pulsera Elegante</td>
                <td>$100</td>
                <td>10</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="add-product-form">
          <h2>Agregar Nuevo Producto</h2>
          <input
            value={nombreProducto}
            type="text"
            placeholder="Nombre Producto"
            onChange={(e) => setNombreProducto(e.target.value)}
          />
          <input
            value={precioProducto}
            type="text"
            placeholder="Precio Producto"
            onChange={(e) => setPrecioProducto(e.target.value)}
          />

          <select
            className="select-categorias"
            value={categoriaProducto}
            onChange={(e) => setCategoriaProducto(e.target.value)}
          >
            <option value="">Seleccionar Categoría</option>
            <option value="Collares">Collares</option>
            <option value="Pulseras">Pulseras</option>
            <option value="Aretes">Aretes</option>
            <option value="Anillos">Anillos</option>
          </select>

          <input
            value={descripcionProducto}
            type="text"
            placeholder="Descripción Producto"
            onChange={(e) => setDescripcionProducto(e.target.value)}
          />
          <input
            value={imgProducto}
            type="text"
            placeholder="Imagen Producto"
            onChange={(e) => setImgProducto(e.target.value)}
          />
          <button onClick={agregarProducto}>Agregar Producto</button>
        </section>

        <button
          onClick={() => {
            setMostrar(!mostrar);
          }}
        >
          Mostrar
        </button>
        {mostrar &&
          listaProductos.map((lista) => {
            return (
              <ProductCard
                key={lista.id}
                precioProducto={lista.precioProducto}
                descripcionProducto={lista.descripcionProducto}
                imgProducto={lista.imgProducto}
                categoriaProducto={lista.categoriaProducto}
                nombreProducto={lista.nombreProducto}
                eliminar={() => {
                  eliminarJoya(lista.id);
                  setRecarga(!recarga);
                }}
              />
            );
          })}
      </main>
    </div>
  );
};

export default Admin;
