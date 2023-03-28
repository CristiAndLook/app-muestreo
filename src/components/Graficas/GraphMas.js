import { useRef, useEffect } from "react";
import * as d3 from "d3";

const GraphMas = (mas) => {
  //Tamano del array
  const arraySize = mas.data.length - 1;
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

  //Gráfica
  const svgRef = useRef();

  useEffect(() => {
    // Aquí irá el código para dibujar la gráfica
    const svg = d3.select(svgRef.current);

    const width = 500;
    const height = 300;
    const margin = 50;

    // Escala para el eje X
    const xScale = d3
      .scaleLinear()
      .domain([1, arraySize])
      .range([margin, width - margin]);

    // Escala para el eje Y
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(resultados)])
      .range([height - margin, margin]);

    svg.attr("width", width).attr("height", height);

    svg
      .selectAll("circle")
      .data(resultados)
      .enter()
      .append("circle")
      .attr("cx", (d, i) => xScale(i + 1))
      .attr("cy", (d) => yScale(d))
      .attr("r", 3)
      .attr("fill", "#EE2B7B");
  }, []);

  return (
    <div>
      <h2>GraphMas</h2>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default GraphMas;
