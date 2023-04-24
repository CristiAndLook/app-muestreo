import { useState } from "react";
import * as XLSX from "xlsx";

export default function ExcelDropZone() {
  const [file, setFile] = useState(null);
  const [hasFile, setHasFile] = useState(false);

  const handleDrop = (event) => {
    event.preventDefault();
    const newFile =
      (event.dataTransfer && event.dataTransfer.files[0]) ||
      (event.target && event.target.files[0]);

    if (hasFile) {
      const confirmReplace = window.confirm(
        "¿Está seguro de que desea reemplazar el archivo existente?"
      );
      if (!confirmReplace) {
        return;
      }
    }

    setFile(newFile);
    setHasFile(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      console.log(XLSX.utils.sheet_to_json(worksheet, { header: 1 }));
    };
    reader.readAsArrayBuffer(newFile);
  };

  const handleButtonClick = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <div onDragOver={(event) => event.preventDefault()} onDrop={handleDrop}>
      <div>
        <input
          type="file"
          id="fileInput"
          onChange={handleDrop}
          style={{ display: "none" }}
        />
        <button onClick={handleButtonClick}>
          Pulse o arrastre aquí para cargar un archivo
        </button>
        {hasFile && <p>Archivo {file.name} cargado con éxito </p>}
      </div>
    </div>
  );
}
