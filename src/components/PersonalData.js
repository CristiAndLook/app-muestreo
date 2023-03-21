import { useState } from "react";
import ExcelImport from "./ExcelImport";

const PersonalData = () => {
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
  };

  return (
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

      <label htmlFor="seleccion">Seleccione una opción:</label>
      <select
        id="seleccion"
        name="seleccion"
        value={formulario.seleccion}
        onChange={handleChange}
      >
        <option value="">Seleccione una opción</option>
        <option value="mas">Muestra Aleatoria Simple</option>
        <option value="epa">Estimadores de prueba aleatoria simple</option>
        <option value="me">Muestra estratificada</option>
        <option value="epe">Estimadores de Prueba estratificada</option>
      </select>
      <ExcelImport />
      <button type="submit">Continuar</button>
    </form>
  );
};

export default PersonalData;
