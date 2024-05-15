import PropTypes from 'prop-types';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { TableRow, TableCell, Tooltip, tooltipClasses, IconButton } from '@mui/material';
// components
import Iconify from 'src/components/Iconify';

// ----------------------------------------------------------------------

const DeleteTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: '#0E69B1',
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#0E69B1',
  },
}));

// ----------------------------------------------------------------------

UserTableRowUnit.propTypes = {
  id: PropTypes.string,
  row: PropTypes.object,
  index: PropTypes.number,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  disableDelete: PropTypes.bool,
};

export default function UserTableRowUnit({
  // id,
  row,
  index,
  selected,
  onEditRow,
  onDeleteRow,
  disableDelete = false,
}) {
  const theme = useTheme();
  const { name, email, year_founded } = row;

  return (
    <TableRow
      hover
      selected={selected}
      sx={{
        border: 1,
        borderRadius: 8,
        borderColor: '#EAEBEB',
        backgroundColor: index % 2 != 0 ? '#F8F9F9' : 'white',
      }}>

      <TableCell>{name}</TableCell>
      <TableCell sx={{ color: '#777777', height: 56 }}>{email}</TableCell>
      <TableCell sx={{ color: '#777777', height: 56 }}>{year_founded}</TableCell>

      <TableCell align="left" sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <IconButton onClick={onEditRow}>
          <Iconify
            icon={'lucide:edit'}
            sx={{ color: theme.palette.primary.main, fontSize: 16 }}
          />
        </IconButton>
        {disableDelete ? (
          <DeleteTooltip title="Setidaknya harus ada 3 Pengurus aktif di BUM Desa.">
            <IconButton onClick={disableDelete ? null : onDeleteRow}>
              <Iconify
                icon={'lucide:trash'}
                sx={{ color: disableDelete ? theme.palette.grey : theme.palette.error.main, fontSize: 16 }}
              />
            </IconButton>
          </DeleteTooltip>
        ) : (
          <IconButton onClick={disableDelete ? null : onDeleteRow}>
            <Iconify
              icon={'lucide:trash'}
              sx={{ color: disableDelete ? theme.palette.grey : theme.palette.error.main, fontSize: 16 }}
            />
          </IconButton>
        )}
      </TableCell>
    </TableRow>
  );
}
