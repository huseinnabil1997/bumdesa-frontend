import { numberRegex } from 'src/utils/regex';
import * as Yup from 'yup';

export const stepFourSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^(?=.*[a-zA-Z])[a-zA-Z\s!@#$%^&*(),.?":{}|<>-]*$/, 'Nama harus mengandung huruf dan hanya boleh mengandung spasi serta simbol yang diperbolehkan')
    .notOneOf(['<', '>', '/'], 'Nama tidak boleh mengandung script atau tag HTML')
    .required('Nama manajer wajib diisi'),
  phone: Yup.string()
    .required('Nomor telepon wajib diisi')
    .matches(numberRegex, 'Nomor telepon harus diawali dengan 08 dan minimal 10 digit')
    .min(10, 'Nomor telepon minimal diisi 10 digit')
    .max(15, 'Nomor telepon maksimal diisi 15 digit'),
  image: Yup.mixed().required('Foto manajer wajib diisi'),
});

export const fourDefaultValues = {
  name: null,
  image: null,
  position: 'Manajer',
  phone: null,
};
