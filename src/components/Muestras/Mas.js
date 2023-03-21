import React from "react";
import { useState } from "react";

const Mas = () => {
  const [submitClicked, setSubmitClicked] = useState(false);
  const [mas, setMas] = useState({
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
      <h2>Método Muestra Aleatoria Simple</h2>
      <h4>Ingrese los datos</h4>
      <form onSubmit={handleSubmit}>
        <label htmlFor="NivelDeConfianza">Nivel de confianza:</label>
        <input
          type="text"
          id="NivelDeConfianza"
          name="NivelDeConfianza"
          value={mas.NivelDeConfianza}
          onChange={handleChange}
        />

        <label htmlFor="ProbabilidadDeExito">Probabilidad de éxito:</label>
        <input
          type="text"
          id="ProbabilidadDeExito"
          name="ProbabilidadDeExito"
          value={mas.ProbabilidadDeExito}
          onChange={handleChange}
        />

        <label htmlFor="ErrorDeEstimacion">Error de estimación:</label>
        <input
          type="text"
          id="ErrorDeEstimacion"
          name="ErrorDeEstimacion"
          value={mas.ErrorDeEstimacion}
          onChange={handleChange}
        />

        <button type="submit">Obtener Muestra</button>

        {submitClicked && (
          <div>
            <h4>Resultados</h4>
            <p>
              <strong>Nivel de confianza:</strong> {mas.NivelDeConfianza}
            </p>
            <p>
              <strong>Probabilidad de éxito:</strong> {mas.ProbabilidadDeExito}
            </p>
            <p>
              <strong>Error de estimación:</strong> {mas.ErrorDeEstimacion}
            </p>
          </div>
        )}

      </form>
    </div>
  );
};

export default Mas;
