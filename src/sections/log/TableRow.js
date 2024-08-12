import { useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import { useTheme } from '@mui/material/styles';
import { TableRow, TableCell, Typography } from '@mui/material';
// components
import moment from 'moment';
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

  const { description, timestamp, modul, user_agent } = row;

  return (
    <>
      <TableRow
        hover
        selected={selected}
        sx={{
          backgroundColor: index % 2 !== 0 ? theme.palette.grey[100] : 'white',
        }}
      >
        <TableCell>{description}</TableCell>
        <TableCell>
          <Typography fontSize={14} fontWeight={400}>
            {moment(timestamp).format('DD/MM/yyyy')}
          </Typography>
          <Typography variant="caption">{moment(timestamp).format('HH:mm')}</Typography>
        </TableCell>
        <TableCell sx={{ textTransform: 'capitalize' }}>{modul}</TableCell>
        <TableCell>{user_agent}</TableCell>
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
