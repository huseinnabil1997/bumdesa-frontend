import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
// next
// import NextLink from 'next/link';
import { useRouter } from 'next/router';
// @mui
// import { alpha } from '@mui/material/styles';
import { MenuItem, Stack, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from '../../../routes/paths';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
// import MyAvatar from '../../../components/MyAvatar';
import MenuPopover from '../../../components/MenuPopover';
import { IconButtonAnimate } from '../../../components/animate';
import { KeyboardArrowDownRounded, Logout, Person, Settings } from '@mui/icons-material';
import { useGetProfile } from 'src/query/hooks/profile/useGetProfile';
import { useGetUnitById } from 'src/query/hooks/units/useGetUnitById';
import { eventBus } from 'src/pages/profile/detail';
import { useSelector } from 'react-redux';

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

// export const GetDataBumdesa = (userData) => {
  
//   // useEffect(() => {
//   //   refetch();
//   // }, [userData?.bumdesa_id]);
//   return data;
// }

// export const GetDataUnit = (userData) => {
  
//   // useEffect(() => {
//   //   refetch();
//   // }, [userData?.unit_id]);
//   return data;
// }

export default function AccountPopover() {
  const router = useRouter();

  const { logout } = useAuth();

  const isMountedRef = useIsMountedRef();

  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState(null);

  const userData = useSelector(state => state.user.userData);

  const { data: unitData, refetch: unitRefetch } = useGetUnitById(userData?.unit_id);

  const { data: bumdesaData, refetch: bumdesaRefetch } = useGetProfile(userData?.bumdesa_id);

  useEffect(() => {
    const refetchHandler = () => {
      unitRefetch();
      bumdesaRefetch();
    };

    eventBus.on('refetchUnit', refetchHandler);
    eventBus.on('refetchBumdesa', refetchHandler);

    return () => {
      eventBus.off('refetchUnit', refetchHandler);
      eventBus.off('refetchBumdesa', refetchHandler);
    };
  }, [unitRefetch, bumdesaRefetch]);

  const data = userData?.unit_id === 0 ? bumdesaData : unitData;

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
      // router.replace(PATH_AUTH.login);
      window.location.href = PATH_AUTH.login;

      if (isMountedRef.current) {
        handleClose();
      }
      enqueueSnackbar('Logout sukses!', { variant: 'success' });
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Gagal logout!', { variant: 'error' });
    }
  };

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpen}
        sx={{
          p: 0,
          '&:hover': {
            bgcolor: 'rgba(255, 255, 255, 0)', // Contoh warna background saat hover
          }
        }}
      // sx={{
      //   p: 0,
      //   ...(open && {
      //     '&:before': {
      //       zIndex: 1,
      //       content: "''",
      //       width: '100%',
      //       height: '100%',
      //       borderRadius: '50%',
      //       position: 'absolute',
      //       bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
      //     },
      //   }),
      // }}
      >
        {/* <MyAvatar /> */}
        <Stack display='flex' justifyContent='center' alignItems='center' direction={'row'} spacing={2}>
          <Typography color='#292929' fontSize='18px' fontWeight={600}>
            {data?.name ? data?.name : '...'}, {bumdesaData?.city?.label.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}
          </Typography>
          <KeyboardArrowDownRounded sx={{ color: '#1078CA' }} />
        </Stack>
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        disabledArrow
        BackdropProps={{
          open: true,
          style: { backgroundColor: 'rgba(0,0,0,0.5)' }
        }}
        sx={{
          width: '271px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: '20px',
          mt: '25px'
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

