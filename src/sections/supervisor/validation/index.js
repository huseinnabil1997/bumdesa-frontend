import { alphabetRegex, htmlTagRegex } from 'src/utils/regex';
import * as Yup from 'yup';

export const supervisorSchema = Yup.object().shape({
  name: Yup.string()
    .required('Nama pengawas wajib diisi')
    .matches(
      alphabetRegex,
      'Nama pengawas harus mengandung huruf dan hanya boleh mengandung angka, spasi, serta simbol petik'
    )
    .test(
      'no-html',
      'Nama pengawas tidak boleh mengandung tag HTML',
      (value) => !htmlTagRegex.test(value)
    ),
  title: Yup.string()
    .required('Jabatan wajib diisi')
    .matches(
      alphabetRegex,
      'Jabatan harus mengandung huruf dan hanya boleh mengandung angka, spasi, serta simbol petik'
    )
    .test(
      'no-html',
      'Jabatan tidak boleh mengandung tag HTML',
      (value) => !htmlTagRegex.test(value)
    ),
  email: Yup.string().required('Alamat email wajib diisi').email('Format email tidak sesuai'),
});
