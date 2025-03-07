import { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import { useTheme } from '@mui/material/styles'; // Import useMediaQuery
import { TableRow, TableCell, IconButton, Tooltip, Typography, Chip, styled, Stack } from '@mui/material';
// components
import moment from 'moment';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { fCurrency } from 'src/utils/formatNumber';
import { DotIcon } from 'src/components/nav-section/vertical/NavItem';
import Iconify from 'src/components/Iconify';
import DOMPurify from 'dompurify';

// ----------------------------------------------------------------------

UserTableRowBulk.propTypes = {
  row: PropTypes.object,
  index: PropTypes.number,
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

export default function UserTableRowBulk({ row, index }) {
  const theme = useTheme();

  const {
    number_of_journal,
    date,
    transaction_information,
    debit,
    credit,
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
        <FixedTableCell sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', minWidth: 150 }}>
          <IconButton sx={{ mr: 1 }} size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
          Jurnal #{DOMPurify.sanitize(number_of_journal)}
        </FixedTableCell>
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
        <TableCell>{debit ? fCurrency(debit) : '-'}</TableCell>
        <TableCell>{credit ? fCurrency(credit) : '-'}</TableCell>
        <TableCell align="center">
          {notes_upload ? (
            <Chip
              sx={{ mt: 0.5 }}
              variant="outlined"
              label={notes_upload}
              size="small"
              color="error"
            />
          ) : (
            <Iconify icon={'eva:checkmark-circle-2-fill'} color="#1877F2" width={24} height={24} />
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
            <TableCell colSpan={3}>
              <Stack direction="row" alignItems="center">
                <DotIcon /> {account?.account_name ?? '-'}
              </Stack>
            </TableCell>
            <TableCell>{account.debit ? fCurrency(account.debit) : '-'}</TableCell>
            <TableCell>{account.credit ? fCurrency(account.credit) : '-'}</TableCell>
            <TableCell align="center">
              {account.notes?.length > 0 ? (
                <Fragment>
                  {account.notes.map((note, idx) => (
                    <Chip
                      variant="outlined"
                      sx={{ mt: 0.5 }}
                      label={note}
                      key={idx}
                      size="small"
                      color="error"
                    />
                  ))}
                </Fragment>
              ) : (
                <Iconify
                  icon={'eva:checkmark-circle-2-fill'}
                  color="#1877F2"
                  width={24}
                  height={24}
                />
              )}
            </TableCell>
          </TableRow>
        ))}
    </>
  );
}
