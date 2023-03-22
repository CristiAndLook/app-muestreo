import React from "react";
import { useState } from "react";
import Data from "../Data/DataMas";

function Mas({ dataArray }) {
  console.log(dataArray);

  const [mas, setMas] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    NivelDeConfianza: "",
    ProbabilidadDeExito: "",
    ErrorDeEstimacion: "",
  });

  const onChange = (event) => {
    setMas({ ...mas, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí podrías hacer alguna validación o manipulación de los datos antes de enviarlos al componente Data
    // Luego los enviamos al componente Data como propiedades}
    console.log(mas);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input
          type="text"
          value={mas.nombre}
          name="nombre"
          onChange={onChange}
        />
      </label>
      <label>
        Apellido:
        <input
          type="text"
          value={mas.apellido}
          name="apellido"
          onChange={onChange}
        />
      </label>
      <label>
        Correo:
        <input
          type="email"
          value={mas.correo}
          name="correo"
          onChange={onChange}
        />
      </label>
      <label>
        Nivel de Confianza:
        <input
          type="number"
          value={mas.NivelDeConfianza}
          name="NivelDeConfianza"
          onChange={onChange}
        />
      </label>
      <label>
        Probabilidad de Éxito:
        <input
          type="number"
          value={mas.ProbabilidadDeExito}
          name="ProbabilidadDeExito"
          onChange={onChange}
        />
      </label>
      <label>
        Error de Estimación:
        <input
          type="number"
          value={mas.ErrorDeEstimacion}
          name="ErrorDeEstimacion"
          onChange={onChange}
        />
      </label>
      <button type="submit">Obtener Muestra</button>
      {false && <Data {...mas} />}
    </form>
  );
}

export default Mas;
