import axios from 'axios';

export const handleDrop = (acceptedFiles, callback) => {
  const file = acceptedFiles[0];

  if (file) {
    callback(
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
  }
};

export const fDate = (inputDate) => {
  const date = inputDate;
  const year = date?.getFullYear();
  const month = String(date?.getMonth() + 1).padStart(2, '0');
  const day = String(date?.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
};

export const isTotalName = (nama) => {
  const lowerNama = nama.toLowerCase().trim();
  return (
    lowerNama === 'total aset' ||
    lowerNama === 'total kewajiban' ||
    lowerNama === 'total ekuitas' ||
    lowerNama === 'total pendapatan usaha' ||
    lowerNama === 'total harga pokok penjualan' ||
    lowerNama === 'total beban-beban usaha' ||
    lowerNama === 'total pendapatan dan beban lain-lain' ||
    lowerNama === 'penyertaan modal akhir' ||
    lowerNama === 'total penyertaan modal akhir' ||
    lowerNama === 'total saldo laba akhir' ||
    lowerNama === 'arus kas bersih dari aktivitas operasi' ||
    lowerNama === 'total arus kas bersih dari aktivitas operasi' ||
    lowerNama === 'arus kas bersih dari aktivitas investasi' ||
    lowerNama === 'total arus kas bersih dari aktivitas investasi' ||
    lowerNama === 'arus kas bersih dari aktivitas pembiayaan' ||
    lowerNama === 'total arus kas bersih dari aktivitas pembiayaan'
  );
};

export const checkUrlImage = async (url) => {
  axios
    .get(url)
    .then(() => true)
    .catch((error) => {
      console.log('Get Image Error', error);
      return false;
    });
};
