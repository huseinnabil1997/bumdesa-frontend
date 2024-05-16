import { useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import { useTheme } from '@mui/material/styles';
import { TableRow, TableCell } from '@mui/material';
// components
import moment from 'moment';
import { fCurrency } from 'src/utils/formatNumber';
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

export default function UserTableRow({ row, selected, onDeleteRow, index }) {
  const theme = useTheme();

  const [showDelete, setDelete] = useState(false);

  const { number_of_evidence, date, transaction_information, debit, credit, business_unit_name } =
    row;

  return (
    <>
      <TableRow
        hover
        selected={selected}
        sx={{
          backgroundColor: index % 2 !== 0 ? theme.palette.grey[100] : 'white',
        }}
      >
        <TableCell>{moment(date, 'DD-MM-yyyy').format('DD/MM/yyyy')}</TableCell>
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
