import React from "react";
import Mas from "./Mas";
import EstimadoresMas from "./EstimadoresMas";
import Mpe from "./Mpe";
import EstimadoresMpe from "./EstimadoresMpe";

const Seleccion = ({ seleccion }) => {
  let componente;
  let value = seleccion;
  if (value === "") {
    componente = "Elige alguna opción";
  } else if (value === "mas") {
    componente = <Mas />;
  } else if (value === "emas") {
    componente = <EstimadoresMas />;
  } else if (value === "mpe") {
    componente = <Mpe />;
  } else if (value === "empe") {
    componente = <EstimadoresMpe />;
  }

  return <div>{componente}</div>;
};

export default Seleccion;
