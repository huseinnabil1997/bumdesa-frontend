import PropTypes from 'prop-types';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { TableRow, TableCell, Chip, Tooltip, tooltipClasses, IconButton } from '@mui/material';
// components
import Iconify from '../../../components/Iconify';
import { CheckCircle, DoNotDisturb, Info } from '@mui/icons-material';

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
  onResendRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onDeactivateRow: PropTypes.func,
  onActivateRow: PropTypes.func,
  disableDelete: PropTypes.bool,
  onViewRow: PropTypes.func,
};

export default function UserTableRowUnit({
  // id,
  row,
  index,
  selected,
  onEditRow,
  onViewRow,
  onResendRow,
  onDeleteRow,
  onDeactivateRow,
  onActivateRow,
  disableDelete = false,
}) {
  const theme = useTheme();
  const { name, email, year_founded, status, is_resend } = row;

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
        {status === 1 && (
          <Chip label="Aktif" sx={{ backgroundColor: '#2ECC71', color: 'white' }} />
        )}
        {status === 0 && (
          <Chip label="Belum Aktif" sx={{ backgroundColor: '#EB5858', color: 'white' }} />
        )}
        {status === 3 && (
          <Chip label="Nonaktif" sx={{ backgroundColor: theme.palette.warning.main, color: 'white' }} />
        )}
      </TableCell>

      <TableCell align="left" sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <IconButton onClick={onViewRow}>
          <Info sx={{ color: theme.palette.primary.main, fontSize: 18 }} />
        </IconButton>
        {is_resend && (
          <DeleteTooltip title="Re-send email">
            <IconButton onClick={onResendRow}>
              <Iconify
                icon={'mdi:email-resend-outline'}
                sx={{ color: theme.palette.primary.main, fontSize: 16 }}
              />
            </IconButton>
          </DeleteTooltip>
        )}
        <IconButton onClick={onEditRow}>
          <Iconify
            icon={'lucide:edit'}
            sx={{ color: theme.palette.primary.main, fontSize: 16 }}
          />
        </IconButton>
        {disableDelete ? (
          <DeleteTooltip title="Setidaknya harus ada 1 unit usaha aktif di BUM Desa.">
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
        {status !== 3 &&
          <DeleteTooltip title="Nonaktifkan Unit">
            <IconButton onClick={onDeactivateRow}>
              <DoNotDisturb sx={{ color: theme.palette.warning.main, fontSize: 16 }} />
            </IconButton>
          </DeleteTooltip>
        }
        {status === 3 &&
          <DeleteTooltip title="Aktifkan Unit">
            <IconButton onClick={onActivateRow}>
              <CheckCircle sx={{ color: theme.palette.warning.main, fontSize: 16 }} />
            </IconButton>
          </DeleteTooltip>
        }
      </TableCell>
    </TableRow>
  );
}
