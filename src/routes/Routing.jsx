import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Inicio from '../pages/Inicio'
import Formulario from '../pages/Formulario'
import Paginaprincipal from '../pages/Paginaprincipal'
import Administrador from '../pages/Administrador'
import Carrito from "../components/Carrito"

function Routing() {
  return (
    <div>
        <Router>
            <Routes>
                <Route path = "/" element = {<Inicio/>}></Route>
                <Route path = "/Formulario" element = {<Formulario/>}></Route>
                <Route path = "/principal" element = {<Paginaprincipal/>}></Route>
                <Route path = "/admin" element = {<Administrador/>}></Route>
                <Route path = "/" element = {<Carrito/>}></Route>


            </Routes>
        </Router>  
    </div>
  )
}


export default Routing
