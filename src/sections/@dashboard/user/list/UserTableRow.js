import { useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import { useTheme } from '@mui/material/styles';
import { Stack, TableRow, TableCell, IconButton, Collapse, Table, TableBody } from '@mui/material';
// components
import moment from 'moment';
import {
  DeleteOutlineOutlined,
  EditOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from '@mui/icons-material';
import { fCurrency } from 'src/utils/formatNumber';
import { DotIcon } from 'src/components/nav-section/vertical/NavItem';

// ----------------------------------------------------------------------

UserTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onViewRow: PropTypes.func,
};

export default function UserTableRow({ row, selected, onEditRow, onDeleteRow }) {
  const theme = useTheme();

  const { no_evidence, date, remark, debt, credit, unit } = row;

  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell>
          <IconButton sx={{ mr: 1 }} size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
          {no_evidence}
        </TableCell>
        <TableCell>{moment(date).format('DD/MM/yyyy')}</TableCell>
        <TableCell>{remark}</TableCell>
        <TableCell>{unit}</TableCell>
        <TableCell>{debt ? fCurrency(debt) : '-'}</TableCell>
        <TableCell>{credit ? fCurrency(credit) : '-'}</TableCell>

        <TableCell align="right">
          <Stack direction="row">
            <IconButton onClick={onEditRow}>
              <EditOutlined fontSize="small" sx={{ color: theme.palette.primary.main }} />
            </IconButton>
            <IconButton onClick={onDeleteRow}>
              <DeleteOutlineOutlined fontSize="small" sx={{ color: theme.palette.error.main }} />
            </IconButton>
          </Stack>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ p: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Table aria-label="purchases">
              <TableBody>
                {[1, 2, 3].map((historyRow) => (
                  <TableRow key={historyRow}>
                    <TableCell sx={{ pl: 5, display: 'flex' }}>
                      <DotIcon /> {remark}
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
