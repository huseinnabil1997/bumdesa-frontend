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
