import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';
import { Description } from '@mui/icons-material';
import {
  MenuItem,
  Stack,
  Grow,
  Paper,
  Popper,
  ClickAwayListener,
  MenuList,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useRef, useState, useMemo } from 'react';
import Iconify from 'src/components/Iconify';
import { RHFAutocomplete } from 'src/components/hook-form';
import { useGetBusinessUnits } from 'src/query/hooks/report/useGetBusinessUnit';
import { StyledLoadingButton } from 'src/theme/custom/Button';
import { useDownloadProfit } from 'src/query/hooks/report/profit/useDownloadProfit';
import { getSessionToken } from 'src/utils/axios';
import { defaultRangeDate, end_date, formatDate, start_date } from 'src/utils/helperFunction';
import RHFRangeDatePicker from 'src/components/hook-form/RHFRangeDatePicker';
import moment from 'moment';

const options = [
  { type: 1, name: 'Unduh .PDF' },
  { type: 2, name: 'Unduh .xlsx' },
];

LabaRugiHeader.propTypes = {
  onSubmit: PropTypes.func,
  loading: PropTypes.bool,
};

export default function LabaRugiHeader({ onSubmit, loading }) {
  const { enqueueSnackbar } = useSnackbar();

  const token = getSessionToken();
  const decoded = useMemo(() => (token ? jwtDecode(token) : {}), [token]);

  const { data, isLoading } = useGetBusinessUnits();
  const { mutate: onDownload, isLoading: downloading } = useDownloadProfit();

  const [state, setState] = useState({
    open: false,
    selectedType: 1,
    selectedUnit: { name: 'Semua Unit', id: '' },
    selectedDate: [start_date, end_date],
  });

  const anchorRef = useRef(null);

  const handleMenuItemClick = async (type) => {
    enqueueSnackbar('Sedang memproses...', { variant: 'warning' });
    setState((prevState) => ({ ...prevState, selectedType: type }));
    const payload = {
      type: type === 'preview' ? 1 : type,
      unit: state.selectedUnit?.id,
      start_date: moment(state.selectedDate[0]).format('YYYY-MM-DD'),
      end_date: moment(state.selectedDate[1]).format('YYYY-MM-DD'),
    };
    onDownload(payload, {
      onSuccess: (res) => {
        const blob = new Blob([res], { type: 'application/pdf' });
        const url = URL.createObjectURL(new Blob([res]));
        if (type === 'preview') {
          const blobUrl = URL.createObjectURL(blob);
          window.open(blobUrl);
        } else {
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute(
            'download',
            `${decoded?.bumdesid}_Laporan_Laba_Rugi_${state.selectedUnit?.id}_${formatDate(
              state.selectedDate[0]
            )}_${formatDate(state.selectedDate[1])}.${type === 1 ? 'pdf' : 'xlsx'}`
          );
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
          enqueueSnackbar('', {
            variant: 'success',
            content: () => (
              <Box
                display="flex"
                alignItems="center"
                sx={{
                  width: '344px',
                  height: '48px',
                  backgroundColor: '#E1F8EB',
                  padding: '8px',
                  borderRadius: '4px',
                }}
              >
                <Iconify height={24} width={24} icon={'lets-icons:check-fill'} color="#27AE60" />
                <Typography ml="10px" fontWeight={500} fontSize="12px">
                  Dokumen Berhasil di Download
                </Typography>
              </Box>
            ),
          });
        }
      },
      onError: (err) => {
        enqueueSnackbar(err.message, { variant: 'error' });
      },
    });
    setState((prevState) => ({ ...prevState, open: false }));
  };

  const handleToggle = () => {
    setState((prevState) => ({ ...prevState, open: !prevState.open }));
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setState((prevState) => ({ ...prevState, open: false }));
  };

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      selectedDate: [start_date, end_date],
    }));
    onSubmit({
      unit: decoded?.sub?.businessid ?? state.selectedUnit?.id,
      start_date: formatDate(start_date),
      end_date: formatDate(end_date),
    });
  }, []);

  useEffect(() => {
    if (data?.length) {
      setState((prevState) => ({ ...prevState, selectedUnit: data[0] }));
    }
  }, [data]);

  return (
    <Stack direction="row" spacing={1}>
      <Stack direction="row" sx={{ width: '100%' }} spacing={1}>
        {decoded?.sub?.businessid === 0 && (
          <RHFAutocomplete
            sx={{ width: 305 }}
            size="small"
            name="unit"
            placeholder="Sektor Usaha"
            loading={isLoading}
            options={data?.map((option) => option) ?? []}
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => (
              <li {...props} key={option.id}>
                {option.name}
              </li>
            )}
            onChange={(event, newValue) => {
              setState((prevState) => ({ ...prevState, selectedUnit: newValue }));
              onSubmit({
                unit: newValue?.id,
                start_date: formatDate(state.selectedDate[0]),
                end_date: formatDate(state.selectedDate[1]),
              });
              defaultRangeDate(formatDate(state.selectedDate[0]), formatDate(state.selectedDate[1]));
            }}
            value={state.selectedUnit}
            disabled={loading || downloading}
          />
        )}
        <RHFRangeDatePicker
          name={{ start: 'start_date', end: 'end_date' }}
          value={{ start: start_date, end: end_date }}
          disableFuture
          onChange={(newValue) => {
            setState((prevState) => ({ ...prevState, selectedDate: [newValue.start, newValue.end] }));
            if (newValue.start && newValue.end) {
              onSubmit({
                unit: state.selectedUnit?.id,
                start_date: formatDate(newValue.start),
                end_date: formatDate(newValue.end),
              });
              defaultRangeDate(formatDate(newValue.start), formatDate(newValue.end));
            }
          }}
          format="dd-MM-yyyy"
          disabled={downloading}
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
        <StyledLoadingButton
          sx={{ width: 186 }}
          startIcon={downloading ? <CircularProgress size="1rem" /> : <Description />}
          variant="outlined"
          onClick={() => handleMenuItemClick('preview')}
          disabled={downloading || loading}
        >
          Pratinjau Dokumen
        </StyledLoadingButton>
        <StyledLoadingButton
          ref={anchorRef}
          sx={{ width: 210, justifyContent: 'space-around' }}
          aria-controls={state.open ? 'split-button-menu' : undefined}
          aria-expanded={state.open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
          startIcon={
            downloading ? (
              <CircularProgress size="1rem" />
            ) : (
              <Iconify width={14} height={14} icon={'bi:download'} />
            )
          }
          endIcon={<Iconify icon={'oui:arrow-down'} />}
          variant="contained"
          disabled={downloading || loading}
        >
          Unduh Dokumen
        </StyledLoadingButton>

        <Popper
          sx={{ zIndex: 99 }}
          open={state.open}
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
              <Paper sx={{ width: 210 }}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu" autoFocusItem>
                    {options.map((option) => (
                      <MenuItem
                        key={option.type}
                        selected={option.type === state.selectedType}
                        onClick={() => handleMenuItemClick(option.type)}
                      >
                        {option.name}
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
  );
}