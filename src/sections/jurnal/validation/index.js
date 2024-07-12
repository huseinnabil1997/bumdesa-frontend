import moment from 'moment';
import { alphabetRegex, htmlTagRegex } from 'src/utils/regex';
import * as Yup from 'yup';

const negativeCase = /^(?!.*-).*$/;

const accountsSchema = Yup.object().shape({
  account_code: Yup.mixed()
    .required('Nama akun wajib diisi')
    .test('no-html', 'Nama tidak boleh mengandung tag HTML', (value) => !htmlTagRegex.test(value)),
  debit: Yup.string()
    .matches(negativeCase, 'Hanya nominal postif')
    .max(10, 'Maks nominal 1 miliar')
    .nullable(),
  credit: Yup.string()
    .matches(negativeCase, 'Hanya nominal postif')
    .max(10, 'Maks nominal 1 miliar')
    .nullable(),
  cash_flow_code: Yup.mixed().nullable(),
});

export const jurnalSchema = Yup.object().shape({
  transaction_information: Yup.string()
    .required('Keterangan transaksi wajib diisi')
    .matches(
      alphabetRegex,
      'Keterangan transaksi harus mengandung huruf dan hanya boleh mengandung angka, spasi, serta simbol petik'
    )
    .test(
      'no-html',
      'Keterangan transaksi tidak boleh mengandung tag HTML',
      (value) => !htmlTagRegex.test(value)
    ),
  date: Yup.string().required('Tanggal wajib diisi'),
  number_of_evidence: Yup.string().required(),
  accounts: Yup.array().of(accountsSchema),
});

export const searchJurnalSchema = Yup.object().shape({
  search: Yup.string().test(
    'no-html',
    'Nomor bukti tidak boleh mengandung tag HTML',
    (value) => !htmlTagRegex.test(value)
  ),
});

export const jurnalDefaultValues = {
  transaction_information: '',
  date: moment().format('yyyy-MM-DD'),
  number_of_evidence: '',
  is_first_balance: false,
  accounts: [{ name: null, debit: null, credit: null, cash_flow_code: null }],
};
