import { useState } from "react";
import * as XLSX from "xlsx";
import GraphMas from "../graficas/GraphMas";

const exportToExcel = (ranData, headerExcel) => {
  ranData.unshift(headerExcel);

  const worksheet = XLSX.utils.json_to_sheet(ranData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Muestra");
  XLSX.writeFile(workbook, ".muestra-aleatoria-simple.xlsx");
};

const TechnicalMas = (mas) => {
  //Data recibida lista para exportar
  const [ranData, setRanData] = useState([]);
  const [graphIndexes, setGraphIndexes] = useState([]);
  //Variables estadísticas
  //Redondear hacia arriba
  let ProbabilidadDeFallo = (mas.ProbabilidadDeExito - 100) * -1; // Q

  //Variables de fecha
  const fechaActual = new Date();
  const dia = fechaActual.getDate();
  const mes = fechaActual.getMonth() + 1; // Los meses en JS empiezan en 0
  const anio = fechaActual.getFullYear();

  //calcular la función de distribución acumulativa normal estándar inversa
  //Esta funcion deberiamos pasarla a un contexto global para que pueda ser usada por otros componentes
  function NormSInv(p) {
    var a1 = -39.6968302866538,
      a2 = 220.946098424521,
      a3 = -275.928510446969;
    var a4 = 138.357751867269,
      a5 = -30.6647980661472,
      a6 = 2.50662827745924;
    var b1 = -54.4760987982241,
      b2 = 161.585836858041,
      b3 = -155.698979859887;
    var b4 = 66.8013118877197,
      b5 = -13.2806815528857,
      c1 = -7.78489400243029e-3;
    var c2 = -0.322396458041136,
      c3 = -2.40075827716184,
      c4 = -2.54973253934373;
    var c5 = 4.37466414146497,
      c6 = 2.93816398269878,
      d1 = 7.78469570904146e-3;
    var d2 = 0.32246712907004,
      d3 = 2.445134137143,
      d4 = 3.75440866190742;
    var p_low = 0.02425,
      p_high = 1 - p_low;
    var q, r;
    var retVal;

    if (p < 0 || p > 1) {
      alert("NormSInv: Argument out of range.");
      retVal = 0;
    } else if (p < p_low) {
      q = Math.sqrt(-2 * Math.log(p));
      retVal =
        (((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) /
        ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
    } else if (p <= p_high) {
      q = p - 0.5;
      r = q * q;
      retVal =
        ((((((a1 * r + a2) * r + a3) * r + a4) * r + a5) * r + a6) * q) /
        (((((b1 * r + b2) * r + b3) * r + b4) * r + b5) * r + 1);
    } else {
      q = Math.sqrt(-2 * Math.log(1 - p));
      retVal =
        -(((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) /
        ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
    }

    return retVal;
  }

  //Variables estadísticas
  let N = mas.TamanoPoblacion;
  let P = mas.ProbabilidadDeExito / 100;
  let Q = ProbabilidadDeFallo / 100;
  let e = mas.ErrorDeEstimacion / 100;

  //Hallamos Z
  let z = mas.NivelDeConfianza / 100; //Pasamos a decimal
  let alfa = 1 - z; //Nivel de significancia
  let Z = NormSInv(z * (alfa / 2)) * -1; //Hallamos Z

  //Hallamos n Tamaño de la muestra
  let n = Math.ceil((N * Z ** 2 * P * Q) / ((N - 1) * e ** 2 + Z ** 2 * P * Q)); //Tamaño de la muestra

  const handleGenerateClick = () => {
    // Divide el array en partes iguales
    const indexesArray = (array, muestra) => {
      // Constantes y variables necesarias
      const newArray = array.slice(1); // Copia del array original

      const length = newArray.length; // Número de elementos del array
      let indexes = []; // Array que contendrá los índices aleatorios
      let startIndex = 0;
      let parts; // Número de segmentos en los que se dividirá el array
      length >= 10000
        ? (parts = 10)
        : length <= 100
        ? (parts = 2)
        : (parts = 4); // Si length es mayor o igual a 10000, segment = 10, si length es menor a 100, segment = 2, si no, segment = 4
      // Tamaño de la muestra dividido entre el número de segmentos(oartes)
      let splitSample;

      muestra % parts === 0
        ? (splitSample = muestra / parts)
        : (splitSample = Math.floor(muestra / parts));
      const partSize = Math.floor(length / parts); // Tamaño de cada parte

      const count = splitSample;
      // For para dividir el array en partes iguales
      for (let i = 0; i < parts; i++) {
        //Ejemplo: con un array de 20 elementos y 2 partes
        let endIndex = startIndex + partSize; // endIndex = 10
        if (i === parts - 1) {
          // Si i = 1
          endIndex = length; // endIndex = 20
          splitSample = muestra; // splitSample = 20
        }

        while (indexes.length < splitSample) {
          let randomIndex = Math.floor(
            Math.random() * (endIndex - startIndex + 1) + startIndex
          );

          if (indexes.indexOf(randomIndex) === -1) {
            indexes.push(randomIndex);
          }
        }
        splitSample += count;
        startIndex = endIndex; // startIndex = 10
      }
      // ordenar los indices aleatorios
      indexes.sort((a, b) => a - b);
      return indexes; //Un array con los índices aleatorios
    };
    const indexes = indexesArray(mas.data, n);
    console.log(indexes);
    const dataRandom = indexes.map((index) => mas.data[index]);
    setRanData(dataRandom);
    setGraphIndexes(indexes);
  };

  //Exportar a Excel
  const headerExcel = mas.data[0]; //Encabezado de la tabla
  const handleExportClick = () => {
    exportToExcel(ranData, headerExcel); //Llamamos a la función exportToExcel
  };

  return (
    <div>
      <h2>Ficha Técnica Mas</h2>
      <section>
        <p>Fecha: {`${dia}/${mes}/${anio}`}</p>
        <p>Diseño Muestral: Muestra Aleatoria Simple</p>
        <p>
          Nombre: {mas.nombre} {mas.apellido}{" "}
        </p>
        <p>Correo: {mas.correo}</p>
        <p>Tipo de auditoria: {mas.auditoria}</p>
        <p>Tamaño de la Población: {N}</p>
        <p>Nivel de Confianza: {mas.NivelDeConfianza}</p>
        <p>Probabilidad de Éxito: {mas.ProbabilidadDeExito}</p>
        <p>Probabilidad de Fallo: {ProbabilidadDeFallo}</p>
        <p>Error de Estimación: {mas.ErrorDeEstimacion}</p>
        <p>Tamaño de la Muestra: {n}</p>
      </section>
      {/* TODO: Gráfica */}
      <section>
        <GraphMas mas={mas} graphIndexes={graphIndexes} />
      </section>
      <section>
        <button onClick={handleGenerateClick}>Generar datos aleatorios</button>
        <button onClick={handleExportClick}>Exportar a Excel</button>
      </section>
    </div>
  );
};

export default TechnicalMas;
