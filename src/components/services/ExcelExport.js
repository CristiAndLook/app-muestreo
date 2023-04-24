function ExcelExport({ muestra, data, header }) {
  //Eliminar el primer elemento del array


  const exportToExcel = (data) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    XLSX.writeFile(wb, "sheetjs.xlsx");
  };

  return (
    <div>
      <p>muestra = {muestra}</p>
    </div>
  );
}

export default ExcelExport;
