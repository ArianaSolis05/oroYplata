import { useState, useEffect } from "react";
import { deleteData, getData, postData, patchData } from "../services/fetch"; 
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
  const [mostrarUsuarios, setMostrarUsuarios] = useState(false);
  const [recarga, setRecarga] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [editarProductoId, setEditarProductoId] = useState(null);

  useEffect(() => {
    async function traerInfo() {
      const datosProductos = await getData("joyeria");
      setCantTotalProductos(datosProductos.length);
      setListaProductos(datosProductos); 
      const datosUsuario = await getData("usuarios");
      setCantTotalUsuarios(datosUsuario.length);
      setUsuarios(datosUsuario);
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
    await peticion.json();
    setRecarga(!recarga);
  }

  async function eliminarUsuario(id) {
    await deleteData("usuarios", id);
    setRecarga(!recarga);
  }

  async function agregarProducto() {
    if (editarProductoId) {
      const objProducto = {
        nombreProducto,
        precioProducto,
        categoriaProducto,
        descripcionProducto,
        imgProducto,
      };
      await patchData("joyeria", editarProductoId, objProducto); 
      alert("Producto editado correctamente");
      setEditarProductoId(null);
    } else {
      const objProducto = {
        nombreProducto,
        precioProducto,
        categoriaProducto,
        descripcionProducto,
        imgProducto,
      };
      await postData(objProducto, "joyeria");
      alert("Se agregó el producto");
    }
    setNombreProducto("");
    setPrecioProducto("");
    setCategoriaProducto("");
    setDescripcionProducto("");
    setImgProducto("");
    setRecarga(!recarga); 
  }

  const editarProducto = async (producto) => {
    const nombreProducto = prompt("Editar nombre producto", producto.nombreProducto);
    const precioProducto = prompt("Editar precio producto", producto.precioProducto);
    const categoriaProducto = prompt("Editar categoria producto", producto.categoriaProducto);
    const descripcionProducto = prompt("Editar descripcion producto", producto.descripcionProducto);
    const imgProducto = prompt("Editar img producto", producto.imgProducto);

    const objetoProducto = { 
      nombreProducto,
      precioProducto,
      categoriaProducto,
      descripcionProducto,
      imgProducto
    };
    await patchData("joyeria", producto.id, objetoProducto);
    setRecarga(!recarga);
  };

  const editarUsuario = (usuario) => {
    const nuevoNombre = prompt("Editar nombre:", usuario.nombre);
    const nuevoCorreo = prompt("Editar correo:", usuario.correo);
    const nuevoTipo = prompt("Editar tipo de usuario:", usuario.tipoUsuario);
    if (nuevoNombre && nuevoCorreo && nuevoTipo) {
      const objUsuario = {
        nombre: nuevoNombre,
        correo: nuevoCorreo,
        tipoUsuario: nuevoTipo,
      };
      patchData("usuarios", usuario.id, objUsuario).then(() =>
        setRecarga(!recarga)
      );
    }
  };

  const toggleSubmenu = (menu) => {
    setOpenSubmenu(openSubmenu === menu ? "" : menu);
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
                  onClick={() =>
                    document
                      .querySelector(".add-product-form")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Agregar Producto
                </li>
                <li onClick={() => setMostrar(true)}>Ver Productos</li>
              </ul>
            )}
          </li>
          <li onClick={() => navigate("/principal")}>Ir a Principal</li>
          
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
                <th>Categoría</th>
              </tr>
            </thead>
            <tbody>
              {listaProductos
                .slice(-3)
                .reverse()
                .map((producto) => (
                  <tr key={producto.id}>
                    <td>{producto.nombreProducto}</td>
                    <td>₡{producto.precioProducto}</td>
                    <td>{producto.categoriaProducto}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>

        <section className="add-product-form">
          <h2>
            {editarProductoId ? "Editar Producto" : "Agregar Nuevo Producto"}
          </h2>
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
          <button onClick={agregarProducto}>
            {editarProductoId ? "Guardar Cambios" : "Agregar Producto"}
          </button>
        </section>

        <button className="product-card" onClick={() => setMostrar(!mostrar)}>
          Mostrar Productos
        </button>

        {mostrar && (
          <div className="productos-container">
            {listaProductos.map((lista) => (
              <ProductCard
                key={lista.id}
                precioProducto={lista.precioProducto}
                descripcionProducto={lista.descripcionProducto}
                imgProducto={lista.imgProducto}
                categoriaProducto={lista.categoriaProducto}
                nombreProducto={lista.nombreProducto}
                eliminar={() => eliminarJoya(lista.id)}
                editar={() => editarProducto(lista)}
              />
            ))}
          </div>
        )}

        <button
          className="usuario-btn"
          onClick={() => setMostrarUsuarios(!mostrarUsuarios)}
        >
          Mostrar Usuarios
        </button>

        {mostrarUsuarios && (
          <>
            {usuarios.map((usuario) => (
              <div className="usuario-card" key={usuario.id}>
                <p>{usuario.nombre}</p>
                <p>{usuario.correo}</p>
                <p>{usuario.tipoUsuario}</p>
                <button onClick={() => eliminarUsuario(usuario.id)}>
                  Eliminar
                </button>
                <button onClick={() => editarUsuario(usuario)}>Editar</button>
              </div>
            ))}
          </>
        )}
      </main>
    </div>
  );
};

export default Admin;
