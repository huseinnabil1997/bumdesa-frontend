import { fileType } from './constant';

const onPreview = ({ file, type }) => {
  const blob = new Blob([file], { type: fileType[type ?? 1] });
  const blobUrl = URL.createObjectURL(blob);

  window.open(blobUrl);
};

export default onPreview;
