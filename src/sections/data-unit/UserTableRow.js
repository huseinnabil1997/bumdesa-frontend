import PropTypes from 'prop-types';
// @mui
import { TableRow, TableCell, styled, Box, Typography } from '@mui/material';
// components
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { StyledLoadingButton } from 'src/theme/custom/Button';
import Label from 'src/components/Label';
import { fCurrencyNoSpace } from 'src/utils/formatNumber';
import { AccessTime, Today } from '@mui/icons-material';
import moment from 'moment';

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

export default function UserTableRow({ row, onViewRow }) {
  const {
    year_registered,
    // last_login,
    status_report,
    profitability,
    liquidity,
    solvability,
    omset,
    profit_loss,
    cash,
    unit_name,
    bumdesa_name,
  } = row;

  const cellStyle = { color: '#777777', height: 56 };

  return (
    <StyledTableRow hover>
      <FixedTableCell onClick={onViewRow} sx={{ cursor: 'pointer' }}>{unit_name ?? '-'}</FixedTableCell>
      <TableCell align="left" sx={cellStyle}>{bumdesa_name}</TableCell>
      {/* <TableCell>
        <Box display="flex">
          <Today color="primary" fontSize="small" sx={{ mr: 1 }} />
          <Typography fontSize={12} fontWeight={400}>
            {last_login ? moment(last_login).utc().format('DD/MM/yyyy') : '-'}
          </Typography>
        </Box>
        <Box display="flex" sx={{ mt: 0.5 }}>
          <AccessTime color="primary" fontSize="small" sx={{ mr: 1 }} />
          <Typography fontSize={12} fontWeight={400}>
            {last_login ? moment(last_login).utc().format('HH:mm') : '-'}
          </Typography>
        </Box>
      </TableCell> */}
      <TableCell align="left" sx={cellStyle}>{year_registered ? moment(year_registered).utc().format('DD/MM/yyyy') : '-'}</TableCell>
      <TableCell align="center">
        <Label color={status_report === '1' ? 'success' : 'error'}>
          {status_report === '1' ? 'Aktif' : 'Belum Aktif'}
        </Label>
      </TableCell>
      <TableCell align="left" sx={cellStyle}>{profitability}%</TableCell>
      <TableCell align="left" sx={cellStyle}>{liquidity}%</TableCell>
      <TableCell align="left" sx={cellStyle}>{solvability}%</TableCell>
      <TableCell align="left" sx={cellStyle}>{fCurrencyNoSpace(omset)}</TableCell>
      <TableCell align="left" sx={cellStyle}>{fCurrencyNoSpace(profit_loss)}</TableCell>
      <TableCell align="left" sx={cellStyle}>{fCurrencyNoSpace(cash)}</TableCell>
      <TableCell align="center">
        <StyledLoadingButton
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