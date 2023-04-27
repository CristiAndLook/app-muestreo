import { useState } from "react";
import * as XLSX from "xlsx";
import Mas from "./muestras/Mas";
import EstimadoresMas from "./muestras/EstimadoresMas";
import Mpe from "./muestras/Mpe";
import EstimadoresMpe from "./muestras/EstimadoresMpe";
import NoOption from "./muestras/NoOption";

const DisplayData = () => {
  //Carga de archivo
  const [file, setFile] = useState(null);
  const [hasFile, setHasFile] = useState(false);
  const [dataArray, setDataArray] = useState([]);

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
      const dataArray = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      setDataArray(dataArray);
    };
    reader.readAsArrayBuffer(newFile);
  };

  const handleButtonClick = () => {
    document.getElementById("fileInput").click();
  };

  //Selección Tipo de Muestra
  let componente = null;
  const [select, setSelect] = useState(
    {
      seleccion: "",
    },
    [dataArray]
  );

  const handleChange = (event) => {
    setSelect(
      {
        ...select,
        [event.target.name]: event.target.value,
      },
      [dataArray]
    );
  };

  if (select.seleccion === "") {
    componente = <NoOption />;
  } else if (select.seleccion === "mas") {
    componente = <Mas dataArray={dataArray} />;
  } else if (select.seleccion === "emas") {
    componente = <EstimadoresMas dataArray={dataArray} />;
  } else if (select.seleccion === "mpe") {
    componente = <Mpe dataArray={dataArray} />;
  } else if (select.seleccion === "empe") {
    componente = <EstimadoresMpe dataArray={dataArray} />;
  }

  return (
    <div>
      <section
        onDragOver={(event) => event.preventDefault()}
        onDrop={handleDrop}
      >
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
      </section>

      <section>
        <select
          id="seleccion"
          name="seleccion"
          value={select.seleccion}
          onChange={handleChange}
        >
          <option value="">Seleccione que le gustaria hacer</option>
          <option value="mas">Muestra Aleatoria Simple</option>
          <option value="emas">Estimadores de Muestra Aleatoria Simple</option>
          <option value="mpe">Muestra por Estrato</option>
          <option value="empe">Estimadores de Muestra por Estrato</option>
        </select>

        {componente}
      </section>
    </div>
  );
};

export default DisplayData;
