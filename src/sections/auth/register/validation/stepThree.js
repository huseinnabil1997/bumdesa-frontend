import * as Yup from 'yup';

export const StepThreeSchema = Yup.object().shape({
  name: Yup.string().required('Nama unit usaha wajib diisi'),
  email: Yup.string().email().required('Email unit usaha wajib diisi'),
  sector: Yup.mixed().required('Sektor unit usaha wajib diisi'),
  image: Yup.mixed().required('Foto unit usaha wajib diisi'),
});

export const threeDefaultValues = {
  name: '',
  email: '',
  image: null,
  sector: null,
};
