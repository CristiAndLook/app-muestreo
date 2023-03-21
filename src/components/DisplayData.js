import { useState } from "react";
import Mas from "./Muestras/Mas";
import EstimadoresMas from "./Muestras/EstimadoresMas";
import Mpe from "./Muestras/Mpe";
import EstimadoresMpe from "./Muestras/EstimadoresMpe";
import NoOption from "./Muestras/NoOption";

const DisplayData = () => {
  let componente = null;
  const [formulario, setFormulario] = useState({
    seleccion: "",
  });

  const handleChange = (event) => {
    setFormulario({
      ...formulario,
      [event.target.name]: event.target.value,
    });
  };

  if (formulario.seleccion === "") {
    componente = <NoOption />;
  } else if (formulario.seleccion === "mas") {
    componente = <Mas />;
  } else if (formulario.seleccion === "emas") {
    componente = <EstimadoresMas />;
  } else if (formulario.seleccion === "mpe") {
    componente = <Mpe />;
  } else if (formulario.seleccion === "empe") {
    componente = <EstimadoresMpe />;
  }

  return (
    <div>
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
      {componente}
    </div>
  );
};

export default DisplayData;
