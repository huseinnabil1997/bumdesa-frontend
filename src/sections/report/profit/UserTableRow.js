import { useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import { useTheme } from '@mui/material/styles';
import { Stack, TableRow, TableCell, IconButton, Collapse, Table, TableBody } from '@mui/material';
// components
import moment from 'moment';
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
} from '@mui/icons-material';
import { fCurrency } from 'src/utils/formatNumber';
import { DotIcon } from 'src/components/nav-section/vertical/NavItem';
import Iconify from 'src/components/Iconify';

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

  const { level, title, saldo } = row;

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
          backgroundColor: level === '1' ? theme.palette.grey[100] : 'white',
        }}
      >
        <TableCell>
          {title}
        </TableCell>
      </TableRow>
    </>
  );
}
