import { alphabetRegex, htmlTagRegex } from 'src/utils/regex';
import * as Yup from 'yup';

export const StepThreeSchema = Yup.object().shape({
  name: Yup.string()
    .required('Nama unit usaha wajib diisi')
    .matches(alphabetRegex, 'Nama Unit Usaha harus mengandung huruf dan hanya boleh mengandung angka, spasi, serta simbol yang diperbolehkan')
    .test('no-html', 'Nama Unit Usaha tidak boleh mengandung tag HTML', value => !htmlTagRegex.test(value)),
  email: Yup.string().email().required('Email unit usaha wajib diisi'),
  sector: Yup.mixed().required('Sektor unit usaha wajib diisi'),
  image: Yup.mixed().required('Foto unit usaha wajib diisi'),
});

export const threeDefaultValues = {
  name: '',
  email: '',
  image: null,
  sector: null,
  year_founded: new Date(),
};
