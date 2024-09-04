import PropTypes from 'prop-types';
// @mui
import { TableRow, TableCell, IconButton, Tooltip, styled } from '@mui/material';
// components
import { fCurrency, fNumber } from 'src/utils/formatNumber';
import Iconify from 'src/components/Iconify';
import { capitalCase } from 'change-case';

// ----------------------------------------------------------------------

UserTableRow.propTypes = {
  row: PropTypes.object,
  index: PropTypes.number,
  onViewRow: PropTypes.func,
};

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

export default function UserTableRow({ row, onViewRow }) {
  const nameSortener = (value) => {
    switch (value) {
      case 'DAERAH ISTIMEWA YOGYAKARTA':
        return 'DI YOGYAKARTA';
      case 'KEPULAUAN BANGKA BELITUNG':
        return 'BANGKA BELITUNG';
      default:
        return value;
    }
  };

  return (
    <TableRow>
      <FixedTableCell>{capitalCase(nameSortener(row?.area))}</FixedTableCell>
      <TableCell>{fNumber(row?.count_bumdesa ?? 0)}</TableCell>
      <TableCell>{fNumber(row?.count_unit ?? 0)}</TableCell>
      <TableCell>{fNumber(row?.count_report ?? 0)}</TableCell>
      <TableCell>{fCurrency(row?.cash ?? 0)}</TableCell>
      <TableCell>{fCurrency(row?.omzet ?? 0)}</TableCell>
      <TableCell>{fCurrency(row?.labarugi ?? 0)}</TableCell>

      <TableCell align="center">
        <Tooltip title="Lihat Detail BUMDesa">
          <IconButton onClick={onViewRow} color="primary">
            <Iconify icon={'lucide:info'} sx={{ fontSize: 16 }} />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}
