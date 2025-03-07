import moment from 'moment';
import { alphabetRegex, htmlTagRegex } from 'src/utils/regex';
import * as Yup from 'yup';

export const StepThreeSchema = Yup.object().shape({
  name: Yup.string()
    .required('Nama unit usaha wajib diisi')
    .matches(
      alphabetRegex,
      'Nama Unit Usaha harus mengandung huruf dan hanya boleh mengandung angka, spasi, serta simbol petik'
    )
    .test(
      'no-html',
      'Nama Unit Usaha tidak boleh mengandung tag HTML',
      (value) => !htmlTagRegex.test(value)
    ),
  email: Yup.string().email('Format email tidak sesuai').required('Email unit usaha wajib diisi'),
  sector: Yup.mixed().required('Sektor unit usaha wajib diisi'),
  image: Yup.mixed().required('Foto unit usaha wajib diisi'),
  year_founded: Yup.object().nullable().required('Tahun Berdiri wajib dipilih'),
});

export const threeDefaultValues = {
  name: '',
  email: '',
  image: null,
  sector: null,
  year_founded: { value: moment().format('yyyy'), label: moment().format('yyyy') },
};
