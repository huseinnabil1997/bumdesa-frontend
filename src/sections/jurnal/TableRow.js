import { useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Stack,
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Table,
  TableBody,
  Skeleton,
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

  const [showDelete, setDelete] = useState(false);

  const {
    id,
    number_of_evidence,
    date,
    transaction_information,
    debit,
    credit,
    business_unit_name,
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
        <TableCell>{transaction_information}</TableCell>
        <TableCell>{business_unit_name}</TableCell>
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
            <IconButton onClick={() => setDelete(true)}>
              <Iconify
                icon={'lucide:trash'}
                sx={{ color: theme.palette.error.main, fontSize: 16 }}
              />
            </IconButton>
          </Stack>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ p: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {isFetched && (
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
                          <DotIcon /> {account.account_code}
                        </TableCell>
                        <TableCell width={120}>
                          {account.debit ? fCurrency(account.debit) : '-'}
                        </TableCell>
                        <TableCell width={120}>
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
