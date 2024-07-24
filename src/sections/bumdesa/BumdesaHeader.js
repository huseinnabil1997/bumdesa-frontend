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
// import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useRef, useState } from 'react';
import { RHFAutocomplete, RHFTextField } from 'src/components/hook-form';
import { StyledButton } from 'src/theme/custom/Button';
import onDownload from '../../utils/onDownload';
import { searchRegex } from 'src/utils/regex';
import { getSessionToken } from 'src/utils/axiosReportService';
import jwtDecode from 'jwt-decode';
import { useDownloadBumdesa } from 'src/query/hooks/bumdesa/useDownloadBumdesa';
// import { IconButtonAnimate } from 'src/components/animate';
// import TuneIcon from '@mui/icons-material/Tune';
import { useGetProvincies } from 'src/query/hooks/options/useGetProvincies';
import { useGetCities } from 'src/query/hooks/options/useGetCities';
import { useGetDistricts } from 'src/query/hooks/options/useGetDistricts';
import { useGetSubdistricts } from 'src/query/hooks/options/useGetSubdistricts';

const styles = {
  textfield: {
    '& .MuiInputBase-root': {
      height: '35px',
    },
    '& .MuiInputBase-input': {
      height: '1px',
      fontSize: '12px',
      '&::placeholder': {
        color: '#1078CA',
      },
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#1078CA',
      },
      '&.MuiInputBase-root:not(.Mui-disabled) .MuiOutlinedInput-notchedOutline': {
        borderColor: '#1078CA',
      },
      '&.MuiInputBase-root:not(.Mui-disabled) .MuiInputBase-input::placeholder': { 
        color: '#1078CA',
      },
      '&.MuiInputBase-root:not(.Mui-disabled) .MuiSvgIcon-root': { 
        color: '#1078CA',
      },
      '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
        borderColor: 'initial',
      },
      '&.Mui-disabled:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'initial',
      },
    },
  },
}

const options = ['', 'Unduh format PDF', 'Unduh format Excel'];

BumdesaHeader.propTypes = {
  filter: PropTypes.object,
  isEmpty: PropTypes.bool,
  value: PropTypes.string,
};

export default function BumdesaHeader({ filter, isEmpty, value, setValue }) {
  const token = getSessionToken();
  const user = jwtDecode(token);

  const [open, setOpen] = useState(false);
  // const [openFilter, setOpenFilter] = useState(false);
  const anchorRef = useRef(null);
  // const anchorRefFilter = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(1);

  const { enqueueSnackbar } = useSnackbar();

  const { mutate: download, isLoading } = useDownloadBumdesa();

  const { data: provincies, isLoading: isLoadingProvincies } = useGetProvincies();
  const { data: cities, isLoading: isLoadingCities } = useGetCities({ prov_id: filter?.provinsi?.value });
  const { data: districts, isLoading: isLoadingDistricts } = useGetDistricts({ city_id: filter?.kota?.value });
  const { data: subdistricts, isLoading: isLoadingSubdistricts } = useGetSubdistricts({ dis_id: filter?.kecamatan?.value });

  const handleMenuItemClick = (event, index) => {
    const payload = {
      ...filter,
      limit: 10,
      type: index === 99 ? 1 : index,
    };

    download(payload, {
      onSuccess: (res) => {
        enqueueSnackbar('Sedang mengunduh...', { variant: 'warning' });
        onDownload({
          file: res,
          title: user?.bumdesid + '_BUMDesa_Report',
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

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  // const handleCloseFilter = (event) => {
  //   if (anchorRefFilter.current && anchorRefFilter.current.contains(event.target)) {
  //     return;
  //   }

  //   setOpenFilter(false);
  // };

  // const handleToggleFilter = () => {
  //   setOpenFilter((prevOpen) => !prevOpen);
  // };

  const handleProvinsi = (value) => {
    setValue('provinsi', value)
    setValue('kota', null);
    setValue('kecamatan', null);
    setValue('desa', null);
  }

  const handleKota = (value) => {
    setValue('kota', value)
    setValue('kecamatan', null);
    setValue('desa', null);
  }

  const handleKecamatan = (value) => {
    setValue('kecamatan', value)
    setValue('desa', null);
    setValue('kode_pos', null);
  }

  return (
    <>
      <Stack direction="row" spacing={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {/* <IconButtonAnimate ref={anchorRefFilter}>
          <TuneIcon
            onClick={handleToggleFilter}
            sx={{ color: '#1078CA' }}
          />
        </IconButtonAnimate> */}
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <RHFAutocomplete
              name="provinsi"
              placeholder="Provinsi"
              loading={isLoadingProvincies}
              disabled={isLoadingProvincies}
              sx={styles.textfield}
              onChange={(e, value) => handleProvinsi(value)}
              options={provincies?.map((option) => option) ?? []}
              getOptionLabel={(option) => option.label}
              renderOption={(props, option) => (
                <li {...props} key={option.value} style={{ fontSize: '12px' }}>
                  {option.label}
                </li>
              )}
            />
          </Grid>
          <Grid item xs={3}>
            <RHFAutocomplete
              name="kota"
              placeholder="Kabupaten"
              loading={isLoadingCities}
              disabled={isLoadingCities || !filter?.provinsi?.value}
              sx={styles.textfield}
              onChange={(e, value) => handleKota(value)}
              options={cities?.map((option) => option) ?? []}
              getOptionLabel={(option) => option.label}
              renderOption={(props, option) => (
                <li {...props} key={option.value} style={{ fontSize: '12px' }}>
                  {option.label}
                </li>
              )}
            />
          </Grid>
          <Grid item xs={3}>
            <RHFAutocomplete
              name="kecamatan"
              placeholder="Kecamatan"
              loading={isLoadingDistricts}
              disabled={isLoadingDistricts || !filter?.kota?.value}
              sx={styles.textfield}
              onChange={(e, value) => handleKecamatan(value)}
              options={districts?.map((option) => option) ?? []}
              getOptionLabel={(option) => option.label}
              renderOption={(props, option) => (
                <li {...props} key={option.value} style={{ fontSize: '12px' }}>
                  {option.label}
                </li>
              )}
            />
          </Grid>
          <Grid item xs={3}>
            <RHFAutocomplete
              name="desa"
              placeholder="Desa"
              loading={isLoadingSubdistricts}
              disabled={isLoadingSubdistricts || !filter?.kecamatan?.value}
              sx={styles.textfield}
              options={subdistricts?.map((option) => option) ?? []}
              getOptionLabel={(option) => option.label}
              renderOption={(props, option) => (
                <li {...props} key={option.value} style={{ fontSize: '12px' }}>
                  {option.label}
                </li>
              )}
            />
          </Grid>
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

        <Popper
          sx={{ zIndex: 99 }}
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
              }}
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

        {/* <Popper
          sx={{ zIndex: 99, boxShadow: 3 }}
          open={openFilter}
          anchorEl={anchorRefFilter.current}
          role={undefined}
          transition
          placement="right-start"
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper sx={{ p: 2, boxShadow: 3 }}>
                <ClickAwayListener onClickAway={handleCloseFilter}>
                  <Grid container spacing={2}>
                    <Grid item xs={3}>
                      <RHFAutocomplete
                        name="provinsi"
                        label="Provinsi"
                        loading={false}
                        sx={styles.textfield}
                        onChange={(e, value) => handleProvinsi(value)}
                        options={provincies?.map((option) => option) ?? []}
                        getOptionLabel={(option) => option.label}
                        renderOption={(props, option) => (
                          <li {...props} key={option.value}>
                            {option.label}
                          </li>
                        )}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <RHFAutocomplete
                        name="kota"
                        label="Kabupaten"
                        loading={false}
                        sx={styles.textfield}
                        onChange={(e, value) => handleKota(value)}
                        options={cities?.map((option) => option) ?? []}
                        getOptionLabel={(option) => option.label}
                        renderOption={(props, option) => (
                          <li {...props} key={option.value}>
                            {option.label}
                          </li>
                        )}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <RHFAutocomplete
                        name="kecamatan"
                        label="Kecamatan"
                        loading={false}
                        sx={styles.textfield}
                        onChange={(e, value) => handleKecamatan(value)}
                        options={districts?.map((option) => option) ?? []}
                        getOptionLabel={(option) => option.label}
                        renderOption={(props, option) => (
                          <li {...props} key={option.value}>
                            {option.label}
                          </li>
                        )}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <RHFAutocomplete
                        name="desa"
                        label="Desa"
                        loading={false}
                        sx={styles.textfield}
                        options={subdistricts?.map((option) => option) ?? []}
                        getOptionLabel={(option) => option.label}
                        renderOption={(props, option) => (
                          <li {...props} key={option.value}>
                            {option.label}
                          </li>
                        )}
                      />
                    </Grid>
                  </Grid>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper> */}
      </Stack>
      <RHFTextField
        sx={{ mt: 3 }}
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