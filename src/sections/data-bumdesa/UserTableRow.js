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
  row: PropTypes.object.isRequired,
  index: PropTypes.number,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onResendRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onDeactivateRow: PropTypes.func,
  onActivateRow: PropTypes.func,
  disableDelete: PropTypes.bool,
  onViewRow: PropTypes.func.isRequired,
};

export default function UserTableRow({ row, onViewRow }) {
  const {
    bumdesa_name = '-',
    count_unit = '-',
    year_registered = '-',
    status_active,
    status_report,
    status_report_unit,
    profitability,
    liquidity,
    solvability,
    omset = 0,
    profit_loss = 0,
    cash = 0,
  } = row;

  const renderLabel = (status, activeText = 'Aktif', inactiveText = 'Belum Aktif') => (
    <Label color={status === '1' ? 'success' : 'error'}>
      {status === '1' ? activeText : inactiveText}
    </Label>
  );

  const renderTableCell = (value, align = 'left', sx = { color: '#777777', height: 56 }) => (
    <TableCell align={align} sx={sx}>
      {value}
    </TableCell>
  );

  return (
    <StyledTableRow hover>
      <FixedTableCell>{bumdesa_name}</FixedTableCell>
      {renderTableCell(count_unit)}
      {renderTableCell(year_registered)}
      <TableCell align="center">{renderLabel(status_active)}</TableCell>
      <TableCell align="center">{renderLabel(status_report)}</TableCell>
      <TableCell align="center">{renderLabel(status_report_unit)}</TableCell>
      {renderTableCell(`${profitability}%`)}
      {renderTableCell(`${liquidity}%`)}
      {renderTableCell(`${solvability}%`)}
      {renderTableCell(fCurrencyNoSpace(omset))}
      {renderTableCell(fCurrencyNoSpace(profit_loss))}
      {renderTableCell(fCurrencyNoSpace(cash))}
      <TableCell align="center" sx={{ display: 'flex', justifyContent: 'center' }}>
        <StyledLoadingButton variant="outlined" onClick={onViewRow} startIcon={<InfoOutlinedIcon />}>
          Detail
        </StyledLoadingButton>
      </TableCell>
    </StyledTableRow>
  );
}