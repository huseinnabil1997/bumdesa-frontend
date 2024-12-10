import PropTypes from 'prop-types';
import { ArrowDropDown, Download, Search } from '@mui/icons-material';
import {
  MenuItem,
  Stack,
  Grow,
  Paper,
  Popper,
  ClickAwayListener,
  MenuList,
  CircularProgress,
  Grid,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useRef, useState } from 'react';
import { RHFAutocomplete, RHFTextField } from 'src/components/hook-form';
import { StyledButton } from 'src/theme/custom/Button';
import onDownload from '../../utils/onDownload';
import { searchRegex } from 'src/utils/regex';
import { useDownloadBumdesa } from 'src/query/hooks/data-bumdesa/useDownloadBumdesa';
import { styled } from '@mui/material';
import { useGetProvincies } from 'src/query/hooks/options/useGetProvincies';
import { useGetCities } from 'src/query/hooks/options/useGetCities';
import { useGetDistricts } from 'src/query/hooks/options/useGetDistricts';

const styles = {
  textfield: {
    '& .MuiInputBase-root': {
      height: '35px',
    },
    '& .MuiInputBase-input': {
      height: '1px',
      fontSize: '12px',
    },
  },
};

const StyledNoOptionsText = styled('div')({
  fontSize: '12px',
});

const options = ['', 'Unduh format PDF', 'Unduh format Excel'];

BumdesaHeader.propTypes = {
  filter: PropTypes.object,
  isEmpty: PropTypes.bool,
  value: PropTypes.string,
  setValue: PropTypes.func,
};

export default function BumdesaHeader({ filter, isEmpty, value, setValue }) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const { enqueueSnackbar } = useSnackbar();
  const { mutate: download, isLoading } = useDownloadBumdesa();
  const { data: provincies, isLoading: isLoadingProvincies } = useGetProvincies();
  const { data: cities, isLoading: isLoadingCities } = useGetCities({ prov_id: filter?.provinsi?.value });
  const { data: districts, isLoading: isLoadingDistricts } = useGetDistricts({ city_id: filter?.kota?.value });

  const activeStatus = [
    { value: 1, label: 'Aktif' },
    { value: 0, label: 'Belum Aktif' },
  ];

  const handleMenuItemClick = (event, index) => {
    const payload = {
      ...filter,
      search: filter?.search,
      status_active: filter?.status_active?.value,
      province_id: filter?.provinsi?.value,
      city_id: filter?.kota?.value,
      district_id: filter?.kecamatan?.value,
      type: index === 99 ? 1 : index,
    };

    download(payload, {
      onSuccess: (res) => {
        enqueueSnackbar('Sedang mengunduh...', { variant: 'warning' });
        onDownload({
          file: res,
          title: `BUMDesa_Report_${filter?.provinsi?.label ? filter?.provinsi?.label + '_' : ''}${filter?.kota?.label ? filter?.kota?.label + '_' : ''}${filter?.kecamatan?.label ? filter?.kecamatan?.label + '_' : ''}${new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}`,
          type: index,
        });
        setSelectedIndex(index);
        setOpen(false);
      },
      onError: () => {
        enqueueSnackbar('Gagal mengunduh!', { variant: 'error' });
      },
    });
  };

  const handleToggle = () => setOpen((prevOpen) => !prevOpen);
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) return;
    setOpen(false);
  };

  const handleProvinsi = (value) => {
    setValue('kota', null);
    setValue('kecamatan', null);
    setValue('provinsi', value);
  };

  const handleKota = (value) => {
    setValue('kecamatan', null);
    setValue('kota', value);
  };

  const handleKecamatan = (value) => setValue('kecamatan', value);
  const handleStatusActive = (value) => setValue('status_active', value);

  return (
    <>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Grid container spacing={1}>
          {[
            { name: 'provinsi', placeholder: 'Semua Provinsi', loading: isLoadingProvincies, options: provincies, onChange: handleProvinsi },
            { name: 'kota', placeholder: 'Semua Kabupaten', loading: isLoadingCities, options: cities, onChange: handleKota },
            { name: 'kecamatan', placeholder: 'Semua Kecamatan', loading: isLoadingDistricts, options: districts, onChange: handleKecamatan },
            { name: 'status_active', placeholder: 'Semua Status', loading: false, options: activeStatus, onChange: handleStatusActive },
          ].map(({ name, placeholder, loading, options, onChange }) => (
            <Grid item xs={12} sm={6} md={3} key={name}>
              <RHFAutocomplete
                name={name}
                placeholder={placeholder}
                loading={loading}
                disabled={loading}
                sx={styles.textfield}
                noOptionsText={<StyledNoOptionsText>Tidak ada opsi</StyledNoOptionsText>}
                options={options?.map((option) => option) ?? []}
                onChange={(e, value) => onChange && onChange(value)}
                getOptionLabel={(option) => option.label}
                renderOption={(props, option) => (
                  <li {...props} key={option.value} style={{ fontSize: '12px' }}>
                    {option.label}
                  </li>
                )}
              />
            </Grid>
          ))}
        </Grid>
        <StyledButton
          ref={anchorRef}
          sx={{ width: 240 }}
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
          startIcon={isLoading ? <CircularProgress size="1rem" /> : <Download />}
          endIcon={<ArrowDropDown />}
          variant="outlined"
          disabled={isEmpty}
        >
          Unduh Dokumen
        </StyledButton>

        <Popper sx={{ zIndex: 99 }} open={open} anchorEl={anchorRef.current} role={undefined} transition>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu" autoFocusItem>
                    {options.map((option, index) => (
                      <MenuItem
                        key={option}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Stack>
      <RHFTextField
        sx={{ my: 1 }}
        fullWidth
        size="small"
        error={!searchRegex.test(value) && value !== ''}
        helperText={!searchRegex.test(value) && value !== '' ? 'Pencarian tidak valid' : ''}
        placeholder="Cari BUM Desa"
        name="search"
        InputProps={{
          startAdornment: <Search sx={{ color: '#777', mr: 1 }} />,
        }}
      />
    </>
  );
}
