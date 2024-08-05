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

UserTableRow.propTypes = {
  id: PropTypes.string,
  row: PropTypes.object,
  index: PropTypes.number,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  disableDelete: PropTypes.bool,
  role: PropTypes.string,
};

export default function UserTableRow({
  // id,
  row,
  index,
  selected,
  onEditRow,
  onDeleteRow,
  disableDelete = false,
  role,
  from = '',
}) {
  const theme = useTheme();
  const { name, position_name, phone } = row;

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
      <TableCell sx={{ color: '#777777', height: 56 }}>{position_name}</TableCell>
      <TableCell sx={{ color: '#777777', height: 56 }}>{phone}</TableCell>

      {from !== 'kanpus' && <TableCell align="left" sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <IconButton onClick={onEditRow}>
          <Iconify
            icon={'lucide:edit'}
            sx={{ color: theme.palette.primary.main, fontSize: 16 }}
          />
        </IconButton>
        {disableDelete ? (
          <DeleteTooltip title={`Setidaknya harus ada ${role === 'unit' ? '1' : '3'} Pengurus aktif di ${role === 'unit' ? 'Unit Usaha' : 'BUM Desa'}.`}>
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
      </TableCell>}
    </TableRow>
  );
}
