import { ArrowDropDown, Download } from '@mui/icons-material';
import { MenuItem, Stack, Grow, Paper, Popper, ClickAwayListener, MenuList } from '@mui/material';
import { useRef, useState } from 'react';
import { RHFAutocomplete } from 'src/components/hook-form';
import RHFDatePicker from 'src/components/hook-form/RHFDatePicker';
import { useGetAccount } from 'src/query/hooks/options/useGetAccount';
import { StyledButton } from 'src/theme/custom/Button';

const options = ['Create a merge commit', 'Squash and merge', 'Rebase and merge'];

export default function LedgerHeader() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(1);

  const { data } = useGetAccount();

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
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
        <RHFDatePicker
          name="year"
          placeholder="Pilih Tahun"
          format="yyyy"
          views={['year']}
          openTo="year"
          sx={{
            width: '200px',
            '& .MuiInputBase-root': {
              height: '40px',
              borderRadius: '8px',
            },
            '& .MuiInputBase-input': {
              height: '11px',
            },
          }}
          require
        />
      </Stack>
      <Stack direction="row" spacing={1}>
        <StyledButton
          ref={anchorRef}
          sx={{ width: 200 }}
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
          startIcon={<Download />}
          endIcon={<ArrowDropDown />}
          variant="outlined"
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
