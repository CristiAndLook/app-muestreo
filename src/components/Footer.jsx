import React from 'react'

function Footer() {
  return (
    <footer
        className="text-center mt-5"
        style={{
          position: "absolute",
          bottom: "0",
          width: "100%",
          height: "60px",
        }}
      >
        <p>
          Desarrollado por Cristian Mira para{" "}
          <a href="https://www.comfama.com/">auditoria Comfama</a>
        </p>
      </footer>
  )
}

export default Footer