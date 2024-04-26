import { useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import { useTheme } from '@mui/material/styles';
import { Stack, TableRow, TableCell, IconButton, Collapse, Table, TableBody } from '@mui/material';
// components
import moment from 'moment';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { fCurrency } from 'src/utils/formatNumber';
import { DotIcon } from 'src/components/nav-section/vertical/NavItem';
import Iconify from 'src/components/Iconify';
import DeleteConfirmation from 'src/components/modal/DeleteConfirmation';

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

  const { number_of_evidence, date, transaction_information, debit, credit, business_unit_name } =
    row;

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
        selected={selected}
        sx={{
          backgroundColor: index % 2 !== 0 ? theme.palette.grey[100] : 'white',
        }}
      >
        <TableCell>{moment(date).format('DD/MM/yyyy')}</TableCell>
        <TableCell>{number_of_evidence}</TableCell>
        <TableCell>{transaction_information}</TableCell>
        <TableCell>{business_unit_name}</TableCell>
        <TableCell>{debit ? fCurrency(debit) : '-'}</TableCell>
        <TableCell>{credit ? fCurrency(credit) : '-'}</TableCell>
        <TableCell>{credit ? fCurrency(credit) : '-'}</TableCell>
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
