import { Description } from '@mui/icons-material';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';
import { MenuItem, Stack, Grow, Paper, Popper, ClickAwayListener, MenuList, Box, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useRef, useState } from 'react';
import Iconify from 'src/components/Iconify';
import { RHFAutocomplete, RHFTextField } from 'src/components/hook-form';
import { StyledButton } from 'src/theme/custom/Button';
import { useGetBusinessUnits } from 'src/query/hooks/report/useGetBusinessUnit';
import { useDownloadBalance } from 'src/query/hooks/report/balance/useDownloadBalance';
import { getSessionToken } from 'src/utils/axios';

const options = [{ type: 1, name: 'Download .PDF' }, { type: 2, name: 'Download .xlsx' }];

NeracaHeader.propTypes = {
  onSubmit: PropTypes.func,
  indicatorBalance: PropTypes.string,
};

export default function NeracaHeader({ onSubmit, indicatorBalance }) {
  const datePickerRef = useRef(null);
  const anchorRef = useRef(null);

  const token = getSessionToken();
  let decoded = {};
  if (token) {
    decoded = jwtDecode(token);
    console.log('decoded token:', decoded);
  } else {
    console.error('Token not available');
  }

  const { enqueueSnackbar } = useSnackbar();
  const { data, isLoading } = useGetBusinessUnits();
  const { mutate: onDownload, isLoading: downloading } = useDownloadBalance();

  const [open, setOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(1);
  const [selectedUnit, setSelectedUnit] = useState({ name: 'Semua Unit', id: '' });
  const [selectedDate, setSelectedDate] = useState('');

  const handleMenuItemClick = async (type) => {
    setSelectedType(type);
    const payload = {
      type: type === 'preview' ? 1 : type,
      unit: selectedUnit?.id,
      date: selectedDate,
    }
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
          link.setAttribute('download', `Laporan_Laba_Rugi_${selectedUnit?.id}_${selectedDate}.${type === 1 ? 'pdf' : 'xlsx'}`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
          enqueueSnackbar(
            '',
            {
              variant: 'success',
              content: () => (
                <Box
                  display="flex"
                  alignItems="center"
                  sx={{ width: '344px', height: '48px', backgroundColor: '#E1F8EB', padding: '8px', borderRadius: '4px' }}
                >
                  <Iconify height={24} width={24} icon={'lets-icons:check-fill'} color="#27AE60" />
                  <Typography ml="10px" fontWeight={500} fontSize="12px">Dokumen Berhasil di Download</Typography>
                </Box>
              )
            },
          )
        }
      },
      onError: (err) => {
        enqueueSnackbar(err.message, { variant: 'error' });
      },
    });
    setOpen(false);
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

  const getMaxDateForMonthInput = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
  };

  const getPreviousMonth = () => {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() - 1);
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
  };

  useEffect(() => {
    setSelectedDate(getPreviousMonth());
    onSubmit({ unit: decoded?.sub?.businessid ?? selectedUnit?.id, date: getPreviousMonth() })
  }, [])

  useEffect(async () => {
    await setSelectedUnit(data?.[0])
  }, [data])

  return (
    <>
      <Stack direction="row">
        <Stack direction="row" spacing={1} justifyContent="flex-end" flexGrow={1} mb={5} alignItems="center">
          <Typography fontSize="12px" fontWeight={600} color="black">Indicator Balance :</Typography>
          <Box
            sx={{
              display: 'flex',
              width: indicatorBalance === 'Balance' ? '95px' : '128px',
              height: '34px',
              p: '8px, 8px, 0px, 8px',
              borderRadius: '8px',
              backgroundColor: indicatorBalance === 'Balance' ? '#27AE60' : '#E84040',
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}
          >
            <Typography
              sx={{
                width: indicatorBalance === 'Balance' ? '47px' : '80px',
                height: '26px',
                fontSize: '12px',
                fontWeight: 600,
                color: 'white',
                borderColor: indicatorBalance === 'Balance' ? '#E1F8EB' : '#F49F9F',
                borderBottomWidth: '3px',
                borderTopWidth: 0,
                borderRightWidth: 0,
                borderLeftWidth: 0,
                borderStyle: 'solid'
              }}
            >
              {indicatorBalance}
            </Typography>
          </Box>
        </Stack>
      </Stack>
      <Stack direction="row">
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
                onSubmit({ unit: newValue?.id, date: selectedDate })
              }}
              value={selectedUnit}
            />
          )}
          <RHFTextField
            inputRef={datePickerRef}
            size="small"
            sx={{ width: 165 }}
            name="date"
            type="month"
            onClick={() => {
              datePickerRef.current.showPicker()
            }}
            inputProps={{
              max: getMaxDateForMonthInput(),
            }}
            onChange={(event) => {
              setSelectedDate(event.target.value);
              onSubmit({ unit: selectedUnit?.id, date: event.target.value })
            }}
            value={selectedDate}
          />
        </Stack>
        <Stack direction="row" spacing={1}>
          <StyledButton
            sx={{ width: 186 }}
            startIcon={<Description />}
            variant="outlined"
            onClick={() => handleMenuItemClick('preview')}
          >
            Pratinjau Dokumen
          </StyledButton>
          <StyledButton
            ref={anchorRef}
            sx={{ width: 210, justifyContent: 'space-around' }}
            aria-controls={open ? 'split-button-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
            startIcon={<Iconify width={14} height={14} icon={'bi:download'} />}
            endIcon={<Iconify icon={'oui:arrow-down'} />}
            variant="contained"
            disabled={downloading}
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
