import { useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import { useTheme } from '@mui/material/styles';
import { Stack, TableRow, TableCell, IconButton } from '@mui/material';
// components
import { DotIcon } from 'src/components/nav-section/vertical/NavItem';
import Iconify from 'src/components/Iconify';

// ----------------------------------------------------------------------

function NestedTableRow({ row, index, generateColor, formatCurrency }) {
  const [open, setOpen] = useState(false);
  const { nama, saldo } = row;

  return (
    <>
      <TableRow
        key={row.nama}
        hover
        onClick={() => setOpen(!open)}
        sx={{
          backgroundColor: 'white',
          height: '56px',
          "&:hover": {
            backgroundColor: `${generateColor(index, index)} !important`,
          },
        }}
      >
        <TableCell sx={{ color: '#1078CA', fontWeight: 600, fontSize: '14px' }}>
          {row?.child2 && (
            <IconButton sx={{ mr: 1 }} size="small" onClick={() => setOpen(!open)}>
              {open ?
                <Iconify color="#1078CA" width={15} height={15} icon={'mdi:chevron-down-box'} />
                :
                <Iconify color="#1078CA" width={15} height={15} icon={'mdi:chevron-right-box'} />
              }
            </IconButton>
          )}
          {nama}
        </TableCell>
        <TableCell sx={{ color: '#1078CA', fontWeight: 600, fontSize: '14px' }}>
          {saldo && formatCurrency(saldo)}
        </TableCell>
      </TableRow>
      {open && row?.child2?.map((historyRow, idx) => (
        <TableRow key={historyRow.nama} sx={{ backgroundColor: generateColor(index, idx), height: '56px' }}>
          <TableCell
            sx={{ display: 'flex', flexDirection: 'row', fontSize: '12px', fontWeight: 500, color: '#777777' }}
          >
            <Stack><DotIcon /></Stack>
            {historyRow.nama}
          </TableCell>
          <TableCell
            sx={{ fontSize: '12px', fontWeight: 500, color: '#777777' }}
          >
            {formatCurrency(historyRow?.saldo)}
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}

// Prop types for the nested row component
NestedTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  generateColor: PropTypes.func.isRequired,
  formatCurrency: PropTypes.func.isRequired,
};

UserTableRow.propTypes = {
  row: PropTypes.object,
  index: PropTypes.number,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onViewRow: PropTypes.func,
};

export default function UserTableRow({ row, selected }) {
  const theme = useTheme();

  const { level, title, saldo } = row;

  // const [open, setOpen] = useState(false);

  const generateColor = (i, j) => {
    const a = j % 2 !== 0 ? theme.palette.grey[100] : 'white';
    const b = j % 2 !== 1 ? theme.palette.grey[100] : 'white';

    return i % 2 !== 0 ? a : b;
  };

  const formatCurrency = (amount) => {
    if (amount === 0) {
      return 'Rp. -';
    }

    const formattedAmount = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);

    if (!formattedAmount.includes(',')) {
      return formattedAmount.replace('Rp', 'Rp.');
    }

    return formattedAmount;
  };


  const bgColor = () => {
    if (saldo) {
      return '#DDEFFC'
    }
    if (level === '1') {
      return 'white'
    }
  }

  const bgColorHover = () => {
    if (saldo) {
      return '#A6D6FF'
    }
    if (level === '1') {
      return '#EAEBEB'
    }
  }

  console.log('row', row)

  return (
    <>
      <TableRow
        hover
        selected={selected}
        sx={{
          backgroundColor: bgColor(),
          height: '56px',
          "&:hover": {
            backgroundColor: `${bgColorHover()} !important`
          },
          borderLeft: level === '1' ? '6px solid #F87304' : null
        }}
      >
        <TableCell sx={{ fontSize: '14px', color: saldo ? '#1078CA' : '#292929', fontWeight: 600 }}>
          {title}
        </TableCell>
        <TableCell sx={{ fontSize: '14px', color: saldo ? '#1078CA' : '#292929', fontWeight: 600 }}>
          {saldo && formatCurrency(saldo)}
        </TableCell>
      </TableRow>
      {row?.child && row?.child.map((nestedRow, i) => (
        <NestedTableRow
          key={nestedRow.nama}
          row={nestedRow}
          index={i}
          generateColor={generateColor}
          formatCurrency={formatCurrency}
        />
      ))}
    </>
  );
}

