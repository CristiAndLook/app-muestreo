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
    // Generar datos aleatorios usando el código que te proporcioné antes
    const N = data.length;
    let segment;
    N >= 10000 ? (segment = 10) : N < 100 ? (segment = 2) : (segment = 4);
    const n = muestra;

    const randomData = [];
    const segmentSize = Math.ceil(N / segment);
    let remainingSamples = n;

    for (let i = 0; i < segment; i++) {
      let segmentSamples = Math.min(remainingSamples, segmentSize);
      const segmentStart = i * segmentSize;
      const segmentEnd = Math.min((i + 1) * segmentSize, N);
      const randomIndices = new Set();
      while (randomIndices.size < segmentSamples) {
        const randomIndex = Math.floor(
          Math.random() * (segmentEnd - segmentStart) + segmentStart
        );
        randomIndices.add(randomIndex);
      }
      randomIndices.forEach((index) => randomData.push(data[index]));
      remainingSamples -= segmentSamples;
      if (remainingSamples <= 0) {
        break;
      }
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
