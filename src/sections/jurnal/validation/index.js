import moment from 'moment';
import * as Yup from 'yup';

const negativeCase = /^(?!.*-).*$/;

const accountsSchema = Yup.object().shape({
  account_code: Yup.mixed().required('Nama akun wajib diisi'),
  debit: Yup.string()
    .matches(negativeCase, 'Hanya nominal postif')
    .max(10, 'Maks nominal 1 milyar')
    .nullable(),
  credit: Yup.string()
    .matches(negativeCase, 'Hanya nominal postif')
    .max(10, 'Maks nominal 1 milyar')
    .nullable(),
  cash_flow_code: Yup.mixed().nullable(),
});

export const jurnalSchema = Yup.object().shape({
  transaction_information: Yup.string().required('Keterangan Transaksi wajib diisi'),
  date: Yup.string().required('Tanggal wajib diisi'),
  number_of_evidence: Yup.string().required(),
  accounts: Yup.array().of(accountsSchema),
});

export const jurnalDefaultValues = {
  transaction_information: '',
  date: moment().format('yyyy-MM-DD'),
  number_of_evidence: '',
  is_first_balance: false,
  accounts: [{ name: null, debit: 0, credit: 0, cash_flow_code: null }],
};
