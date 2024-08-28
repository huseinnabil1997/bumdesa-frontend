import { useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import { useTheme } from '@mui/material/styles'; // Import useMediaQuery
import {
  Stack,
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Table,
  TableBody,
  Skeleton,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
// components
import moment from 'moment';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { fCurrency } from 'src/utils/formatNumber';
import { DotIcon } from 'src/components/nav-section/vertical/NavItem';
import Iconify from 'src/components/Iconify';
import DeleteConfirmation from 'src/components/modal/DeleteConfirmation';
import { useGetJurnal } from 'src/query/hooks/jurnals/useGetJurnal';

// ----------------------------------------------------------------------

UserTableRow.propTypes = {
  row: PropTypes.object,
  index: PropTypes.number,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onViewRow: PropTypes.func,
};

export default function UserTableRow({ row, selected, onEditRow, onDeleteRow, index }) {
  const theme = useTheme();

  // Media queries for responsive behavior
  const isLg = useMediaQuery(theme.breakpoints.between('lg', 'xl')); // 1366px
  const isXl = useMediaQuery(theme.breakpoints.up('xl')); // greater than 1366px
  const is1440 = useMediaQuery('(min-width:1440px) and (max-width:1440px)'); // exactly 1440px

  // Determine width based on breakpoints
  const cellWidth = is1440 ? 134 : isXl ? 150 : isLg ? 117 : 90;

  const [showDelete, setDelete] = useState(false);

  const {
    id,
    number_of_evidence,
    date,
    transaction_information,
    debit,
    credit,
    business_unit_name,
    is_first_balance,
  } = row;

  const [open, setOpen] = useState(false);

  const { data: details, isLoading, isFetched } = useGetJurnal(id, open);

  const generateColor = (i, j) => {
    const a = j % 2 !== 0 ? theme.palette.grey[100] : 'white';
    const b = j % 2 !== 1 ? theme.palette.grey[100] : 'white';

    return i % 2 !== 0 ? a : b;
  };

  return (
    <>
      <TableRow
        hover
        selected={selected}
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
          <Stack direction="row">
            <IconButton onClick={onEditRow}>
              <Iconify
                icon={'lucide:edit'}
                sx={{ color: theme.palette.primary.main, fontSize: 16 }}
              />
            </IconButton>
            {!is_first_balance && (
              <IconButton onClick={() => setDelete(true)}>
                <Iconify
                  icon={'lucide:trash'}
                  sx={{ color: theme.palette.error.main, fontSize: 16 }}
                />
              </IconButton>
            )}
            {is_first_balance && (
              <Tooltip title="Jurnal ini merupakan saldo awal">
                <IconButton>
                  <Iconify
                    icon={'lucide:info'}
                    sx={{ color: theme.palette.grey[500], fontSize: 16 }}
                  />
                </IconButton>
              </Tooltip>
            )}
          </Stack>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ p: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {isFetched && details && (
              <Table aria-label="purchases">
                <TableBody>
                  {details.accounts.length > 0 ? (
                    details.accounts.map((account, idx) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          backgroundColor: generateColor(index, idx),
                        }}
                      >
                        <TableCell colSpan={5} sx={{ pl: 5, display: 'flex' }}>
                          <DotIcon /> {account?.account_code?.label ?? '-'}
                        </TableCell>
                        <TableCell width={cellWidth}>
                          {account.debit ? fCurrency(account.debit) : '-'}
                        </TableCell>
                        <TableCell width={cellWidth}>
                          {account.credit ? fCurrency(account.credit) : '-'}
                        </TableCell>
                        <TableCell width={100} />
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell align="center">Data Kosong</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}

            {isLoading && (
              <Stack sx={{ p: 3 }}>
                <Skeleton height={40} />
                <Skeleton height={40} />
              </Stack>
            )}
          </Collapse>
        </TableCell>
      </TableRow>

      <DeleteConfirmation
        open={showDelete}
        onClose={() => setDelete(false)}
        title="Peringatan Hapus!"
        description="Apakah Anda yakin ingin menghapus jurnal ini?"
        action={() => {
          onDeleteRow();
          setDelete(false);
        }}
      />
    </>
  );
}
