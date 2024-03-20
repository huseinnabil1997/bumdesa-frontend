import { positiveRegex } from 'src/utils/regex';
import * as Yup from 'yup';

export const StepOneSchema = Yup.object().shape({
  name: Yup.string().required('Nama BUM Desa wajib diisi'),
  bumdesa_id_reference: Yup.string().required('ID BUM Desa wajib diisi'),
  address: Yup.string().required('Alamat BUM Desa wajib diisi'),
  province: Yup.mixed().required('Provinsi wajib diisi'),
  city: Yup.mixed().required('Kabupaten wajib diisi'),
  district: Yup.mixed().required('Kecamatan wajib diisi'),
  subdistrict: Yup.mixed().required('Desa wajib diisi'),
  postal_code: Yup.string().required('Kode pos wajib diisi'),
  founded_at: Yup.string().required('Tahun berdiri BUM Desa wajib diisi'),
  image: Yup.mixed().required('Foto BUM Desa wajib diisi'),
  image_logo: Yup.mixed().required('Logo BUM Desa wajib diisi'),
  employees: Yup.string()
    .matches(positiveRegex, 'Hanya dapat diisi angka')
    .required('Jumlah pegawai tetap wajib diisi'),
});

export const oneDefaultValues = {
  name: '',
  bumdesa_id_reference: '',
  address: '',
  province: null,
  city: null,
  district: null,
  subdistrict: null,
  founded_at: null,
  employees: null,
  image: null,
  image_logo: null,
};
