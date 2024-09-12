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

export const LOG_HEAD = [
  { id: 'activity', label: 'Aktivitas', align: 'left', width: 200 },
  { id: 'time', label: 'Waktu', align: 'left', width: 100 },
  { id: 'place', label: 'Modul', align: 'left', width: 100 },
  { id: 'device', label: 'User Agent', align: 'left', width: 200 },
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
