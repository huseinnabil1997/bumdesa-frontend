import { alphabetRegex, htmlTagRegex } from 'src/utils/regex';
import * as Yup from 'yup';

const passRegex = /^(?=.*[~!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/;

export const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .required('Nama wajib diisi')
    .matches(alphabetRegex, 'Nama Nama harus mengandung huruf dan hanya boleh mengandung angka, spasi, serta simbol petik')
    .test('no-html', 'Nama tidak boleh mengandung tag HTML', value => !htmlTagRegex.test(value)),
  email: Yup.string().email('Format email tidak sesuai').required('Email wajib diisi'),
  password: Yup.string()
    .min(12, 'Minimal 12 Karakter')
    .matches(passRegex, 'Format tidak sesuai')
    .required('Kata sandi wajib diisi'),
  're-password': Yup.string()
    .oneOf([Yup.ref('password'), null], 'Kata sandi tidak sama')
    .required('Konfirmasi kata sandi wajib diisi'),
  termsAndConditions: Yup.boolean()
    .oneOf([true], 'Syarat dan Ketentuan harus disetujui')
    .required('Syarat dan Ketentuan wajib diisi'),
  privacyPolicy: Yup.boolean()
    .oneOf([true], 'Kebijakan Privasi harus disetujui')
    .required('Kebijakan Privasi wajib diisi'),
});

export const registerDefaultValues = {
  name: '',
  email: '',
  password: '',
  're-password': '',
  termsAndConditions: false,
  privacyPolicy: false,
};
