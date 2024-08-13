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
  { id: 'nama_provinsi', label: 'Nama Provinsi', align: 'left', minWidth: 180 },
  { id: 'jumlah_bumdesa', label: 'Jumlah BUMDesa', align: 'left', minWidth: 160 },
  { id: 'jumlah_unit', label: 'Jumlah Unit Usaha', align: 'left', minWidth: 160 },
  { id: 'input_laporan', label: 'Input Laporan Keuangan', align: 'left', minWidth: 160 },
  { id: 'total_kas', label: 'Total Kas Tunai', align: 'left', minWidth: 240 },
  { id: 'profitabilitas', label: 'Profitabilitas', align: 'left', minWidth: 240 },
  { id: 'liquiditas', label: 'Liquiditas', align: 'left', minWidth: 240 },
  { id: 'solvabilitas', label: 'Solvabilitas', align: 'left', minWidth: 240 },
  { id: 'total_omzet', label: 'Total Omzet', align: 'left', minWidth: 240 },
  { id: 'profit_loss', label: 'Laba/Rugi', align: 'left', minWidth: 240 },
  { id: 'action', label: 'Aksi', align: 'center', minWidth: 100 },
];

export const LOG_HEAD = [
  { id: 'activity', label: 'Aktivitas', align: 'left', width: 200 },
  { id: 'time', label: 'Waktu', align: 'left', width: 100 },
  { id: 'place', label: 'Tempat', align: 'left', width: 100 },
  { id: 'device', label: 'Perangkat', align: 'left', width: 200 },
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
