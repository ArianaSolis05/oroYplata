const ProductCard = ({nombreProducto,precioProducto,categoriaProducto,descripcionProducto,imgProducto,eliminar}) => {
  return (
    <div>
        <h3>{nombreProducto}</h3>
        <h3>{precioProducto}</h3>
        <h3>{categoriaProducto}</h3>
        <h3>{descripcionProducto}</h3>
        <img width={120} src={imgProducto}/>
        <button onClick={eliminar}>Eliminar</button>


    </div>
  )
}

export default ProductCard
