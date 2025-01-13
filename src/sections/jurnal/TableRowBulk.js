import { useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import { useTheme } from '@mui/material/styles'; // Import useMediaQuery
import { TableRow, TableCell, IconButton, Tooltip, Typography } from '@mui/material';
// components
import moment from 'moment';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { fCurrency } from 'src/utils/formatNumber';
import { DotIcon } from 'src/components/nav-section/vertical/NavItem';
import Iconify from 'src/components/Iconify';

// ----------------------------------------------------------------------

UserTableRowBulk.propTypes = {
  row: PropTypes.object,
  index: PropTypes.number,
};

export default function UserTableRowBulk({ row, index }) {
  const theme = useTheme();

  const {
    number_of_evidence,
    date,
    transaction_information,
    debit,
    credit,
    business_unit_name,
    transactions,
    notes_upload,
  } = row;

  const [open, setOpen] = useState(false);

  const generateColor = (i, j) => {
    const a = j % 2 !== 0 ? theme.palette.grey[100] : 'white';
    const b = j % 2 !== 1 ? theme.palette.grey[100] : 'white';

    return i % 2 !== 0 ? a : b;
  };

  return (
    <>
      <TableRow
        hover
        sx={{
          backgroundColor: index % 2 !== 0 ? theme.palette.grey[100] : 'white',
        }}
      >
        <TableCell>
          <IconButton sx={{ mr: 1 }} size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
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
          {notes_upload ? (
            <Typography color="error" fontSize={12}>
              {notes_upload}
            </Typography>
          ) : (
            <Iconify icon={'eva:checkmark-fill'} color="#1877F2" width={24} height={24} />
          )}
        </TableCell>
      </TableRow>
      {open &&
        transactions.map((account, idx) => (
          <TableRow
            key={idx}
            sx={{
              backgroundColor: generateColor(index, idx),
            }}
          >
            <TableCell>
              <DotIcon />
            </TableCell>
            <TableCell>{account?.account_code?.label ?? '-'}</TableCell>
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell>{account.debit ? fCurrency(account.debit) : '-'}</TableCell>
            <TableCell>{account.credit ? fCurrency(account.credit) : '-'}</TableCell>
            <TableCell />
          </TableRow>
        ))}
    </>
  );
}
