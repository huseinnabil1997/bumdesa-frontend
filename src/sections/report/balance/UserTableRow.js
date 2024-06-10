import { useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import { useTheme } from '@mui/material/styles';
import { Stack, TableRow, TableCell, IconButton } from '@mui/material';
// components
import { DotIcon } from 'src/components/nav-section/vertical/NavItem';
import Iconify from 'src/components/Iconify';
import { isTotalName } from 'src/utils/helperFunction';

// ----------------------------------------------------------------------

function NestedTableRow({ row, index, generateColor, formatCurrency, data }) {
  const [open, setOpen] = useState(false);
  const { nama, saldo } = row;

  // Fungsi untuk mengambil saldo_lalu berdasarkan nama dari data tahun_lalu
  const getNestedSaldoLaluByNama = (nama) => {
    const findSaldoLalu = (children) => {
      for (let child of children) {
        if (child.nama === nama) return child.saldo_lalu;
        if (child.child2) {
          const result = findSaldoLalu(child.child2);
          if (result !== undefined) return result;
        }
      }
    };

    return data.last_year.flatMap(level1 => level1.child ? findSaldoLalu(level1.child) : []).find(result => result !== undefined) || 'Data tidak ditemukan';
  };

  return (
    <>
      <TableRow
        key={row.nama}
        hover
        onClick={() => setOpen(!open)}
        sx={{
          backgroundColor: isTotalName(nama) ? '#E1F8EB' : 'white',
          height: '56px',
          "&:hover": {
            backgroundColor: isTotalName(nama) ? '#A4EBC2 !important' : `${generateColor(index, index)} !important`,
          },
        }}
      >
        <TableCell sx={{ color: isTotalName(nama) ? '#292929' : '#1078CA', fontWeight: 600, fontSize: '14px' }}>
          {row?.child2 && (
            <IconButton sx={{ mr: 1 }} size="small" onClick={() => setOpen(!open)}>
              {open ?
                <Iconify color="#1078CA" width={15} height={15} icon={'mdi:chevron-up-box'} />
                :
                <Iconify color="#1078CA" width={15} height={15} icon={'mdi:chevron-down-box'} />
              }
            </IconButton>
          )}
          {nama}
        </TableCell>
        <TableCell sx={{ color: isTotalName(nama) ? '#292929' : '#1078CA', fontWeight: 600, fontSize: '14px' }}>
          {saldo === 0 ? 'Rp. -' : formatCurrency(saldo)}
        </TableCell>
        <TableCell sx={{ color: isTotalName(nama) ? '#292929' : '#1078CA', fontWeight: 600, fontSize: '14px' }}>
          {getNestedSaldoLaluByNama(nama) === 0 || isNaN(getNestedSaldoLaluByNama(nama)) ? 'Rp. -' : formatCurrency(getNestedSaldoLaluByNama(nama))}
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
            {historyRow?.saldo === 0 ? 'Rp. -' : formatCurrency(historyRow?.saldo)}
          </TableCell>
          <TableCell
            sx={{ fontSize: '12px', fontWeight: 500, color: '#777777' }}
          >
            {getNestedSaldoLaluByNama(historyRow.nama) === 0 || isNaN(getNestedSaldoLaluByNama(historyRow.nama)) ? 'Rp. -' : formatCurrency(getNestedSaldoLaluByNama(historyRow.nama))}
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
  data: PropTypes.object,
};

UserTableRow.propTypes = {
  row: PropTypes.object,
  index: PropTypes.number,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onViewRow: PropTypes.func,
  data: PropTypes.object,
};

export default function UserTableRow({ row, selected, data }) {
  const theme = useTheme();

  // Fungsi untuk mengambil data tahun lalu berdasarkan judul
  const getSaldoLaluByTitle = (title) => {
    const item = data.last_year.find(x => x.title === title);
    return item ? item.saldo_lalu : 'Data tidak ditemukan';
  };

  const { level, title, saldo, child } = row;

  const generateColor = (i, j) => {
    const a = j % 2 !== 0 ? theme.palette.grey[100] : 'white';
    const b = j % 2 !== 1 ? theme.palette.grey[100] : 'white';

    return i % 2 !== 0 ? a : b;
  };

  const formatCurrency = (amount) => {
    if (amount === 0 || amount === '0') {
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
    if (level === '1' && !child) {
      return '#DDEFFC'
    }
    if (level === '1' && child) {
      return 'white'
    }
  }

  const bgColorHover = () => {
    if (level === '1' && !child) {
      return '#A6D6FF'
    }
    if (level === '1' && child) {
      return '#EAEBEB'
    }
  }

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
          borderLeft: level === '1' && child ? '6px solid #F87304' : null
        }}
      >
        <TableCell sx={{ fontSize: '14px', color: level === '1' && !child ? '#1078CA' : '#292929', fontWeight: 600 }}>
          {title}
        </TableCell>
        <TableCell sx={{ fontSize: '14px', color: level === '1' && !child ? '#1078CA' : '#292929', fontWeight: 600 }}>
          {level === '1' && !child ? saldo === 0 ? 'Rp. -' : formatCurrency(saldo) : null}
        </TableCell>
        <TableCell sx={{ fontSize: '14px', color: level === '1' && !child ? '#1078CA' : '#292929', fontWeight: 600 }}>
          {level === '1' && !child ? (getSaldoLaluByTitle(title) === 0 || isNaN(getSaldoLaluByTitle(title)) ? 'Rp. -' : formatCurrency(getSaldoLaluByTitle(title))) : null}
        </TableCell>
      </TableRow>
      {row?.child && row?.child.map((nestedRow, i) => (
        <NestedTableRow
          key={nestedRow.nama}
          row={nestedRow}
          index={i}
          generateColor={generateColor}
          formatCurrency={formatCurrency}
          data={data}
        />
      ))}
    </>
  );
}
