import React from "react";
import { useState } from "react";
import TechnicalMas from "../fichasTecnicas/TechnicalMas";

function Mas({ dataArray }) {
  const [hasData, setHasData] = useState(false);

  const [mas, setMas] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    auditoria: "",
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
      <form
        className="form-select-sm d-flex flex-column"
        onSubmit={handleSubmit}
      >
        <div className="d-flex flex-row justify-content-around">
          <div className="d-flex flex-column ml-5">
            <label className="form-label mt-1">
              Nombre:
              <input
                className="form-control"
                type="text"
                value={mas.nombre}
                name="nombre"
                onChange={onChange}
              />
            </label>
            <label className="form-label mt-1">
              Apellido:
              <input
                className="form-control"
                type="text"
                value={mas.apellido}
                name="apellido"
                onChange={onChange}
              />
            </label>
            <label className="form-label mt-1">
              Correo:
              <input
                className="form-control"
                type="email"
                value={mas.correo}
                name="correo"
                onChange={onChange}
              />
            </label>
            <label className="form-label mt-1">
              Nombre de la auditoria:
              <input
                className="form-control"
                type="text"
                value={mas.auditoria}
                name="auditoria"
                onChange={onChange}
              />
            </label>
          </div>
          <div className="d-flex flex-column mr-5">
            <label className="form-label mt-1">
              Nivel de confianza:
              <input
                className="form-control"
                type="number"
                value={mas.NivelDeConfianza}
                name="NivelDeConfianza"
                onChange={onChange}
              />
            </label>
            <label className="form-label mt-1">
              Probabilidad de éxito:
              <input
                className="form-control"
                type="number"
                value={mas.ProbabilidadDeExito}
                name="ProbabilidadDeExito"
                onChange={onChange}
              />
            </label>
            <label className="form-label mt-1">
              Error de estimación:
              <input
                className="form-control"
                type="number"
                value={mas.ErrorDeEstimacion}
                name="ErrorDeEstimacion"
                onChange={onChange}
              />
            </label>
          </div>
        </div>

        <button className="btn btn-secondary m-2" type="submit">
          Obtener muestra
        </button>
      </form>

      <div>{hasData && <TechnicalMas {...mas} />}</div>
    </section>
  );
}

export default Mas;
