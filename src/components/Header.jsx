import Link from "next/link"

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark  mb-5" style={{background: '#EE2B7B', color: 'white' }}>
      <div className="container-fluid p-2">
        {/* No uso link por que la idea es que recargue la pagina al pulsar el logo */}
        <a className=" my-2 my-sm-0" href="/" style={{color: 'white'}}>
        <img src="https://images.ctfassets.net/gkhyeghj07ak/6KrgYwciYMg98vGrkjQ4Ws/f7d958c9cdb87d98da148c1cf1e8ca8e/white.svg" alt="Comfama" /></a> 
          
        <ul className="navbar-nav me-auto">
          <li className="nav-item pt-2 mr-4">
            <Link className="nav-link" href="/documentacion" style={{color: 'white'}}>Documentación</Link>
          </li>      
      </ul>
      
      <a className="btn btn-secondary my-2 my-sm-0" href="/" style={{color: 'white'}}>Toca aquí o en Comfama para reiniciar la página</a> 
      </div>
    </nav>
  )
}

export default Header