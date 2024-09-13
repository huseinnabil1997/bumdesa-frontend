import {
  Box,
  Breadcrumbs,
  CircularProgress,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { ArrowBack, ArrowDropDown, Download, NavigateNext } from '@mui/icons-material';
import { StyledButton } from 'src/theme/custom/Button';
import { useMemo, useRef, useState } from 'react';
import { useDownloadSummary } from 'src/query/hooks/dashboard/useDownloadSummary';
import { useSnackbar } from 'notistack';
import onDownload from 'src/utils/onDownload';
import { getSessionToken } from 'src/utils/axios';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';
import { capitalCase } from 'change-case';

const options = ['', 'Unduh format PDF', 'Unduh format Excel'];

Header.propTypes = {
  isEmpty: PropTypes.bool,
};

export default function Header({ isEmpty }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const token = getSessionToken();

  const decoded = useMemo(
    () => ({
      ...jwtDecode(token),
    }),
    [token]
  );

  const { area, province, city, district } = router.query;

  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(1);

  const { mutate: download, isLoading: downloading } = useDownloadSummary();

  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleMenuItemClick = (event, index) => {
    const payload = {
      type: index,
      area,
    };

    if (payload.module === '0') delete payload.module;
    if (payload.action === '0') delete payload.action;

    download(payload, {
      onSuccess: (res) => {
        enqueueSnackbar('Sedang mengunduh...', { variant: 'warning' });
        onDownload({
          file: res,
          title: decoded?.bumdesid + '_Log_Activity',
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

  const nameSortener = (value) => {
    switch (value) {
      case 'DAERAH ISTIMEWA YOGYAKARTA':
        return 'YOGYAKARTA';
      case 'KEPULAUAN BANGKA BELITUNG':
        return 'BANGKA BELITUNG';
      default:
        return value;
    }
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Stack direction="row">
        <StyledButton variant="contained" onClick={() => router.back()}>
          <ArrowBack fontSize="small" sx={{ mr: 1 }} />
          Kembali
        </StyledButton>
        <Breadcrumbs
          maxItems={3}
          sx={{ mt: 1, ml: 3 }}
          separator={<NavigateNext fontSize="small" />}
        >
          <Typography fontSize={14} onClick={() => router.push('/kanpus/dashboard')}>
            Dashboard
          </Typography>
          <Typography
            fontSize={14}
            color={!province && 'text.primary'}
            fontWeight={!province ? 600 : 400}
            sx={{ cursor: 'pointer' }}
            onClick={() => router.push('/kanpus/summary')}
          >
            Demografi BUM Desa
          </Typography>
          {province && (
            <Typography
              fontSize={14}
              color={!city && 'text.primary'}
              fontWeight={!city ? 600 : 400}
              sx={{ cursor: 'pointer' }}
              onClick={() =>
                router.push(
                  `/kanpus/summary/detail?area=${area.substring(0, 2)}&province=${province}`
                )
              }
            >
              {capitalCase(nameSortener(province))}
            </Typography>
          )}
          {city && (
            <Typography
              fontSize={14}
              color={!district && 'text.primary'}
              fontWeight={!district ? 600 : 400}
              sx={{ cursor: 'pointer' }}
              onClick={() =>
                router.push(
                  `/kanpus/summary/detail?area=${area.substring(
                    0,
                    4
                  )}&city=${city}&province=${province}`
                )
              }
            >
              {capitalCase(city)}
            </Typography>
          )}
          {district && (
            <Tooltip title={capitalCase(district)}>
              <Typography
                fontSize={14}
                color="text.primary"
                fontWeight={600}
                sx={{
                  maxWidth: 120,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {capitalCase(district)}
              </Typography>
            </Tooltip>
          )}
        </Breadcrumbs>
      </Stack>

      <StyledButton
        ref={anchorRef}
        sx={{ ml: 1, minWidth: 200 }}
        aria-controls={open ? 'split-button-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-label="select merge strategy"
        aria-haspopup="menu"
        onClick={handleToggle}
        startIcon={downloading ? <CircularProgress size="1rem" /> : <Download />}
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
    </Box>
  );
}
