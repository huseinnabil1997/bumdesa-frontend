import { Description } from '@mui/icons-material';
import { MenuItem, Stack, Grow, Paper, Popper, ClickAwayListener, MenuList, Box, Typography } from '@mui/material';
// import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useRef, useState } from 'react';
// import { useFormContext } from 'react-hook-form';
import Iconify from 'src/components/Iconify';
import { RHFAutocomplete, RHFTextField } from 'src/components/hook-form';
import { StyledButton } from 'src/theme/custom/Button';

const options = ['Download .PDF', 'Download .xlsx'];

export default function LabaRugiHeader() {
  // const router = useRouter();
  const datePickerRef = useRef(null);
  const { enqueueSnackbar } = useSnackbar();
  // const { watch } = useFormContext();

  // const sectorValue = watch('sector');
  // const dateValue = watch('date');

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    console.log('LabaRugiHeader handleMenuItemClick', event, index)
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

  return (
    <Stack direction="row">
      <Stack direction="row" sx={{ width: '100%' }} spacing={1}>
        <RHFAutocomplete
          sx={{ width: 305 }}
          size="small"
          name="sector"
          placeholder="Sektor Usaha"
          loading={false}
          options={[{ text: 'Semua Unit', value: '' }].map((option) => option) ?? []}
          getOptionLabel={(option) => option.text}
          defaultValue={{ text: 'Semua Unit', value: '' }}
          renderOption={(props, option) => (
            <li {...props} key={option.value}>
              {option.text}
            </li>
          )}
        />
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
        />
      </Stack>
      <Stack direction="row" spacing={1}>
        <StyledButton
          sx={{ width: 186 }}
          startIcon={<Description />}
          variant="outlined"
          onClick={() => window.open('https://www.google.com/', '_blank')}
        >
          Preview Dokumen
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
