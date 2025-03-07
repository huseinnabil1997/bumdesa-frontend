import PropTypes from 'prop-types';
import { ArrowDropDown, Description, Download } from '@mui/icons-material';
import {
  MenuItem,
  Stack,
  Grow,
  Paper,
  Popper,
  ClickAwayListener,
  MenuList,
  CircularProgress,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useRef, useState } from 'react';
import { RHFAutocomplete } from 'src/components/hook-form';
import { useDownloadLedger } from 'src/query/hooks/ledger/useDownloadLedger';
import { useGetAccount } from 'src/query/hooks/options/useGetAccount';
import { StyledButton } from 'src/theme/custom/Button';
import onDownload from 'src/utils/onDownload';
import onPreview from 'src/utils/onPreview';
import { getSessionToken } from 'src/utils/axiosReportService';
import jwtDecode from 'jwt-decode';
import RHFRangeDatePicker from 'src/components/hook-form/RHFRangeDatePicker';
import { useSelector } from 'react-redux';

const options = ['', 'Unduh format PDF', 'Unduh format Excel'];

LedgerHeader.propTypes = {
  filter: PropTypes.object,
  isEmpty: PropTypes.bool,
};

export default function LedgerHeader({ filter, isEmpty }) {
  const { enqueueSnackbar } = useSnackbar();

  const token = getSessionToken();
  let user = {};
  if (token) {
    user = jwtDecode(token);
  } else {
    console.error('Token not available');
  }
  const userData = useSelector((state) => state.user.userData);

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(1);

  const { data } = useGetAccount();
  const { mutate: download, isLoading } = useDownloadLedger();

  const handleMenuItemClick = (event, index) => {
    const payload = {
      ...filter,
      limit: 10,
      type: index === 99 ? 1 : index,
    };

    download(payload, {
      onSuccess: (res) => {
        enqueueSnackbar('Sedang mengunduh...', { variant: 'warning' });
        index === 99
          ? onPreview({ file: res, type: 1 })
          : onDownload({ file: res, title: user?.bumdesid + '_Buku_Besar', type: index });
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

  return (
    <Stack direction="row">
      <Stack direction="row" sx={{ width: '100%' }} spacing={1}>
        <RHFAutocomplete
          disableClearable
          sx={{ width: 200 }}
          size="small"
          name="account"
          placeholder="Nama Akun"
          loading={false}
          options={data?.map((option) => option) ?? []}
          renderOption={(props, option) => (
            <li {...props} key={option.value}>
              {option.label}
            </li>
          )}
        />
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
      {userData?.role !== 4 && (
        <Stack direction="row" spacing={1} sx={{ ml: 1 }}>
          <StyledButton
            disabled={isLoading || isEmpty}
            sx={{ width: 186 }}
            startIcon={isLoading ? <CircularProgress size="1rem" /> : <Description />}
            variant="outlined"
            onClick={(event) => handleMenuItemClick(event, 99)}
          >
            Pratinjau Dokumen
          </StyledButton>
          <StyledButton
            ref={anchorRef}
            sx={{ width: 210 }}
            aria-controls={open ? 'split-button-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
            startIcon={isLoading ? <CircularProgress size="1rem" color="info" /> : <Download />}
            endIcon={<ArrowDropDown />}
            variant="contained"
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
        </Stack>
      )}
    </Stack>
  );
}
