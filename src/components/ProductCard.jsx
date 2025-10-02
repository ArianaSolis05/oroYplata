import "../styles/Admin.css";

const ProductCard = ({
  nombreProducto,
  precioProducto,
  categoriaProducto,
  descripcionProducto,
  imgProducto,
  eliminar,
  editar, 
}) => {
  return (
    <div className="product-card">
      <img className="product-img" src={imgProducto} alt={nombreProducto} />

      <h3 className="product-name">{nombreProducto}</h3>
      <p className="product-price">${precioProducto}</p>
      <p className="product-category">{categoriaProducto}</p>
      <p className="product-description">{descripcionProducto}</p>

      <div className="btn-eliminar-producto">
        <button onClick={eliminar}>Eliminar</button>
      </div>

      <div className="btn-editar-producto">
        <button onClick={editar}>Editar</button>
      </div>
    </div>
  );
};

export default ProductCard;




