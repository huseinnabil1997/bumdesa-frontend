import PropTypes from 'prop-types';
// @mui
import { TableRow, TableCell, styled } from '@mui/material';
// components
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { StyledLoadingButton } from 'src/theme/custom/Button';
import Label from 'src/components/Label';
import { fCurrencyNoSpace } from 'src/utils/formatNumber';

// ----------------------------------------------------------------------

const FixedTableCell = styled(TableCell)(() => ({
  position: 'sticky',
  left: 0,
  backgroundColor: 'white',
  zIndex: 1,
  color: '#1078CA',
  fontWeight: 600,
  '&::after': {
    content: '""',
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: '2px',
    backgroundColor: '#eee', // Right border color
    zIndex: 2, // Ensure the border is on top
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.grey[100],
    '& td': {
      backgroundColor: theme.palette.grey[100],
    },
  },
}));

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
  row,
  onViewRow,
}) {
  const { bumdesa_name, count_unit, year_registered, status_active, status_report, profitability, liquidity, solvability, omset, profit_loss, cash } = row;

  return (
    <StyledTableRow hover>
      <FixedTableCell>{bumdesa_name ?? '-'}</FixedTableCell>
      <TableCell align="left" sx={{ color: '#777777', height: 56 }}>{count_unit ?? '-'}</TableCell>
      <TableCell align="left" sx={{ color: '#777777', height: 56 }}>{year_registered ?? '-'}</TableCell>
      <TableCell align="center">
        <Label color={status_active === '1' ? 'success' : 'error'}>
          {row?.status_active === '1' ? 'Aktif' : 'Belum Aktif'}
        </Label>
      </TableCell>
      <TableCell align="center">
        <Label color={status_report === '1' ? 'success' : 'error'}>
          {status_report === '1' ? 'Aktif' : 'Belum Aktif'}
        </Label>
      </TableCell>
      <TableCell align="left" sx={{ color: '#777777', height: 56 }}>{profitability}%</TableCell>
      <TableCell align="left" sx={{ color: '#777777', height: 56 }}>{liquidity}%</TableCell>
      <TableCell align="left" sx={{ color: '#777777', height: 56 }}>{solvability}%</TableCell>
      <TableCell align="left" sx={{ color: '#777777', height: 56 }}>{fCurrencyNoSpace(omset ?? 0)}</TableCell>
      <TableCell align="left" sx={{ color: '#777777', height: 56 }}>{fCurrencyNoSpace(profit_loss ?? 0)}</TableCell>
      <TableCell align="left" sx={{ color: '#777777', height: 56 }}>{fCurrencyNoSpace(cash ?? 0)}</TableCell>

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
    </StyledTableRow>
  );
}