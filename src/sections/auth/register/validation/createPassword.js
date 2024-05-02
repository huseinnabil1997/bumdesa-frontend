import * as Yup from 'yup';

export const ChangePassSchema = Yup.object().shape({
  old_password: Yup.string().required('Kata sandi lama wajib diisi'),
  password: Yup.string().required('Kata sandi baru wajib diisi'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Kata sandi tidak sama')
    .required('Konfirmasi kata sandi wajib diisi'),
});

export const passwordDefaultValues = {
  name: '',
  old_password: '',
  password: '',
  confirm_password: '',
};
