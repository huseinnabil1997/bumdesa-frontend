import { alphabetRegex, htmlTagRegex, numberRegex } from 'src/utils/regex';
import * as Yup from 'yup';

export const stepFourSchema = Yup.object().shape({
  name: Yup.string()
    .required('Nama manager wajib diisi')
    .matches(
      alphabetRegex,
      'Nama manager harus mengandung huruf dan hanya boleh mengandung angka, spasi, serta simbol petik'
    )
    .test(
      'no-html',
      'Nama manager tidak boleh mengandung tag HTML',
      (value) => !htmlTagRegex.test(value)
    ),
  phone: Yup.string()
    .required('Nomor telepon wajib diisi')
    .matches(
      numberRegex,
      'Nomor telepon harus diawali dengan 08 dan tidak boleh mengandung (.) dan (,)'
    )
    .min(10, 'Nomor telepon minimal diisi 10 digit')
    .max(15, 'Nomor telepon maksimal diisi 15 digit'),
  image: Yup.mixed().required('Foto manager wajib diisi'),
});

export const fourDefaultValues = {
  name: '',
  image: null,
  position: 'Manager',
  phone: '',
};
