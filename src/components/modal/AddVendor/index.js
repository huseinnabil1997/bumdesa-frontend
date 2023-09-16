import * as Yup from 'yup';
import * as React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

// mui
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

// hooks
import { FormProvider, RHFTextField } from '../../hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createVendor, getVendor, resetMessage, resetVendor, updateVendor } from '../../../redux/slices/vendor';
import { useEffect } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 480,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

ModalAddVendor.propTypes = {
  open: PropTypes.boolean,
  onClose: PropTypes.func,
  refetch: PropTypes.func,
  id: PropTypes.string,
  isEdit: PropTypes.boolean,
};

export default function ModalAddVendor({ open, onClose, id, refetch, isEdit }) {
  const dispatch = useDispatch();
  const { vendor, isLoading } = useSelector((state) => state.vendor);

  const isDetail = id && !isEdit;

  const NewBlogSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    tdr_start_date: Yup.string().required('TDR start date is required'),
    tdr_end_date: Yup.string().required('TDR end date is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: '',
      tdr: '',
      tdr_start_date: moment().format('yyyy-MM-DD'),
      tdr_end_date: moment().add(1, 'day').format('yyyy-MM-DD'),
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewBlogSchema),
    defaultValues,
  });

  const { reset, setValue, handleSubmit } = methods;

  const onSubmit = (values) => {
    dispatch(isEdit ? updateVendor(id, values) : createVendor(values));
    if (isEdit) refetch();

    handleClose();
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  useEffect(() => {
    if (isEdit || isDetail) dispatch(getVendor(id));
  }, [dispatch, id, isEdit, isDetail]);

  useEffect(() => {
    if (vendor) {
      setValue('name', vendor?.name);
      setValue('tdr', vendor?.tdr);
      setValue('tdr_start_date', vendor?.tdr_start_date);
      setValue('tdr_end_date', vendor?.tdr_end_date);
    }
  }, [setValue, vendor]);

  const resetState = () => {
    reset(defaultValues);
    dispatch(resetVendor());
    setTimeout(() => {
      dispatch(resetMessage());
    }, [5000]);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2" sx={{ mb: 5 }}>
              {isEdit ? 'Edit' : isDetail ? 'Detail' : 'Add'} Vendor
            </Typography>

            {!isLoading && (
              <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={3}>
                  <RHFTextField disabled={isDetail} name="name" label="Nama Vendor" />
                  <RHFTextField disabled={isDetail} name="tdr" label="No. Tanda Daftar Rekanan" />
                  <RHFTextField disabled={isDetail} name="tdr_start_date" label="Start Date" type="date" />
                  <RHFTextField disabled={isDetail} name="tdr_end_date" label="End Date" type="date" />
                  {!isDetail && (
                    <Box textAlign="end">
                      <Button variant="outlined" onClick={handleClose} sx={{ borderColor: '#ccc', color: '#ccc' }}>
                        Cancel
                      </Button>
                      <Button variant="contained" type="submit" sx={{ ml: 1 }} disabled={isLoading}>
                        {isLoading ? 'Loading' : 'Save'}
                      </Button>
                    </Box>
                  )}
                  {isDetail && (
                    <Button variant="outlined" type="button" color="secondary" onClick={handleClose}>
                      Close
                    </Button>
                  )}
                </Stack>
              </FormProvider>
            )}

            {isLoading && (
              <>
                <Skeleton height={50} sx={{ mb: 1 }} />
                <Skeleton height={50} sx={{ mb: 1 }} />
                <Skeleton height={50} sx={{ mb: 1 }} />
                <Skeleton height={50} sx={{ mb: 1 }} />
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
