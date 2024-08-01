import PropTypes from 'prop-types';
// @mui
import { TableRow, TableCell, Chip } from '@mui/material';
// components
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { StyledLoadingButton } from 'src/theme/custom/Button';

// ----------------------------------------------------------------------

// const DeleteTooltip = styled(({ className, ...props }) => (
//   <Tooltip {...props} arrow classes={{ popper: className }} />
// ))(() => ({
//   [`& .${tooltipClasses.arrow}`]: {
//     color: '#0E69B1',
//   },
//   [`& .${tooltipClasses.tooltip}`]: {
//     backgroundColor: '#0E69B1',
//   },
// }));

// ----------------------------------------------------------------------

UserTableRow.propTypes = {
  id: PropTypes.string,
  row: PropTypes.object,
  index: PropTypes.number,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onResendRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onDeactivateRow: PropTypes.func,
  onActivateRow: PropTypes.func,
  disableDelete: PropTypes.bool,
  onViewRow: PropTypes.func,
};

export default function UserTableRow({
  // id,
  row,
  index,
  selected,
  // onEditRow,
  onViewRow,
  // onResendRow,
  // onDeactivateRow,
  // onActivateRow,
}) {
  // const theme = useTheme();
  const { name, year_founded, status } = row;

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

      <TableCell sx={{ position: 'sticky', left: 0, backgroundColor: 'inherit', zIndex: 1 }}>
        {name}
      </TableCell>
      <TableCell align="left" sx={{ color: '#777777', height: 56 }}>{year_founded}</TableCell>
      <TableCell align="left" sx={{ color: '#777777', height: 56 }}>{year_founded}</TableCell>
      <TableCell align="center">
        {status === 1 && (
          <Chip label="Aktif" sx={{ backgroundColor: '#C2F1D6', color: '#1D8348' }} />
        )}
        {status === 0 && (
          <Chip label="Belum Aktif" sx={{ backgroundColor: '#F9CFCF', color: '#E41F1F' }} />
        )}
        {status === 3 && (
          <Chip label="Belum Aktif" sx={{ backgroundColor: '#F9CFCF', color: '#E41F1F' }} />
        )}
      </TableCell>
      <TableCell align="center">
        {status === 1 && (
          <Chip label="Aktif" sx={{ backgroundColor: '#C2F1D6', color: '#1D8348' }} />
        )}
        {status === 0 && (
          <Chip label="Belum Aktif" sx={{ backgroundColor: '#F9CFCF', color: '#E41F1F' }} />
        )}
        {status === 3 && (
          <Chip label="Belum Aktif" sx={{ backgroundColor: '#F9CFCF', color: '#E41F1F' }} />
        )}
      </TableCell>
      <TableCell align="left" sx={{ color: '#777777', height: 56 }}>{year_founded}</TableCell>

      <TableCell align="center" sx={{ display: 'flex', justifyContent: 'center' }}>
        <StyledLoadingButton
          // size="small"
          variant="outlined"
          onClick={onViewRow}
          startIcon={<InfoOutlinedIcon />}
        >
          Detail
        </StyledLoadingButton>
      </TableCell>
    </TableRow>
  );
}