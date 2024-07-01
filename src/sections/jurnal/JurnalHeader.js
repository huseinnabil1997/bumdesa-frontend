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
} from '@mui/material';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useRef, useState } from 'react';
import { RHFDateRangePicker, RHFTextField } from 'src/components/hook-form';
import { StyledButton } from 'src/theme/custom/Button';
import onDownload from '../../utils/onDownload';
import { useDownloadJurnal } from 'src/query/hooks/jurnals/useDownloadJurnal';

const options = ['', 'Unduh format PDF', 'Unduh format Excel'];

JurnalHeader.propTypes = {
  filter: PropTypes.object,
  isEmpty: PropTypes.bool,
};

export default function JurnalHeader({ filter, isEmpty }) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(1);

  const { enqueueSnackbar } = useSnackbar();

  const { mutate: download, isLoading } = useDownloadJurnal();

  const handleClick = () => {
    router.push('/jurnal/create');
  };

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
          title: 'Jurnal_' + filter?.start_date + '_' + filter?.end_date,
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

  return (
    <>
      <Stack direction="row">
        <Stack direction="row" sx={{ width: '100%' }} spacing={1}>
          <RHFDateRangePicker name="date" />
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
          <StyledButton
            sx={{ width: 200 }}
            startIcon={<Add />}
            variant="contained"
            onClick={handleClick}
          >
            Buat Jurnal
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
      </Stack>
      <RHFTextField
        sx={{ mt: 3 }}
        fullWidth
        size="small"
        placeholder="Cari berdasarkan nomor bukti atau keterangan"
        name="search"
        InputProps={{
          startAdornment: <Search sx={{ color: '#777', mr: 1 }} />,
        }}
      />
    </>
  );
}
