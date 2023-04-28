import Link from "next/link"

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {/* No uso link por que la idea es que recargue la pagina al pulsar el logo */}
        <a className="btn btn-secondary my-2 my-sm-0" href="/">Comfama</a> 
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link" href="/documentacion">Documentación</Link>
          </li>      
      </ul>
      <a className="btn btn-secondary my-2 my-sm-0" href="/">Toca aquí o en Comfama para reiniciar la página</a> 
      </div>
    </nav>
  )
}

export default Header