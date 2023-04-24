import React from "react";
import { useState } from "react";
import TechnicalMas from "../FichaTecnica/TechnicalMas";

function Mas({ dataArray }) {
  const [hasData, setHasData] = useState(false);

  const [mas, setMas] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    TamanoPoblacion: dataArray.length - 1, //Tamaño del Universo/Población
    NivelDeConfianza: "",
    ProbabilidadDeExito: "",
    ErrorDeEstimacion: "",
    data: dataArray,
  });

  const onChange = (event) => {
    event.preventDefault();
    setMas({ ...mas, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí podrías hacer alguna validación o manipulación de los datos antes de enviarlos al componente.
    mas.NivelDeConfianza = Number(mas.NivelDeConfianza);
    mas.ProbabilidadDeExito = Number(mas.ProbabilidadDeExito); //P
    mas.ProbabilidadDeFallo = 0; // Q
    mas.ErrorDeEstimacion = Number(mas.ErrorDeEstimacion); //e

    // Luego los enviamos al componente Data como propiedades}
    setHasData(true);
    console.log(mas);
  };

  return (
    <section>
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
      </form>
      <div>{hasData && <TechnicalMas {...mas} />}</div>
    </section>
  );
}

export default Mas;
