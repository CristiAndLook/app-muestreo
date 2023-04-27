const GraphMas = ({ mas }) => {
  //Tamano del array
  const arraySize = mas.data;
  console.log(arraySize);
  //Nuevo Array de 1 a n
  const arr = Array.from({ length: arraySize }, (_, i) => i + 1);
  //Data
  let data = mas.data;
  //Media de la data
  const media = parseInt(arraySize / 2);
  //Desviación estándar con el index de la data
  const desviacionEst = (data) => {
    let desviacion = 0;
    let desviacionEstandar = 0;
    for (let i = 0; i < arraySize; i++) {
      desviacion += Math.pow(data.indexOf(data[i]) - media, 2);
    }
    desviacionEstandar = Math.sqrt(desviacion / arraySize);
    return desviacionEstandar;
  };

  //Función de distribución normal
  const normDist = (valores, media, desviacionEstandar) => {
    return valores.map((x) => {
      const num = Math.exp(-((x - media) ** 2) / (2 * desviacionEstandar ** 2));
      const den = Math.sqrt(2 * Math.PI) * desviacionEstandar;
      return num / den;
    });
  };

  let desviacionEstandar = desviacionEst(data);
  let resultados = normDist(arr, media, desviacionEstandar);
  console.log(resultados);

  return (
    <div>
      <h2>GraphMas</h2>
    </div>
  );
};

export default GraphMas;
