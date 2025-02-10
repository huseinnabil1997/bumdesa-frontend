import PropTypes from 'prop-types';
import { Add, ArrowDropDown, Download, Search } from '@mui/icons-material';
import {
  MenuItem,
  Stack,
  Grow,
  Paper,
  Popper,
  ClickAwayListener,
  MenuList,
  CircularProgress,
  Menu,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useRef, useState } from 'react';
import { RHFTextField } from 'src/components/hook-form';
import { StyledButton } from 'src/theme/custom/Button';
import onDownload from '../../utils/onDownload';
import { useDownloadJurnal } from 'src/query/hooks/jurnals/useDownloadJurnal';
import { searchRegex } from 'src/utils/regex';
import { getSessionToken } from 'src/utils/axiosReportService';
import jwtDecode from 'jwt-decode';
import RHFRangeDatePicker from 'src/components/hook-form/RHFRangeDatePicker';
import { useSelector } from 'react-redux';
import Image from 'src/components/Image';

const options = ['', 'Unduh format PDF', 'Unduh format Excel'];

JurnalHeader.propTypes = {
  filter: PropTypes.object,
  isEmpty: PropTypes.bool,
  value: PropTypes.string,
};

export default function JurnalHeader({ filter, isEmpty, value }) {
  const userData = useSelector((state) => state.user.userData);
  const router = useRouter();
  const token = getSessionToken();
  let user = {};
  if (token) {
    user = jwtDecode(token);
  } else {
    console.error('Token not available');
  }

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const { enqueueSnackbar } = useSnackbar();

  const { mutate: download, isLoading } = useDownloadJurnal();

  // const handleClick = () => {
  //   router.push('/jurnal/create');
  // };

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
          title: user?.bumdesid + '_Jurnal_' + filter?.start_date + '_' + filter?.end_date,
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

  const handleMenuClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleJurnalSatuanClick = () => {
    router.push('/jurnal/create');
    handleMenuClose();
  };

  const handleUnggahMassalClick = () => {
    router.push('/jurnal/bulk');
    handleMenuClose();
  };

  return (
    <>
      <Stack direction="row">
        <Stack direction="row" sx={{ width: '100%' }} spacing={1}>
          <RHFRangeDatePicker
            name={{ start: 'start_date', end: 'end_date' }}
            value={{ start: filter?.start_date, end: filter?.end_date }}
            disableFuture
            format="dd-MM-yyyy"
            size="small"
            sx={{
              '& .MuiInputBase-root': {
                borderRadius: '8px',
              },
              '& .MuiInputAdornment-root': {
                display: 'none',
              },
            }}
          />
        </Stack>
        <Stack direction="row" spacing={1}>
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
          {userData?.role !== 4 && (
            <>
              <StyledButton
                sx={{ width: 200 }}
                startIcon={<Add />}
                variant="contained"
                onClick={handleMenuClick}
              >
                Buat Jurnal
              </StyledButton>
              <Menu
                anchorEl={menuAnchorEl}
                open={Boolean(menuAnchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  style: {
                    width: 200,
                  },
                }}
              >
                <MenuItem onClick={handleJurnalSatuanClick} sx={{ fontSize: 14 }}>
                  <Image src="/icons/ic_single_upload.png" alt="single upload" sx={{ width: 16, height: 16, mr: 2 }} />
                  Jurnal Satuan
                </MenuItem>
                <MenuItem onClick={handleUnggahMassalClick} sx={{ fontSize: 14 }}>
                  <Image src="/icons/ic_bulk_upload.png" alt="bulk upload" sx={{ width: 16, height: 16, mr: 2 }} />
                  Unggah Massal
                </MenuItem>
              </Menu>
            </>
          )}

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
        </Stack>
      </Stack>
      <RHFTextField
        sx={{ mt: 3 }}
        fullWidth
        size="small"
        error={!searchRegex.test(value) && value !== ''}
        helperText={!searchRegex.test(value) && value !== '' ? 'Pencarian tidak valid' : ''}
        placeholder="Cari berdasarkan nomor bukti atau keterangan"
        name="search"
        InputProps={{
          startAdornment: <Search sx={{ color: '#777', mr: 1 }} />,
        }}
      />
    </>
  );
}
