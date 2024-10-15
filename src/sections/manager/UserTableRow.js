import PropTypes from 'prop-types';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { TableRow, TableCell, Tooltip, tooltipClasses, IconButton } from '@mui/material';
// components
import Iconify from 'src/components/Iconify';
import { useSelector } from 'react-redux';

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

const styles = {
  tableRow: (index) => ({
    border: 1,
    borderRadius: 8,
    borderColor: '#EAEBEB',
    backgroundColor: index % 2 !== 0 ? '#F8F9F9' : 'white',
  }),
  tableCell: {
    color: '#777777',
    height: 56,
  },
  iconButton: (theme, disableDelete) => ({
    color: disableDelete ? theme.palette.grey : theme.palette.error.main,
    fontSize: 16,
  }),
  editIcon: (theme) => ({
    color: theme.palette.primary.main,
    fontSize: 16,
  }),
};

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
  row,
  index,
  selected,
  onEditRow,
  onDeleteRow,
  disableDelete = false,
  role,
}) {
  const theme = useTheme();
  const userData = useSelector((state) => state.user.userData);
  const { name, position_name, phone } = row;

  const renderDeleteButton = () => (
    <IconButton onClick={disableDelete ? null : onDeleteRow}>
      <Iconify
        icon={'lucide:trash'}
        sx={styles.iconButton(theme, disableDelete)}
      />
    </IconButton>
  );

  return (
    <TableRow
      hover
      selected={selected}
      sx={styles.tableRow(index)}
    >
      <TableCell>{name}</TableCell>
      <TableCell sx={styles.tableCell}>{position_name}</TableCell>
      <TableCell sx={styles.tableCell}>{phone}</TableCell>

      {userData.role !== 1 && userData.role !== 4 && (
        <TableCell align="left" sx={{ display: 'flex', justifyContent: 'center' }}>
          <IconButton onClick={onEditRow}>
            <Iconify
              icon={'lucide:edit'}
              sx={styles.editIcon(theme)}
            />
          </IconButton>
          {disableDelete ? (
            <DeleteTooltip
              title={`Setidaknya harus ada ${role === 'unit' ? '1' : '3'} Pengurus aktif di ${
                role === 'unit' ? 'Unit Usaha' : 'BUM Desa'
              }.`}
            >
              {renderDeleteButton()}
            </DeleteTooltip>
          ) : (
            renderDeleteButton()
          )}
        </TableCell>
      )}
    </TableRow>
  );
}
