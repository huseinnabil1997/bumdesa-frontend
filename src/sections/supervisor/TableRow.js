import { useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import { useTheme } from '@mui/material/styles'; // Import useMediaQuery
import { Stack, TableRow, TableCell, IconButton } from '@mui/material';
// components
import Iconify from 'src/components/Iconify';
import DeleteConfirmation from 'src/components/modal/DeleteConfirmation';
import Label from 'src/components/Label';

// ----------------------------------------------------------------------

UserTableRow.propTypes = {
  row: PropTypes.object,
  index: PropTypes.number,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function UserTableRow({ row, onEditRow, onDeleteRow, index }) {
  const theme = useTheme();

  const [showDelete, setDelete] = useState(false);

  const { title, name, email, status } = row;

  return (
    <>
      <TableRow
        hover
        sx={{
          backgroundColor: index % 2 !== 0 ? theme.palette.grey[100] : 'white',
        }}
      >
        <TableCell>{name}</TableCell>
        <TableCell>{title ?? '-'}</TableCell>
        <TableCell>{email ?? '-'}</TableCell>
        <TableCell align="center">
          <Label color={status == '1' ? 'success' : 'error'}>
            {status == '1' ? 'Aktif' : 'Tidak Aktif'}
          </Label>
        </TableCell>
        <TableCell align="center">
          <Stack direction="row" justifyContent="center">
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

      <DeleteConfirmation
        open={showDelete}
        onClose={() => setDelete(false)}
        title="Peringatan Hapus!"
        description="Apakah Anda yakin ingin menghapus pengawas ini?"
        action={() => {
          onDeleteRow();
          setDelete(false);
        }}
      />
    </>
  );
}
