import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from 'prop-types';
import { Grid} from "@mui/material";
import { useForm } from "react-hook-form";
import { FormProvider, RHFTextField } from "src/components/hook-form";
import { StyledLoadingButton } from "src/theme/custom/Button";
import * as Yup from 'yup';
import { useState } from "react";
import { formatISO } from "date-fns";
import ModalUbahEmail from "./ModalUbahEmail";
import ModalChangePassword from "./ModalChangePassword";

const AccountInfoSchema = Yup.object().shape({
  id: Yup.string().required('ID BUM Desa wajib diisi'),
  email: Yup.string()
    .email('Format email tidak valid')
    .required('Alamat Email wajib diisi'),
  password: Yup.string()
    .min(6, 'Kata sandi harus terdiri dari minimal 6 karakter')
    .required('Kata sandi baru harus diisi'),
});

const styles = {
  content: {
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row' },
    minHeight: 116,
    p: '24px'
  },
  textfield: {
    width: '245px',
    '& .MuiInputBase-root': {
      height: '44px',
    },
    '& .MuiInputBase-input': {
      height: '11px',
    },
    '& .MuiInput-underline:before': { borderBottomColor: '#D3D4D4' },
    '& .MuiInput-underline:after': { borderBottomColor: '#D3D4D4' },
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
  action: {
    minHeight: 80,
    p: '16px',
    borderTop: 'solid 1px #EAEBEB',
    justifyContent: 'center',
    alignItems: 'flex-end',
    button: {
      width: 160,
      height: 48,
      borderRadius: '8px',
      borderColor: '#1078CA'
    }
  }
}

export default function AccountInfo() {
  const [openEmail, setOpenEmail] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);

  const defaultValues = {
    id: '1101032012101231231',
    email: 'bumdessimatupang@gmail.com',
    password: 'P@ssw0rd1234@',
  };

  const methods = useForm({
    resolver: yupResolver(AccountInfoSchema),
    defaultValues,
    mode: 'onChange',
  });

  return (
    <FormProvider methods={methods} >
      <Grid container spacing={2} sx={styles.content}>
        <Grid item xs={4}>
          <RHFTextField
            name="id"
            label="ID BUM Desa"
            inputProps={{
              style: { color: '#00549B' },
              readOnly: true
            }}
            sx={styles.textfield.id}
            require
          />
        </Grid>
        <Grid sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }} item xs={4}>
          <RHFTextField
            name="email"
            label="Alamat Email"
            inputProps={{
              readOnly: true
            }}
            sx={styles.textfield}
            variant="standard"
          />
          <StyledLoadingButton
            onClick={() => setOpenEmail(true)}
            variant="text"
          >
            Ubah
          </StyledLoadingButton>
        </Grid>
        <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
          <RHFTextField
            name="password"
            label="Kata Sandi"
            inputProps={{
              readOnly: true
            }}
            type="password"
            sx={styles.textfield}
            variant="standard"
          />
          <StyledLoadingButton
            onClick={() => setOpenPassword(true)}
            variant="text"
          >
            Ubah
          </StyledLoadingButton>
        </Grid>
      </Grid>
      <ModalUbahEmail open={openEmail} onClose={() => setOpenEmail(false)} />
      <ModalChangePassword open={openPassword} onClose={() => setOpenPassword(false)} />
    </FormProvider>
  )
}

AccountInfo.propTypes = {
  isEdit: PropTypes.bool,
  setIsEdit: PropTypes.func,
};