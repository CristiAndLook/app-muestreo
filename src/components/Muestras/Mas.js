import React from "react";
import { useState } from "react";

const Mas = (formulario) => {

  const [submitClicked, setSubmitClicked] = useState(false);
  const [mas, setMas] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    NivelDeConfianza: "",
    ProbabilidadDeExito: "",
    ErrorDeEstimacion: "",
  });

  const handleChange = (event) => {
    setMas({
      ...mas,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Agrega aquí la lógica necesaria para enviar los datos a través de una solicitud HTTP.
    console.log(mas);
    setSubmitClicked(true);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          placeholder="Ej. Jane"
          value={formulario.nombre}
          onChange={handleChange}
        />

        <label htmlFor="apellido">Apellido:</label>
        <input
          type="text"
          id="apellido"
          name="apellido"
          placeholder="Ej. Doe"
          value={formulario.apellido}
          onChange={handleChange}
        />

        <label htmlFor="correo">Correo:</label>
        <input
          type="text"
          id="correo"
          name="correo"
          placeholder="Ej. janedoe@comfama.com.co"
          value={formulario.correo}
          onChange={handleChange}
        />

        <label htmlFor="NivelDeConfianza">Nivel de confianza:</label>
        <input
          type="text"
          id="NivelDeConfianza"
          name="NivelDeConfianza"
          placeholder="Ej. 95%"
          value={mas.NivelDeConfianza}
          onChange={handleChange}
        />

        <label htmlFor="ProbabilidadDeExito">Probabilidad de éxito:</label>
        <input
          type="text"
          id="ProbabilidadDeExito"
          name="ProbabilidadDeExito"
          placeholder="Ej. 50%"
          value={mas.ProbabilidadDeExito}
          onChange={handleChange}
        />

        <label htmlFor="ErrorDeEstimacion">Error de estimación:</label>
        <input
          type="text"
          id="ErrorDeEstimacion"
          name="ErrorDeEstimacion"
          placeholder="Ej. 5%"
          value={mas.ErrorDeEstimacion}
          onChange={handleChange}
        />

        <button type="submit">Obtener Muestra</button>
      </form>
    </div>
  );
};

export default Mas;
