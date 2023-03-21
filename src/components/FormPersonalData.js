import { useState } from "react";
import ExcelImport from "./ExcelImport";
import Seleccion from "./Muestras/Seleccion";

const FormPersonalData = () => {
  const [submitClicked, setSubmitClicked] = useState(false);
  const [formulario, setFormulario] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    seleccion: "",
  });

  const handleChange = (event) => {
    setFormulario({
      ...formulario,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Agrega aquí la lógica necesaria para enviar los datos a través de una solicitud HTTP.
    console.log(formulario);
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
          value={formulario.nombre}
          onChange={handleChange}
        />

        <label htmlFor="apellido">Apellido:</label>
        <input
          type="text"
          id="apellido"
          name="apellido"
          value={formulario.apellido}
          onChange={handleChange}
        />

        <label htmlFor="correo">Correo:</label>
        <input
          type="email"
          id="correo"
          name="correo"
          value={formulario.correo}
          onChange={handleChange}
        />

        <label htmlFor="seleccion"></label>
        <select
          id="seleccion"
          name="seleccion"
          value={formulario.seleccion}
          onChange={handleChange}
        >
          <option value="">Seleccione que le gustaria hacer</option>
          <option value="mas">Muestra Aleatoria Simple</option>
          <option value="emas">Estimadores de Muestra Aleatoria Simple</option>
          <option value="mpe">Muestra por Estrato</option>
          <option value="empe">Estimadores de Muestra por Estrato</option>
        </select>

        <ExcelImport />

        <button type="submit">Continuar</button>
      </form>

      {submitClicked && <Seleccion seleccion={formulario.seleccion} />}
    </div>
  );
};

export default FormPersonalData;
