import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, Typography } from '@mui/material';
// hooks
import useOffSetTop from '../../../hooks/useOffSetTop';
import useResponsive from '../../../hooks/useResponsive';
// utils
import cssStyles from '../../../utils/cssStyles';
// config
import { HEADER } from '../../../config';
// components
import Logo from '../../../components/Logo';
import Iconify from '../../../components/Iconify';
import { IconButtonAnimate } from '../../../components/animate';
//
// import Searchbar from './Searchbar';
import AccountPopover from './AccountPopover';
// import LanguagePopover from './LanguagePopover';
// import ContactsPopover from './ContactsPopover';
// import NotificationsPopover from './NotificationsPopover';
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

const RootStyle = styled(AppBar, {
  shouldForwardProp: (prop) =>
    prop !== 'isCollapse' && prop !== 'isOffset' && prop !== 'verticalLayout',
})(({ isCollapse, isOffset, verticalLayout, theme }) => ({
  ...cssStyles(theme).bgBlur(),
  borderBottom: '1px solid #EAEBEB',
  boxShadow: 'none',
  height: HEADER.MOBILE_HEIGHT,
  zIndex: theme.zIndex.appBar + 1,
  transition: theme.transitions.create(['width', 'height'], {
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('lg')]: {
    height: HEADER.DASHBOARD_DESKTOP_HEIGHT,
    width: `calc(100% - 280px)`,
    ...(isCollapse && {
      width: `calc(100% - 280px)`,
    }),
    ...(isOffset && {
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
    }),
    ...(verticalLayout && {
      width: '100%',
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
      backgroundColor: theme.palette.background.default,
    }),
  },
}));

// ----------------------------------------------------------------------

DashboardHeader.propTypes = {
  isCollapse: PropTypes.bool,
  onOpenSidebar: PropTypes.func,
  verticalLayout: PropTypes.bool,
};

export default function DashboardHeader({
  onOpenSidebar,
  isCollapse = false,
  verticalLayout = false,
}) {
  const isOffset = useOffSetTop(HEADER.DASHBOARD_DESKTOP_HEIGHT) && !verticalLayout;

  const isDesktop = useResponsive('up', 'lg');

  const [title, setTitle] = useState(null);

  const router = useRouter();

  useEffect(() => {
    generateTitle();
  }, [router.pathname]);

  const generateTitle = () => {
    const value = router.pathname.split('/')[1];
    const value2 = router.pathname.split('/')[2];
    if (value === 'ledger') return setTitle('Buku Besar');
    if (value === 'unit') {
      if (value2 === 'new') {
        return setTitle('Tambah Unit Usaha');
      }
      if (value2 === 'edit') {
        return setTitle('Ubah Unit Usaha');
      }
      return setTitle('Unit Usaha BUM Desa');
    }
    if (value === 'education') return setTitle('Konten Edukasi');
    if (value === 'faqs') return setTitle('Frequently Asked Questions');
    if (value === 'manager') return setTitle('Pengurus BUM Desa');
    if (value === 'employee') return setTitle('Pengurus Unit Usaha');
    if (value === 'profile') return setTitle('Profil');
    if (value === 'setting') return setTitle('Pengaturan Akun');
    if (value2 === 'profit') return setTitle('Laporan Laba Rugi');
    if (value2 === 'balance') return setTitle('Laporan Posisi Keuangan');
    if (value2 === 'equity') return setTitle('Laporan Prubahan Ekuitas');
    if (value2 === 'cashflow') return setTitle('Laporan Arus Kas');
    else setTitle(value.charAt(0).toUpperCase() + value.slice(1));
  };

  return (
    <RootStyle isCollapse={isCollapse} isOffset={isOffset} verticalLayout={verticalLayout}>
      <Toolbar
        sx={{
          minHeight: '100% !important',
          px: { lg: 5 },
        }}
      >
        {isDesktop && verticalLayout && <Logo sx={{ mr: 2.5 }} />}

        {!isDesktop && (
          <IconButtonAnimate onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary' }}>
            <Iconify icon="eva:menu-2-fill" />
          </IconButtonAnimate>
        )}

        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={{ xs: 0.5, sm: 1.5 }}
          sx={{ width: '100%' }}
        >
          <Typography sx={{ color: '#3D3D3D' }} fontWeight={700} fontSize={22}>
            {title}
          </Typography>
          <AccountPopover />
        </Stack>
      </Toolbar>
    </RootStyle>
  );
}
