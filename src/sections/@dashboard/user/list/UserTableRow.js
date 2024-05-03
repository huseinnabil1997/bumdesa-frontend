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

  const { number_of_evidence, date, transaction_information, debt, credit, unit } = row;

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
        <TableCell>
          <IconButton sx={{ mr: 1 }} size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
          {number_of_evidence}
        </TableCell>
        <TableCell>{moment(date).format('DD/MM/yyyy')}</TableCell>
        <TableCell>{transaction_information}</TableCell>
        <TableCell>{unit}</TableCell>
        <TableCell>{debt ? fCurrency(debt) : '-'}</TableCell>
        <TableCell>{credit ? fCurrency(credit) : '-'}</TableCell>

        <TableCell align="center">
          <Stack direction="row">
            <IconButton onClick={onEditRow}>
              <Iconify
                icon={'lucide:edit'}
                sx={{ color: theme.palette.primary.main, fontSize: 16 }}
              />
            </IconButton>
            <IconButton onClick={onDeleteRow}>
              <Iconify
                icon={'lucide:trash'}
                sx={{ color: theme.palette.error.main, fontSize: 16 }}
              />
            </IconButton>
          </Stack>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ p: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Table aria-label="purchases">
              <TableBody>
                {[1, 2, 3].map((historyRow, idx) => (
                  <TableRow
                    key={historyRow}
                    sx={{
                      backgroundColor: generateColor(index, idx),
                    }}
                  >
                    <TableCell sx={{ pl: 5, display: 'flex' }}>
                      <DotIcon /> {transaction_information}
                    </TableCell>
                    <TableCell width={140}>{debt ? fCurrency(debt) : '-'}</TableCell>
                    <TableCell width={140}>{credit ? fCurrency(credit) : '-'}</TableCell>
                    <TableCell width={100} />
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
