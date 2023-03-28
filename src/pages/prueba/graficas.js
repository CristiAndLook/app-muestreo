import { useRef, useEffect } from "react";
import * as d3 from "d3";

const Graficas = () => {

  const svgRef = useRef();

  useEffect(() => {
    // Aquí irá el código para dibujar la gráfica
    const svg = d3.select(svgRef.current);

    const width = 500;
    const height = 300;
    const margin = 50;

    svg.attr("width", width).attr("height", height);

    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * 20)
      .attr("y", (d) => height - margin - d * 3)
      .attr("width", 15)
      .attr("height", (d) => d * 3)
      .attr("fill", "blue");
  }, []);

  return <svg ref={svgRef}></svg>;
};

export default Graficas;
