import React from "react";

const GraphMas = (mas) => {
  let data = mas.data;
  //Desviación estándar con el index de la data
  const desviacionEst = (data) => {
    const media = parseInt(data.length / 2);
    let desviacion = 0;
    let desviacionEstandar = 0;
    for (let i = 0; i < data.length; i++) {
      desviacion += Math.pow(data.indexOf(data[i]) - media, 2);
    }
    desviacionEstandar = Math.sqrt(desviacion / data.length);
    return desviacionEstandar;
  };

  let desviacionEstandar = desviacionEst(data);
  console.log(desviacionEstandar);

  return (
    <div>
      <h2>GraphMas</h2>
    </div>
  );
};

export default GraphMas;
