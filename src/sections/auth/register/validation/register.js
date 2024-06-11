import * as Yup from 'yup';

export const RegisterSchema = Yup.object().shape({
  name: Yup.string().required('Nama wajib diisi'),
  email: Yup.string().email().required('Email wajib diisi'),
  password: Yup.string().required('Kata sandi wajib diisi'),
  're-password': Yup.string()
    .oneOf([Yup.ref('password'), null], 'Kata sandi tidak sama')
    .required('Konfirmasi kata sandi wajib diisi'),
  termsAndConditions: Yup.boolean().required('Syarat dan Ketentuan wajib diisi'),
});

export const registerDefaultValues = {
  name: '',
  email: '',
  password: '',
  're-password': '',
  termsAndConditions: false,
};
