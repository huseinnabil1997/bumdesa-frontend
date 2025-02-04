const fs = require('fs');
const path = require('path');
const ExcelJS = require('exceljs');

async function listFilesInDirectory(directoryPath, basePath, fileList = [], workbook, worksheet) {
  const files = await fs.promises.readdir(directoryPath);

  for (const file of files) {
    const filePath = path.join(directoryPath, file);
    const relativePath = path.relative(basePath, filePath);
    const stat = await fs.promises.stat(filePath);

    if (stat.isFile() && path.extname(file)) {
      const fileType = path.extname(file).toUpperCase();
      const compileDate = stat.mtime.toISOString().split('T')[0];
      const fileSize = (stat.size / 1024).toFixed(2); // Ukuran file dalam KBytes
      const firstFolder = relativePath.split(path.sep)[0];
      const remark = firstFolder === 'pages' ? 'view' : firstFolder;

      // Tambahkan logika untuk memeriksa created date
      const createdDate = new Date(stat.birthtime);
      const updatedDate = new Date(stat.mtime);
      const september2024 = new Date('2025-01-01');
      const january2025 = new Date('2025-01-01');

      if ((createdDate <= september2024) || (updatedDate > january2025)) {
        fileList.push({
          no: fileList.length + 1,
          libraryObject: relativePath,
          type: fileType,
          compileDate: compileDate,
          size: fileSize,
          remark: remark,
        });
      }
    } else if (stat.isDirectory()) {
      await listFilesInDirectory(filePath, basePath, fileList, workbook, worksheet);
    }
  }

  if (directoryPath === basePath) {
    fileList.forEach((file, index) => {
      worksheet.addRow({
        No: file.no,
        'Library/Object': file.libraryObject,
        Type: file.type,
        'Compile/Promote Date': file.compileDate,
        Size: file.size,
        Remark: file.remark,
      });
    });

    await workbook.xlsx.writeFile('MIG_v2_3.xlsx');
  }
}

async function createExcelFile() {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('File List');

  worksheet.columns = [
    { header: 'No', key: 'No', width: 5 },
    { header: 'Library/Object', key: 'Library/Object', width: 50 },
    { header: 'Type', key: 'Type', width: 10 },
    { header: 'Compile/Promote Date', key: 'Compile/Promote Date', width: 20 },
    { header: 'Size', key: 'Size', width: 10 },
    { header: 'Remark', key: 'Remark', width: 30 },
  ];

  await listFilesInDirectory(
    path.join(__dirname, 'src'),
    path.join(__dirname, 'src'),
    [],
    workbook,
    worksheet
  );
}

createExcelFile();
