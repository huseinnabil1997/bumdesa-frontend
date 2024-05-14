import PropTypes from 'prop-types';
import * as Yup from 'yup';
import Dialog from '@mui/material/Dialog';
import { Box, Grid, IconButton, InputAdornment, Stack, Typography } from '@mui/material';
import { StyledLoadingButton } from 'src/theme/custom/Button';
import { Close } from '@mui/icons-material';
import { FormProvider, RHFTextField } from 'src/components/hook-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import Iconify from 'src/components/Iconify';
import useAuth from 'src/hooks/useAuth';
import { getSessionToken } from 'src/utils/axios';

const ChangePassSchema = Yup.object().shape({
  old_password: Yup.string().required('Kata sandi lama wajib diisi'),
  password: Yup.string().required('Kata sandi baru wajib diisi'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Kata sandi tidak sama')
    .required('Konfirmasi kata sandi wajib diisi'),
});

const styles = {
  textfield: {
    '& .MuiInputBase-root': {
      height: '44px',
    },
    '& .MuiInputBase-input': {
      height: '11px',
    },
    id: {
      backgroundColor: '#CCE8FF',
      borderRadius: '8px',
      '& .MuiInputBase-root': {
        height: '44px',
      },
      "& fieldset": {
        border: 'none',
      },
    }
  },
}

ModalChangePassword.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default function ModalChangePassword({ open, onClose }) {
  const [showPassword, setShowPassword] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const token = getSessionToken();

  const { createPassword } = useAuth();

  const defaultValues = {
    old_password: '',
    password: '',
    confirm_password: '',
  };

  const methods = useForm({
    resolver: yupResolver(ChangePassSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    watch,
  } = methods;

  const onSubmit = async (data) => {
    try {
      await createPassword(data, token);
      onClose();
      methods.reset();
      enqueueSnackbar('', {
        variant: 'success',
        content: () => (
          <Box
            display="flex"
            sx={{
              width: '344px',
              height: '42px',
              backgroundColor: '#E1F8EB',
              padding: '12px',
              borderRadius: '4px',
              border: '1px solid #27AE60'
            }}
          >
            <Iconify icon={'eva:checkmark-circle-2-fill'} color="#27AE60" mr={1} />
            <Typography
              fontWeight={500}
              color="#525252"
              fontSize="12px"
            >
              Password Baru BUM Desa sudah diperbarui!
            </Typography>
          </Box>
        )
      })
    } catch (error) {
      enqueueSnackbar(error?.message, { variant: 'error' });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      onBackdropClick={() => {
        onClose();
        methods.reset();
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        sx: {
          width: 480,
          minheight: 450,
          borderRadius: '8pxpx',
          display: 'flex',
        },
      }}
    >
      <Stack direction="row" p="24px" justifyContent="space-between">
        <Typography fontSize="24px" fontWeight={700} color="#292929">Ubah Password</Typography>
        <IconButton onClick={() => {
          onClose();
          methods.reset();
        }}>
          <Close />
        </IconButton>
      </Stack>
      <Stack p="24px">
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack display="flex" justifyContent="space-between">
            <Stack spacing={3}>
              <RHFTextField
                name="old_password"
                label="Kata Sandi Lama"
                type={showPassword ? 'text' : 'password'}
                sx={styles.textfield}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <RHFTextField
                name="password"
                label="Kata Sandi Baru"
                type={showPassword ? 'text' : 'password'}
                sx={styles.textfield}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {watch('password')?.length > 0 && (
                <Grid container spacing={1}>
                  <Grid item xs={6} display="flex">
                    {watch('password')?.length > 11 ? (
                      <Iconify icon={'eva:checkmark-circle-2-fill'} sx={{ color: '#27AE60' }} />
                    ) : (
                      <Iconify icon={'eva:close-circle-fill'} sx={{ color: '#E84040' }} />
                    )}
                    <Typography sx={{ ml: 1, color: '#B5B6B6' }} variant="caption">
                      Minimal 12 karakter
                    </Typography>
                  </Grid>
                  <Grid item xs={6} display="flex">
                    {/[0-9]/.test(watch('password')) ? (
                      <Iconify icon={'eva:checkmark-circle-2-fill'} sx={{ color: '#27AE60' }} />
                    ) : (
                      <Iconify icon={'eva:close-circle-fill'} sx={{ color: '#E84040' }} />
                    )}
                    <Typography sx={{ ml: 1, color: '#B5B6B6' }} variant="caption">
                      Minimal 1 angka
                    </Typography>
                  </Grid>
                  <Grid item xs={6} display="flex">
                    {/[~!@#$%^&*]/.test(watch('password')) ? (
                      <Iconify icon={'eva:checkmark-circle-2-fill'} sx={{ color: '#27AE60' }} />
                    ) : (
                      <Iconify icon={'eva:close-circle-fill'} sx={{ color: '#E84040' }} />
                    )}
                    <Typography sx={{ ml: 1, color: '#B5B6B6' }} variant="caption">
                      Simbol ~!@#$%%^&*
                    </Typography>
                  </Grid>
                  <Grid item xs={6} display="flex">
                    {/[a-z]/.test(watch('password')) ? (
                      <Iconify icon={'eva:checkmark-circle-2-fill'} sx={{ color: '#27AE60' }} />
                    ) : (
                      <Iconify icon={'eva:close-circle-fill'} sx={{ color: '#E84040' }} />
                    )}
                    <Typography sx={{ ml: 1, color: '#B5B6B6' }} variant="caption">
                      Minimal 1 huruf kecil
                    </Typography>
                  </Grid>
                  <Grid item xs={6} display="flex">
                    {/[A-Z]/.test(watch('password')) ? (
                      <Iconify icon={'eva:checkmark-circle-2-fill'} sx={{ color: '#27AE60' }} />
                    ) : (
                      <Iconify icon={'eva:close-circle-fill'} sx={{ color: '#E84040' }} />
                    )}
                    <Typography sx={{ ml: 1, color: '#B5B6B6' }} variant="caption">
                      Minimal 1 huruf besar
                    </Typography>
                  </Grid>
                </Grid>
              )}

              <RHFTextField
                name="confirm_password"
                label="Konfirmasi Kata Sandi"
                type={showPassword ? 'text' : 'password'}
                sx={styles.textfield}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>

            <StyledLoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
            >
              Simpan Password baru
            </StyledLoadingButton>
          </Stack>
        </FormProvider>
      </Stack>
    </Dialog>
  );
}
