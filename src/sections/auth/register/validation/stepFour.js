import { numberRegex } from 'src/utils/regex';
import * as Yup from 'yup';

export const stepFourSchema = Yup.object().shape({
  name: Yup.string().required('Nama manajer wajib diisi'),
  phone: Yup.string()
    .required('Nomor telepon wajib diisi')
    .matches(numberRegex, 'Nomor telepon harus diawali dengan 62 dan minimal 10 digit')
    .min(10, 'Nomor telepon minimal diisi 10 digit')
    .max(15, 'Nomor telepon minimal diisi 15 digit'),
  image: Yup.mixed().required('Foto manajer wajib diisi'),
});

export const fourDefaultValues = {
  name: '',
  image: null,
  position: 'Manajer',
  phone: '',
};
