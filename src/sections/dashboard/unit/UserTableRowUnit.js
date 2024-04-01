import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { TableRow, TableCell, Chip, Button, Tooltip, tooltipClasses } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
// components
import Iconify from '../../../components/Iconify';
import { StyledLoadingButton } from 'src/theme/custom/Button';

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
  onViewRow: PropTypes.func,
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
  const { name, email, year_founded, status } = row;

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
      <TableCell>
        {status === 1 ? (
          <Chip label="Aktif" sx={{ backgroundColor: '#2ECC71', color: 'white' }} />
        ) : (
          <Chip label="Belum Aktif" sx={{ backgroundColor: '#EB5858', color: 'white' }} />
        )}
      </TableCell>

      <TableCell align="left" sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <StyledLoadingButton
          variant="contained"
          sx={{ backgroundColor: '#1078CA', width: 80, height: 32 }}
          endIcon={<Iconify icon={'lucide:edit'} />}
          onClick={onEditRow}
        >
          Edit
        </StyledLoadingButton>
        <DeleteTooltip title="Setidaknya harus ada 1 unit usaha aktif di BUM Desa.">
          <Button
            variant="outlined"
            // disabled={disableDelete}
            sx={{
              color: disableDelete ? '#777777' : '#E84040',
              borderColor: disableDelete ? '#777777' : '#E84040',
              borderWidth: 1,
              width: 80,
              height: 32,
              '&:hover': {
                color: disableDelete ? '#777777' : 'white',
                backgroundColor: disableDelete ? 'transparent' : '#E84040',
                borderColor: disableDelete ? '#777777' : '#E84040',
              },
            }}
            endIcon={<DeleteOutlineOutlinedIcon />}
            onClick={disableDelete ? null : onDeleteRow}
          >
            Delete
          </Button>
        </DeleteTooltip>
      </TableCell>
    </TableRow>
  );
}
