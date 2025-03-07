// import { positiveRegex } from 'src/utils/regex';
import { alphabetAddressRegex, alphabetRegex, htmlTagRegex } from 'src/utils/regex';
import * as Yup from 'yup';

export const StepOneSchema = Yup.object().shape({
  name: Yup.string()
    .required('Nama BUM Desa wajib diisi')
    .matches(
      alphabetRegex,
      'Nama BUM Desa harus mengandung huruf dan hanya boleh mengandung angka, spasi, serta simbol petik'
    )
    .test(
      'no-html',
      'Nama BUM Desa tidak boleh mengandung tag HTML',
      (value) => !htmlTagRegex.test(value)
    ),
  bumdesa_id: Yup.string()
    .min(19, 'ID BUM Desa harus teridiri dari 17 digit angka')
    .required('ID BUM Desa wajib diisi'),
  address: Yup.string()
    .required('Alamat BUM Desa wajib diisi')
    .matches(
      alphabetAddressRegex,
      `Alamat BUM Desa harus mengandung huruf dan hanya boleh mengandung angka, spasi, serta simbol(' " / . , -)`
    )
    .test(
      'no-html',
      'Alamat BUM Desa tidak boleh mengandung tag HTML',
      (value) => !htmlTagRegex.test(value)
    ),
  province: Yup.mixed().required('Provinsi wajib diisi'),
  city: Yup.mixed().required('Kabupaten wajib diisi'),
  district: Yup.mixed().required('Kecamatan wajib diisi'),
  subdistrict: Yup.mixed().required('Desa wajib diisi'),
  postal_code: Yup.string()
    .required('Kode pos wajib diisi')
    .min(5, 'Harus diisi 5 digit')
    .max(5, 'Harus diisi 5 digit'),
  founded_at: Yup.string().required('Tanggal berdiri BUM Desa wajib diisi').nullable(),
  image: Yup.mixed().required('Foto BUM Desa wajib diisi'),
  image_logo: Yup.mixed().required('Logo BUM Desa wajib diisi'),
  employees: Yup.number()
    .nullable()
    .transform((value, originalValue) => (`${originalValue}`.trim() === '' ? null : value))
    .required('Jumlah pegawai tetap wajib diisi')
    .positive('Hanya dapat diisi angka positif')
    .integer('Hanya dapat diisi angka bulat')
    .min(3, 'Jumlah pegawai tetap minimal adalah 3')
    .max(1000, 'Jumlah pegawai tetap maksimal adalah 1000'),
});

export const oneDefaultValues = {
  name: '',
  bumdesa_id: '',
  address: '',
  province: null,
  city: null,
  district: null,
  subdistrict: null,
  postal_code: '',
  founded_at: '',
  employees: 0,
  image: null,
  image_logo: null,
};
