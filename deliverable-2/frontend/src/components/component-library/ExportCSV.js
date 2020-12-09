import React from 'react'

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { UpdateButton } from '../share-styled-component';

// Credit to https://blog.bitsrc.io/exporting-data-to-excel-with-react-6943d7775a92
// Author: Bhargav Bachina
export const ExportCSV = ({csvData, fileName}) => {

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToCSV = (csvData, fileName) => {
        console.log(csvData)
        const ws = XLSX.utils.json_to_sheet(csvData);
        console.log(ws)
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }

    return (
        <UpdateButton  onClick={(e) => exportToCSV(csvData,fileName)}>Export</UpdateButton>
    )
}