import PropTypes from 'prop-types';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import useAuth from 'src/hooks/useAuth';
// components
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import { useSnackbar } from 'notistack';

// ----------------------------------------------------------------------

ResetPasswordForm.propTypes = {
  onSent: PropTypes.func,
  onGetEmail: PropTypes.func,
  sentStatus: PropTypes.bool,
};

export default function ResetPasswordForm({ onSent, onGetEmail, sentStatus }) {
  const { enqueueSnackbar } = useSnackbar();

  const { resetPassword } = useAuth();

  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email harus merupakan alamat email yang valid.')
      .required('Email harus diisi'),
  });

  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: { email: 'bumdespengandaran@gmail.com' },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const res = await resetPassword(data);
      console.log('res', res);
      if (res?.data?.id_user) {
        onSent();
        onGetEmail(data.email);
      }
    } catch (error) {
      enqueueSnackbar(error?.message, { variant: 'error' });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="email" label="Email" />

        {!sentStatus ? (
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Atur ulang Kata Sandi
          </LoadingButton>
        ) : (
          <LoadingButton
            disabled
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Atur ulang Kata Sandi
          </LoadingButton>
        )}
      </Stack>
    </FormProvider>
  );
}
