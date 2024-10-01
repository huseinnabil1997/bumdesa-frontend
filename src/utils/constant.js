export const JURNAL_HEAD = [
  { id: 'col', label: '' },
  { id: 'nomor_bukti', label: 'Nomor Bukti', align: 'left', width: 300 },
  { id: 'tanggal', label: 'Tanggal', align: 'left', width: 150 },
  { id: 'keterangan', label: 'Keterangan', align: 'left', width: 300 },
  { id: 'unit', label: 'Unit Usaha', align: 'left', width: 300 },
  { id: 'debit', label: 'Debit', align: 'left', width: 300 },
  { id: 'kredit', label: 'Kredit', align: 'left', width: 300 },
  { id: 'action', label: 'Action', align: 'center', width: 100 },
];

export const JURNAL_HEAD_PENGAWAS = [
  { id: 'col', label: '' },
  { id: 'nomor_bukti', label: 'Nomor Bukti', align: 'left', width: 300 },
  { id: 'tanggal', label: 'Tanggal', align: 'left', width: 150 },
  { id: 'keterangan', label: 'Keterangan', align: 'left', width: 300 },
  { id: 'unit', label: 'Unit Usaha', align: 'left', width: 300 },
  { id: 'debit', label: 'Debit', align: 'left', width: 300 },
  { id: 'kredit', label: 'Kredit', align: 'left', width: 300 },
];

export const LEDGER_HEAD = [
  { id: 'tanggal', label: 'Tanggal', align: 'left', width: 150 },
  { id: 'nomor_bukti', label: 'Nomor Bukti', align: 'left', width: 300 },
  { id: 'keterangan', label: 'Keterangan', align: 'left', width: 300 },
  { id: 'unit', label: 'Unit Usaha', align: 'left', width: 300 },
  { id: 'debit', label: 'Debit', align: 'left', width: 250 },
  { id: 'kredit', label: 'Kredit', align: 'left', width: 250 },
  { id: 'saldo', label: 'Saldo', align: 'left', width: 250 },
];

export const PROFIT_HEAD = [
  { id: 'nama_akun', label: 'Nama Akun', align: 'left', width: 480 },
  { id: 'saldo', label: 'Saldo', align: 'left', width: 480 },
];

export const BUMDES_HEAD = [
  { id: 'name_sticky', label: 'Nama Daerah', align: 'left', minWidth: 200 },
  { id: 'jumlah_bumdesa', label: 'Total BUMDesa', align: 'left', minWidth: 150 },
  { id: 'jumlah_unit', label: 'Total Unit Usaha', align: 'left', minWidth: 150 },
  { id: 'total_registered', label: 'BUM Desa Registrasi', align: 'left', minWidth: 150 },
  { id: 'total_active', label: 'BUM Desa Aktif', align: 'left', minWidth: 150 },
  { id: 'input_laporan', label: 'Input Laporan Keuangan', align: 'left', minWidth: 150 },
  { id: 'total_omzet', label: 'Total Omzet', align: 'left', minWidth: 200 },
  { id: 'profit_loss', label: 'Laba/Rugi', align: 'left', minWidth: 200 },
  { id: 'total_cash', label: 'Total Kas Tunai', align: 'left', minWidth: 200 },
  { id: 'detail', label: 'Detail', align: 'center', minWidth: 100 },
];

export const BUMDES_DETAIL_HEAD = [
  { id: 'name_sticky', label: 'Nama BUM Desa', align: 'left', minWidth: 200 },
  { id: 'jumlah_unit', label: 'Total Unit Usaha', align: 'left', minWidth: 150 },
  { id: 'created_year', label: 'Tahun Registrasi', align: 'left', minWidth: 150 },
  { id: 'status', label: 'Status Aktivasi BUM Desa', align: 'center', minWidth: 175 },
  { id: 'report', label: 'Status Laporan Keuangan', align: 'center', minWidth: 175 },
  { id: 'total_omzet', label: 'Total Omzet', align: 'left', minWidth: 200 },
  { id: 'profit_loss', label: 'Laba/Rugi', align: 'left', minWidth: 200 },
  { id: 'total_cash', label: 'Total Kas Tunai', align: 'left', minWidth: 200 },
  { id: 'detail', label: 'Detail', align: 'center', minWidth: 100 },
];

export const SUPERVISOR_HEAD = [
  { id: 'name', label: 'Nama', align: 'left' },
  { id: 'title', label: 'Jabatan', align: 'left' },
  { id: 'email', label: 'Email', align: 'left' },
  { id: '', label: '', align: 'right', width: 50 },
];

export const LOG_HEAD = [
  { id: 'activity', label: 'Aktivitas', align: 'left', width: 200 },
  { id: 'time', label: 'Waktu', align: 'left', width: 100 },
  { id: 'place', label: 'Modul', align: 'left', width: 100 },
  { id: 'device', label: 'User Agent', align: 'left', width: 200 },
  { id: '', label: '', align: 'left', width: 50 },
];

export const DEFAULT_FILTER = {
  limit: 10,
  page: 1,
};

export const fileType = [
  '',
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/csv',
];

export const extType = ['', '.pdf', '.xlsx', '.csv'];

export const stepperTutorial = [
  {
    target: '.transaction-information',
    content: 'Masukkan keterangan transaksi di sini.',
    disableBeacon: true,
  },
  {
    target: '.date-picker',
    content: 'Pilih tanggal transaksi di sini.',
    disableBeacon: true,
  },
  {
    target: '.number-of-evidence',
    content: 'Nomor bukti akan otomatis terbuat.',
    disableBeacon: true,
  },
  {
    target: '.first-balance',
    content: 'Tanda ini menandakan bahwa transaksi ini adalah saldo awal.',
    disableBeacon: true,
  },
  {
    target: '.account-code',
    content: 'Pilih akun di sini.',
    disableBeacon: true,
  },
  {
    target: '.debit',
    content: 'Masukkan jumlah debit di sini.',
    disableBeacon: true,
  },
  {
    target: '.credit',
    content: 'Masukkan jumlah kredit di sini.',
    disableBeacon: true,
  },
  {
    target: '.cash-flow-code',
    content: 'Pilih jenis arus kas di sini.',
    disableBeacon: true,
  },
  {
    target: '.btn-add-account',
    content: 'Tambahkan akun di sini.',
    disableBeacon: true,
  },
  {
    target: '.balance-indicator',
    content: 'Lihat indikator keseimbangan di sini.',
    disableBeacon: true,
  },
  {
    target: '.total-debit',
    content: 'Lihat total debit di sini.',
    disableBeacon: true,
  },
  {
    target: '.total-credit',
    content: 'Lihat total kredit di sini.',
    disableBeacon: true,
  },
  {
    target: '.btn-save',
    content: 'Simpan jurnal di sini.',
    disableBeacon: true,
  },
]

export const TABLE_HEAD_DATA_BUMDESA = [
  { id: 'name_sticky', label: 'Nama BUM Desa', align: 'left', minWidth: 200 },
  { id: 'unit_count', label: 'Jumlah Unit Usaha', align: 'left', minWidth: 150 },
  { id: 'registration_date', label: 'Tahun Registrasi', align: 'left', minWidth: 150 },
  { id: 'activation_status', label: 'Status Aktivasi BUMDesa', align: 'center', minWidth: 150 },
  { id: 'financial_status', label: 'Status Laporan Keuangan', align: 'center', minWidth: 150 },
  { id: 'profitability', label: 'Profitabilitas', align: 'left', minWidth: 150 },
  { id: 'liquidity', label: 'Liquiditas', align: 'left', minWidth: 150 },
  { id: 'solvency', label: 'Solvabilitas', align: 'left', minWidth: 150 },
  { id: 'total_omset', label: 'Total Omset', align: 'left', minWidth: 150 },
  { id: 'profit', label: 'Laba Rugi', align: 'left', minWidth: 150 },
  { id: 'cash_balance', label: 'Total Kas Tunai', align: 'left', minWidth: 150 },
  { id: 'detail', label: 'Detail', align: 'center', minWidth: 100 },
];

export const TABLE_HEAD_DATA_UNIT = [
  { id: 'name_sticky', label: 'Nama Unit Usaha', align: 'left', minWidth: 200 },
  { id: 'bumdesa_name', label: 'Nama BUMDesa', align: 'left', minWidth: 200 },
  { id: 'registration_date', label: 'Tahun Registrasi', align: 'left', minWidth: 150 },
  { id: 'financial_status', label: 'Status Laporan Keuangan', align: 'center', minWidth: 150 },
  { id: 'profitability', label: 'Profitabilitas', align: 'left', minWidth: 150 },
  { id: 'liquidity', label: 'Liquiditas', align: 'left', minWidth: 150 },
  { id: 'solvency', label: 'Solvabilitas', align: 'left', minWidth: 150 },
  { id: 'total_omset', label: 'Total Omset', align: 'left', minWidth: 150 },
  { id: 'profit', label: 'Laba Rugi', align: 'left', minWidth: 150 },
  { id: 'cash_balance', label: 'Total Kas Tunai', align: 'left', minWidth: 150 },
  { id: 'detail', label: 'Detail', align: 'center', minWidth: 100 },
];
