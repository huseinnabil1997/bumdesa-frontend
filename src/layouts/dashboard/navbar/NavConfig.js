// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Label from '../../../components/Label';
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  create: getIcon('ic_create'),
  referral: getIcon('ic_referral'),
  help: getIcon('ic_help'),
  profile: getIcon('ic_profile'),
  star: getIcon('ic_star'),
  ledger: getIcon('ic_ledger'),
  unit: getIcon('ic_unit'),
  report: getIcon('ic_report'),
};

const navConfig = [
  {
    subheader: '',
    items: [{ title: 'Dashboard', path: PATH_DASHBOARD.root, icon: ICONS.dashboard }],
  },
  {
    subheader: 'Bumdes',
    items: [
      { title: 'Jurnal', path: PATH_DASHBOARD.bumdes.jurnal, icon: ICONS.create },
      { title: 'Buku Besar', path: PATH_DASHBOARD.bumdes.ledger, icon: ICONS.ledger },
      {
        title: 'Laporan Keuangan',
        path: PATH_DASHBOARD.bumdes.report,
        icon: ICONS.report,
        children: [
          { title: 'Laporan Laba Rugi', path: PATH_DASHBOARD.bumdes.report.profit },
          { title: 'Laporan Ekuitas', path: PATH_DASHBOARD.other.content },
          { title: 'Laporan Posisi Keuangan', path: PATH_DASHBOARD.bumdes.report.balance },
          { title: 'Laporan Arus kas', path: PATH_DASHBOARD.bumdes.report.cashFlow },
        ],
      },
      { title: 'Unit Usaha BUM Des', path: PATH_DASHBOARD.bumdes.unit, icon: ICONS.unit },
      {
        title: 'Profil BUM Desa',
        path: PATH_DASHBOARD.bumdes.profile,
        icon: ICONS.profile,
        children: [
          { title: 'Detail BUM Desa', path: PATH_DASHBOARD.bumdes.profile.detail },
          { title: 'Pengurus BUM Desa', path: PATH_DASHBOARD.bumdes.profile.administrator},
        ],
      },
    ],
  },
  {
    subheader: 'Evaluasi',
    items: [
      { title: 'Penilaian BUM Desa', path: PATH_DASHBOARD.other.evaluation, icon: ICONS.star },
    ],
  },
  {
    subheader: 'Lainnya',
    items: [
      {
        title: 'Konten Edukasi',
        path: PATH_DASHBOARD.other.content,
        icon: ICONS.referral,
      },
      {
        title: 'Pusat Bantuan',
        path: PATH_DASHBOARD.other.help,
        icon: ICONS.help,
      },
    ],
  },
];

export default navConfig;
