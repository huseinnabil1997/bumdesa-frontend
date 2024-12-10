import PropTypes from 'prop-types';
// @mui
import { TableRow, TableCell, styled } from '@mui/material';
// components
import { fCurrencyNoSpace, fNumber } from 'src/utils/formatNumber';
import { capitalCase } from 'change-case';
import { StyledLoadingButton } from 'src/theme/custom/Button';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.grey[100],
    '& td': {
      backgroundColor: theme.palette.grey[100],
    },
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
    <StyledTableRow onClick={onViewRow} sx={{ cursor: 'pointer' }} hover>
      <FixedTableCell>{capitalCase(nameSortener(row?.area))}</FixedTableCell>
      <TableCell>{fNumber(row?.count_bumdesa ?? 0)}</TableCell>
      <TableCell>{fNumber(row?.count_unit ?? 0)}</TableCell>
      <TableCell>{fNumber(row?.count_registered ?? 0)}</TableCell>
      <TableCell>{fNumber(row?.count_active ?? 0)}</TableCell>
      <TableCell>{fNumber(row?.count_report ?? 0)}</TableCell>
      <TableCell>{fNumber(row?.count_report_unit ?? 0)}</TableCell>
      <TableCell>{fCurrencyNoSpace(row?.omset ?? 0)}</TableCell>
      <TableCell>{fCurrencyNoSpace(row?.labarugi ?? 0)}</TableCell>
      <TableCell>{fCurrencyNoSpace(row?.cash ?? 0)}</TableCell>

      <TableCell align="center">
        <StyledLoadingButton variant="outlined" onClick={onViewRow} startIcon={<InfoOutlinedIcon />}>
          Detail
        </StyledLoadingButton>
      </TableCell>
      {/* <TableCell align="center">
        <Tooltip title="Lihat Detail BUMDesa">
          <IconButton onClick={onViewRow} color="primary">
            <Iconify icon={'lucide:info'} sx={{ fontSize: 16 }} />
          </IconButton>
        </Tooltip>
      </TableCell> */}
    </StyledTableRow>
  );
}
