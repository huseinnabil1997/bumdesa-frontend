import { useSnackbar } from 'notistack';
import { useState } from 'react';
// next
// import NextLink from 'next/link';
import { useRouter } from 'next/router';
// @mui
import { alpha } from '@mui/material/styles';
import { MenuItem, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from '../../../routes/paths';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import MyAvatar from '../../../components/MyAvatar';
import MenuPopover from '../../../components/MenuPopover';
import { IconButtonAnimate } from '../../../components/animate';
import { Logout, Person, Settings } from '@mui/icons-material';

// ----------------------------------------------------------------------

// const MENU_OPTIONS = [
//   {
//     label: 'Home',
//     linkTo: '/',
//   },
//   {
//     label: 'Profile',
//     linkTo: PATH_DASHBOARD.user.profile,
//   },
//   {
//     label: 'Settings',
//     linkTo: PATH_DASHBOARD.user.account,
//   },
// ];

const styles = {
  box: {
    display: 'flex',
    flexDirection: 'row',
    border: '1px solid #EAEBEB',
    p: '12px 16px 12px 16px',
    borderRadius: '8px',
    flexGrow: 1,
    width: '231px',
    alignItems: 'center'
  },
  icon: { width: 20, height: 20, mr: 1, color: '#1078CA' },
  text: { color: '#292929', fontSize: '16px', fontWeight: 600 }
}

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const router = useRouter();

  const { logout } = useAuth();

  const isMountedRef = useIsMountedRef();

  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleProfile = async () => {
    router.push('/profile/detail')
    handleClose();

  };

  const handleSetting = async () => {
    router.push('/setting/account')
    handleClose();
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.replace(PATH_AUTH.login);

      if (isMountedRef.current) {
        handleClose();
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout!', { variant: 'error' });
    }
  };

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <MyAvatar />
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          width: '271px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: '20px'
        }}
      >
        <MenuItem onClick={handleProfile} sx={{ my: 1, ...styles.box }}>
          <Person sx={styles.icon} />
          <Typography sx={styles.text}>Profil</Typography>
        </MenuItem>
        <MenuItem onClick={handleSetting} sx={{ my: 1, ...styles.box }}>
          <Settings sx={styles.icon} />
          <Typography sx={styles.text}>Pengaturan Akun</Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout} sx={{ my: 1, ...styles.box }}>
          <Logout sx={styles.icon} />
          <Typography sx={styles.text}>Log Out</Typography>
        </MenuItem>
      </MenuPopover>
    </>
  );
}
