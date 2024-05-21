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
