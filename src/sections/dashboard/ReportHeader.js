import { ArrowDropDown } from '@mui/icons-material';
import { Container, Grid, styled, MenuItem, Stack, ButtonGroup, Button } from '@mui/material';
import { useRef, useState } from 'react';
import { RHFAutocomplete, RHFSelect } from 'src/components/hook-form';
import { yearsArray } from 'src/utils/formatTime';

const StyledMenuItemValued = styled(MenuItem)(() => ({
  mx: 1,
  my: 0.5,
  borderRadius: 0.75,
  typography: 'body2',
  textTransform: 'capitalize',
}));

const options = ['Create a merge commit', 'Squash and merge', 'Rebase and merge'];

export default function ReportHeader() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

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
    <>
      <Stack direction="row" sx={{ width: '100%' }} spacing={1}>
        <RHFAutocomplete
          sx={{ width: 200 }}
          size="small"
          name="sector"
          placeholder="Sektor Usaha"
          loading={false}
          options={[].map((option) => option) ?? []}
          getOptionLabel={(option) => option.text}
          renderOption={(props, option) => (
            <li {...props} key={option.value}>
              {option.text}
            </li>
          )}
        />
        <RHFSelect
          size="small"
          sx={{ width: 120 }}
          placeholder="year_founded"
          InputLabelProps={{ shrink: true }}
          SelectProps={{
            native: false,
            sx: { textTransform: 'capitalize' },
            MenuProps: {
              PaperProps: {
                style: {
                  maxHeight: 200,
                  paddingTop: 4,
                  paddingBottom: 4,
                },
              },
            },
          }}
        >
          {yearsArray.map((option) => (
            <StyledMenuItemValued key={option} value={option}>
              {option}
            </StyledMenuItemValued>
          ))}
        </RHFSelect>
      </Stack>
      <Stack>
        <ButtonGroup color="primary" variant="contained" ref={anchorRef}>
          <Button onClick={handleClick}>{options[selectedIndex]}</Button>
          <Button
            size="small"
            aria-controls={open ? 'split-button-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
          >
            <ArrowDropDown />
          </Button>
        </ButtonGroup>
      </Stack>
    </>
  );
}
