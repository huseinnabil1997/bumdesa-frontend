import axios from 'src/utils/axiosCoreService';
import axiosMinio from 'axios';

export function getJurnals(param) {
  return axios.get('journals', { params: param });
}

export function getJurnal(id) {
  return axios.get(`journals/${id}`);
}

export function createJurnal(payload) {
  return axios.post(`journals`, payload);
}

export function updateJurnal({ id, payload }) {
  return axios.patch(`journals/${id}`, payload);
}

export function deleteJurnal(id) {
  return axios.delete(`journals/${id}`);
}

export function downloadJurnal(param) {
  return axios.get(`journals/report-generate`, {
    params: param,
    responseType: 'blob',
  });
}

export function downloadJurnalTemplate(param) {
  let url = '';
  if (param.type === 2) {
    url = `${process.env.NEXT_PUBLIC_BUMDESA_ASSET}journal-template/template_jurnal.xlsx`;
  } else if (param.type === 5) {
    url = `${process.env.NEXT_PUBLIC_BUMDESA_ASSET}tutorial/tutorial.mp4`;
  } else if (param.type === 1) {
    url = `${process.env.NEXT_PUBLIC_BUMDESA_ASSET}tutorial/tutorial.pdf`;
  }

  return axiosMinio.get(url, {
    params: param,
    responseType: 'blob',
  });
}

export function getSystemFlag() {
  return axios.get('sysflag/T01');
}

export function generateEvidenceNumber(params) {
  return axios.get('number-of-evidence', { params });
}

export function uploadJurnals(payload) {
  const formData = new FormData();

  formData.append('file', payload.file);

  return axios.post(`journals/bulk`, formData, {
    onUploadProgress: (progressEvent) => {
      if (payload.up) {
        const percentComplete = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        payload.up(percentComplete);
      }
    },
  });
}

export function submitJurnals(id) {
  const payload = {
    id_upload: id,
  };

  return axios.post(`journals/bulk/submit`, payload);
}

export function downloadJurnalPreview(name) {
  return axios.get(`download/journals/${name}`, {
    responseType: 'blob',
  });
}
