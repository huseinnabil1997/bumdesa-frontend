import { yupResolver } from "@hookform/resolvers/yup";
import { Card, Stack, Typography } from "@mui/material";
import PropTypes from 'prop-types';
import { FormProvider, useForm } from "react-hook-form";
import Iconify from "src/components/Iconify";
import { RHFTextField } from "src/components/hook-form";
import * as Yup from 'yup';

// ------------------------------------------------------

const akunCardStyle = {
  display: 'flex',
  maxWidth: 960,
  maxHeight: 56,
  borderLeftColor: '#F87304',
  alignItems: 'center',
  borderLeftWidth: '6px',
  borderStyle: 'solid',
  borderTopWidth: 0,
  borderBottomWidth: 0,
  borderRightWidth: 0,
  padding: '16px 32px 16px 32px',
  fontWeight: 600,
  fontSize: '14px',
  color: '#292929',
  justifyContent: 'space-between',
  borderRadius: '8px',
  flexGrow: 1,
}

const containerCardStyle = {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: 960,
  height: 256,
  mb: 3,
  borderRadius: '8px'
}

// ------------------------------------------------------

AkunForm.propTypes = {
  onOpen: PropTypes.func,
};

export default function AkunForm({ onOpen }) {

  const defaultValues = {
    id: '1101032012101231231',
    email: 'bumdessimatupang@gmail.com',
    password: 'P@ssw0rd1234@'
  };

  const AkunFormSchema = Yup.object().shape({
    id: Yup.string().required('ID BUM Desa wajib diisi'),
    password: Yup.string().required('Password wajib diisi'),
    email: Yup.string()
      .email('Format email tidak valid')
      .required('Alamat Email Aktif Unit Usaha wajib diisi'),
  });

  const methods = useForm({
    resolver: yupResolver(AkunFormSchema),
    defaultValues: defaultValues,
    mode: 'onChange',
  });

  const {
    reset,
    setValue,
    // setError,
    handleSubmit,
    // watch,
    formState: {
      // errors, 
      isSubmitting
    },
  } = methods;

  const onSubmit = async (data) => {
    console.log('submit AkunForm', data)
  };


  return (
    <Card sx={containerCardStyle}>
      <Card
        onClick={onOpen}
        sx={akunCardStyle}
      >
        Akun BUM Desa
        <Iconify color="#1078CA" width={15} height={15} icon={'mdi:chevron-down-box'} />
      </Card>
      <Stack p="24px" >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <RHFTextField
            name="id"
            label="ID BUM Desa"
            inputProps={{
              style: { color: '#00549B' },
              readOnly: true
            }}
            sx={{
              backgroundColor: '#CCE8FF',
              borderRadius: '10px',
              maxWidth: '290px',
              '& .MuiInputBase-root': {
                maxHeight: '44px',
              },
              "& fieldset": {
                border: 'none',
              },
            }}
            require
          />
        </FormProvider>
      </Stack>
    </Card>
  )
}