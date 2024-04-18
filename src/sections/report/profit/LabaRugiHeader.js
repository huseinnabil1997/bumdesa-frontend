import { Add, ArrowDropDown, Download, Description } from '@mui/icons-material';
import { MenuItem, Stack, Grow, Paper, Popper, ClickAwayListener, MenuList } from '@mui/material';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { RHFAutocomplete, RHFTextField } from 'src/components/hook-form';
import { StyledButton } from 'src/theme/custom/Button';

const options = ['Download .PDF', 'Download .xlsx'];

export default function LabaRugiHeader() {
  const router = useRouter();
  const { watch } = useFormContext();

  const sectorValue = watch('sector');
  const dateValue = watch('date');

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleClick = () => {
    router.push('/jurnal/create');
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    console.log('LabaRugiHeader handleMenuItemClick', event, index)
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
        <RHFTextField size="small" sx={{ width: 165 }} name="date" type="month" />
      </Stack>
      <Stack direction="row" spacing={1}>
        <StyledButton
          sx={{ width: 186 }}
          startIcon={<Description />}
          variant="outlined"
          onClick={handleClick}
        >
          Preview Dokumen
        </StyledButton>
        <StyledButton
          ref={anchorRef}
          sx={{ width: 210 }}
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
          startIcon={<Download />}
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
