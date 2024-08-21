import PropTypes from 'prop-types';
// @mui
import { TableRow, TableCell, IconButton, Tooltip, Typography } from '@mui/material';
// components
import moment from 'moment';
import { fCurrency } from 'src/utils/formatNumber';
import Iconify from 'src/components/Iconify';

// ----------------------------------------------------------------------

UserTableRow.propTypes = {
  row: PropTypes.object,
  index: PropTypes.number,
  onViewRow: PropTypes.func,
};

export default function UserTableRow({ row, onViewRow }) {
  const { number_of_evidence, date, transaction_information, debit, credit, business_unit_name } =
    row;

  return (
    <TableRow>
      <TableCell>Sumatera Utara</TableCell>
      <TableCell>203</TableCell>
      <TableCell>999</TableCell>
      <TableCell>389</TableCell>
      <TableCell>{number_of_evidence}</TableCell>
      <TableCell>{moment(date).format('DD/MM/yyyy')}</TableCell>
      <TableCell>
        <Tooltip title={transaction_information}>
          <Typography
            fontSize={14}
            sx={{
              maxWidth: 125,
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}
          >
            {transaction_information === '' ? '-' : transaction_information}
          </Typography>
        </Tooltip>
      </TableCell>
      <TableCell>
        <Tooltip title={business_unit_name}>
          <Typography
            fontSize={14}
            sx={{
              maxWidth: 100,
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}
          >
            {business_unit_name === '' ? '-' : business_unit_name}
          </Typography>
        </Tooltip>
      </TableCell>
      <TableCell>{debit ? fCurrency(debit) : '-'}</TableCell>
      <TableCell>{credit ? fCurrency(credit) : '-'}</TableCell>

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
