import React, { useRef } from 'react';
import * as XLSX from 'xlsx';

const ExcelDownload = () => {
  const fileInputRef = useRef(null);

  const handleDownload = () => {
    // Get the input file
    const file = fileInputRef.current.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const updatedData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Update the empty cells with input values
        const newData = updatedData.map((row, rowIndex) => {
          return row.map((cell, colIndex) => {
            if (cell === '') {
              const inputId = `input_${rowIndex}_${colIndex}`;
              const inputElement = document.getElementById(inputId);
              if (inputElement) {
                return inputElement.value;
              }
            }
            return cell;
          });
        });

        // Create a new workbook with updated data
        const newWorkbook = XLSX.utils.book_new();
        const newWorksheet = XLSX.utils.aoa_to_sheet(newData);
        XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, 'Sheet 1');

        // Generate Excel file
        const excelData = XLSX.write(newWorkbook, { type: 'array', bookType: 'xlsx' });

        // Download the Excel file
        const blob = new Blob([excelData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'updated_file.xlsx';
        a.click();
        URL.revokeObjectURL(url);
      };

      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      <input type="file" ref={fileInputRef} />
      <br />
      <button onClick={handleDownload}>Download Excel</button>
    </div>
  );
};

export default ExcelDownload;
