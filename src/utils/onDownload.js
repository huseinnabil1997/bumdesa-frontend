import { saveAs } from 'file-saver';
import { extType, fileType } from './constant';

const onDownload = ({ file, code, type, title = '_report' }) => {
  const blob = new Blob([file], { type: fileType[type ?? 1] });

  saveAs(blob, `${code ?? ''}${title}${extType[type ?? 1]}`);
};

export default onDownload;
