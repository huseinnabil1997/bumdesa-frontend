import PropTypes from 'prop-types';
// @mui
import { TableRow, TableCell, styled } from '@mui/material';
// components
import { fCurrencyNoSpace, fNumber } from 'src/utils/formatNumber';
import { capitalCase } from 'change-case';
import Label from 'src/components/Label';
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
  return (
    <StyledTableRow onClick={onViewRow} sx={{ cursor: 'pointer' }} hover>
      <FixedTableCell>{capitalCase(row?.bumdesa_name ?? '')}</FixedTableCell>
      <TableCell>{fNumber(row?.count_unit ?? 0)}</TableCell>
      <TableCell>{row?.year_registered ?? 0}</TableCell>
      <TableCell align="center">
        <Label color={row?.status_active === '1' ? 'success' : 'error'}>
          {row?.status_active === '1' ? 'Aktif' : 'Tidak Aktif'}
        </Label>
      </TableCell>
      <TableCell align="center">
        <Label color={row?.status_report === '1' ? 'success' : 'error'}>
          {row?.status_report === '1' ? 'Aktif' : 'Tidak Aktif'}
        </Label>
      </TableCell>
      <TableCell align="center">
        <Label color={row?.status_report_unit === '1' ? 'success' : 'error'}>
          {row?.status_report_unit === '1' ? 'Aktif' : 'Tidak Aktif'}
        </Label>
      </TableCell>
      <TableCell>{fCurrencyNoSpace(row?.omset ?? 0)}</TableCell>
      <TableCell>{fCurrencyNoSpace(row?.profit_loss ?? 0)}</TableCell>
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
