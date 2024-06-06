// import { positiveRegex } from 'src/utils/regex';
import * as Yup from 'yup';

export const StepOneSchema = Yup.object().shape({
  name: Yup.string().required('Nama BUM Desa wajib diisi'),
  bumdesa_id: Yup.string().required('ID BUM Desa wajib diisi'),
  address: Yup.string().required('Alamat BUM Desa wajib diisi'),
  province: Yup.mixed().required('Provinsi wajib diisi'),
  city: Yup.mixed().required('Kabupaten wajib diisi'),
  district: Yup.mixed().required('Kecamatan wajib diisi'),
  subdistrict: Yup.mixed().required('Desa wajib diisi'),
  postal_code: Yup.string().min(5, 'Harus diisi 5 digit').max(5, 'Harus diisi 5 digit'),
  founded_at: Yup.string().required('Tahun berdiri BUM Desa wajib diisi').nullable(),
  image: Yup.mixed().required('Foto BUM Desa wajib diisi'),
  image_logo: Yup.mixed().required('Logo BUM Desa wajib diisi'),
  employees: Yup.number()
    .transform(value => (isNaN(value) ? 0 : value))
    .positive('Hanya dapat diisi angka positif')
    .integer('Hanya dapat diisi angka bulat')
    .min(3, 'Jumlah pegawai tetap minimal adalah 3')
    .required('Jumlah pegawai tetap wajib diisi'),
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
