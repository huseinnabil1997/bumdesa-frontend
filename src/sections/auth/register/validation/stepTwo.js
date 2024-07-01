import { alphabetRegex, htmlTagRegex, numberRegex } from 'src/utils/regex';
import * as Yup from 'yup';

const organizationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Nama pengurus wajib diisi')
    .matches(alphabetRegex, 'Nama pengurus harus mengandung huruf dan hanya boleh mengandung angka, spasi, serta simbol yang diperbolehkan')
    .test('no-html', 'Nama pengurus tidak boleh mengandung tag HTML', value => !htmlTagRegex.test(value)),
  phone: Yup.string()
    .required('Nomor telepon wajib diisi')
    .matches(numberRegex, 'Nomor telepon harus diawali dengan 08 dan minimal 10 digit')
    .min(10, 'Nomor telepon minimal diisi 10 digit')
    .max(15, 'Nomor telepon minimal diisi 15 digit'),
  image: Yup.mixed().required('Foto pengurus wajib diisi'),
});

export const StepTwoSchema = Yup.object().shape({
  name: Yup.string()
    .required('Nama direktur wajib diisi')
    .matches(alphabetRegex, 'Nama direktur harus mengandung huruf dan hanya boleh mengandung angka, spasi, serta simbol yang diperbolehkan')
    .test('no-html', 'Nama direktur tidak boleh mengandung tag HTML', value => !htmlTagRegex.test(value)),
  phone: Yup.string()
    .required('Nomor telepon wajib diisi')
    .matches(numberRegex, 'Nomor telepon harus diawali dengan 08 dan minimal 10 digit')
    .min(10, 'Nomor telepon minimal diisi 10 digit')
    .max(15, 'Nomor telepon maksimal diisi 15 digit'),
  image: Yup.mixed().required('Foto direktur wajib diisi'),
  organizations: Yup.array().of(organizationSchema),
});

export const twoDefaultValues = {
  name: '',
  phone: '',
  image: null,
  position: 'Direktur',
  organizations: [
    { name: '', phone: '', position: 'Sekretaris', image: null },
    { name: '', phone: '', position: 'Bendahara', image: null },
  ],
};
