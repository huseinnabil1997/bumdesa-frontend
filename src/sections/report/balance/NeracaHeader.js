import { Description } from '@mui/icons-material';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';
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
import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import Iconify from 'src/components/Iconify';
import { RHFAutocomplete } from 'src/components/hook-form';
import { StyledLoadingButton } from 'src/theme/custom/Button';
import { useGetBusinessUnits } from 'src/query/hooks/report/useGetBusinessUnit';
import { useDownloadBalance } from 'src/query/hooks/report/balance/useDownloadBalance';
import { getSessionToken } from 'src/utils/axios';
import { defaultRangeDate, end_date, formatDate, start_date } from 'src/utils/helperFunction';
import RHFDatePicker from 'src/components/hook-form/RHFDatePicker';

const options = [
  { type: 1, name: 'Unduh .PDF' },
  { type: 2, name: 'Unduh .xlsx' },
];

NeracaHeader.propTypes = {
  onSubmit: PropTypes.func,
  indicatorBalance: PropTypes.string,
};

export default function NeracaHeader({ onSubmit, indicatorBalance, loading }) {
  const anchorRef = useRef(null);

  const token = getSessionToken();
  const decoded = useMemo(() => (token ? jwtDecode(token) : {}), [token]);

  const { enqueueSnackbar } = useSnackbar();
  const { data, isLoading } = useGetBusinessUnits();
  const { mutate: onDownload, isLoading: downloading } = useDownloadBalance();

  const [open, setOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(1);
  const [selectedUnit, setSelectedUnit] = useState({ name: 'Semua Unit', id: '' });
  const [selectedDate, setSelectedDate] = useState([start_date, end_date]);

  const handleMenuItemClick = useCallback(async (type) => {
    enqueueSnackbar('Sedang memproses...', { variant: 'warning' });
    setSelectedType(type);
    const payload = {
      type: type === 'preview' ? 1 : type,
      unit: selectedUnit?.id,
      start_date: formatDate(selectedDate[0]),
      end_date: formatDate(selectedDate[1]),
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
            `${decoded?.bumdesid}_Laporan_Neraca_${selectedUnit?.id}_${formatDate(
              selectedDate[0]
            )}_${formatDate(selectedDate[1])}.${type === 1 ? 'pdf' : 'xlsx'}`
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
    setOpen(false);
  }, [enqueueSnackbar, onDownload, selectedDate, selectedUnit, decoded]);

  const handleToggle = useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
  }, []);

  const handleClose = useCallback((event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  }, []);

  useEffect(() => {
    setSelectedDate([start_date, end_date]);
    onSubmit({
      unit: decoded?.sub?.businessid ?? selectedUnit?.id,
      start_date: formatDate(start_date),
      end_date: formatDate(end_date),
    });
  }, [decoded, onSubmit, selectedUnit]);

  useEffect(() => {
    if (data?.length) {
      setSelectedUnit(data[0]);
    }
  }, [data]);

  return (
    <>
      <Stack direction="row">
        <Stack
          direction="row"
          spacing={1}
          justifyContent="flex-end"
          flexGrow={1}
          mb={5}
          alignItems="center"
        >
          <Typography fontSize="12px" fontWeight={600} color="black">
            Indikator Keseimbangan :
          </Typography>
          <Box
            sx={{
              display: 'flex',
              width: indicatorBalance === 'Seimbang' ? '93px' : '128px',
              height: '34px',
              p: '8px, 8px, 0px, 8px',
              borderRadius: '8px',
              backgroundColor: indicatorBalance === 'Seimbang' ? '#27AE60' : '#E84040',
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}
          >
            <Typography
              sx={{
                width: indicatorBalance === 'Seimbang' ? '57px' : '90px',
                height: '26px',
                fontSize: '12px',
                fontWeight: 600,
                color: 'white',
                borderColor: indicatorBalance === 'Seimbang' ? '#E1F8EB' : '#F49F9F',
                borderBottomWidth: '3px',
                borderTopWidth: 0,
                borderRightWidth: 0,
                borderLeftWidth: 0,
                borderStyle: 'solid',
              }}
            >
              {indicatorBalance}
            </Typography>
          </Box>
        </Stack>
      </Stack>
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
                setSelectedUnit(newValue);
                onSubmit({
                  unit: newValue?.id,
                  start_date: formatDate(selectedDate[0]),
                  end_date: formatDate(selectedDate[1]),
                });
                defaultRangeDate(formatDate(selectedDate[0]), formatDate(selectedDate[1]));
              }}
              value={selectedUnit}
              disabled={loading || downloading}
            />
          )}
          <RHFDatePicker
            size="small"
            require
            format="yyyy-MM-dd"
            name="date"
            onChange={(date) => {
              setSelectedDate([selectedDate[0], formatDate(date)]);
              onSubmit({
                unit: selectedUnit?.id,
                start_date: formatDate(selectedDate[0]),
                end_date: formatDate(date),
              });
              defaultRangeDate(formatDate(selectedDate[0]), formatDate(date));
            }}
            value={formatDate(selectedDate[1])}
            disableFuture
            disabled={downloading}
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
            aria-controls={open ? 'split-button-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
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
                <Paper sx={{ width: 210 }}>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList id="split-button-menu" autoFocusItem>
                      {options.map((option) => (
                        <MenuItem
                          key={option.type}
                          selected={option.type === selectedType}
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
    </>
  );
}