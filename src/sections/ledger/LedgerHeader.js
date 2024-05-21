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
import { RHFAutocomplete, RHFDateRangePicker } from 'src/components/hook-form';
import { useDownloadLedger } from 'src/query/hooks/ledger/useDownloadLedger';
import { useGetAccount } from 'src/query/hooks/options/useGetAccount';
import { StyledButton } from 'src/theme/custom/Button';
import onDownload from 'src/utils/onDownload';
import onPreview from 'src/utils/onPreview';

const options = ['', 'Unduh format PDF', 'Unduh format Excel'];

LedgerHeader.propTypes = {
  filter: PropTypes.object,
};

export default function LedgerHeader({ filter }) {
  const { enqueueSnackbar } = useSnackbar();

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
          : onDownload({ file: res, title: 'Buku_Besar', type: index });
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
        <RHFDateRangePicker name="year" />
      </Stack>
      <Stack direction="row" spacing={1} sx={{ ml: 1 }}>
        <StyledButton
          disabled={isLoading}
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
    </Stack>
  );
}
