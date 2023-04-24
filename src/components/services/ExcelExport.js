import { useState } from "react";
import * as XLSX from "xlsx";

const exportToExcel = (ranData, header) => {
  ranData.unshift(header);

  const worksheet = XLSX.utils.json_to_sheet(ranData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Muestra");
  XLSX.writeFile(workbook, ".muestra-aleatoria-simple.xlsx");
};

function ExcelExport({ muestra, data, header }) {
  const [randomData, setRandomData] = useState([]);

  const handleExportClick = () => {
    exportToExcel(randomData, header);
  };

  const handleGenerateClick = () => {
    // Generar datos aleatorios de la muestra
    const N = data.length;
    let segment;
    N >= 10000 ? (segment = 10) : N < 100 ? (segment = 2) : (segment = 4);

    const randomData = [];
    const segmentSize = Math.ceil(N / segment);
    let remainingSamples = muestra;

    const divideArray = (array, parts) => {
      const length = array.length;
      const partSize = Math.floor(length / parts);
      const result = [];
      let startIndex = 0;

      for (let i = 0; i < parts; i++) {
        let endIndex = startIndex + partSize;
        if (i === parts - 1) {
          endIndex = length;
        }
        result.push(array.slice(startIndex, endIndex));
        startIndex = endIndex;
      }
      return result;
    };

    const fragmentArray = divideArray(data, segment);

    for (let i = 0; i < segment; i++) {
      const segmentData = fragmentArray[i];
      const segmentSize = segmentData.length;
      const segmentSamples = Math.round((segmentSize / N) * muestra);
      const segmentRandomData = [];

      for (let j = 0; j < segmentSamples; j++) {
        const randomIndex = Math.floor(Math.random() * segmentSize);
        segmentRandomData.push(segmentData[randomIndex]);
      }

      randomData.push(...segmentRandomData);
      remainingSamples -= segmentSamples;
    }

    if (remainingSamples > 0) {
      for (let i = 0; i < remainingSamples; i++) {
        const randomIndex = Math.floor(Math.random() * N);
        randomData.push(data[randomIndex]);
      }
    }

    if (randomData.length > muestra) {
      randomData.splice(muestra);
    }

    console.log(randomData);
    setRandomData(randomData);
  };

  return (
    <div>
      <button onClick={handleGenerateClick}>Generar datos aleatorios</button>
      <button onClick={handleExportClick}>Exportar a Excel</button>
    </div>
  );
}

export default ExcelExport;
