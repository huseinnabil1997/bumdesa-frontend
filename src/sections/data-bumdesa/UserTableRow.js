import PropTypes from 'prop-types';
// @mui
import { TableRow, TableCell, Chip } from '@mui/material';
// components
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { StyledLoadingButton } from 'src/theme/custom/Button';

// ----------------------------------------------------------------------

// const DeleteTooltip = styled(({ className, ...props }) => (
//   <Tooltip {...props} arrow classes={{ popper: className }} />
// ))(() => ({
//   [`& .${tooltipClasses.arrow}`]: {
//     color: '#0E69B1',
//   },
//   [`& .${tooltipClasses.tooltip}`]: {
//     backgroundColor: '#0E69B1',
//   },
// }));

// ----------------------------------------------------------------------

UserTableRow.propTypes = {
  id: PropTypes.string,
  row: PropTypes.object,
  index: PropTypes.number,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onResendRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onDeactivateRow: PropTypes.func,
  onActivateRow: PropTypes.func,
  disableDelete: PropTypes.bool,
  onViewRow: PropTypes.func,
};

export default function UserTableRow({
  // id,
  row,
  index,
  selected,
  // onEditRow,
  onViewRow,
  // onResendRow,
  // onDeactivateRow,
  // onActivateRow,
}) {
  // const theme = useTheme();
  const { name, unit_count, founded_at, full_registered, profitabilitas, luquiditas, solvabilitas, total_omset, laba_rugi, kas_tunai } = row;
  
  const formatRupiah = (angka) => angka ? new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(angka) : '-';

  const getYear = (tanggal) => tanggal ? tanggal.slice(0, 4) : '-';

  return (
    <TableRow
      hover
      selected={selected}
      sx={{
        border: 1,
        borderRadius: 8,
        borderColor: '#EAEBEB',
        backgroundColor: index % 2 != 0 ? '#F8F9F9' : 'white',
      }}>

      <TableCell sx={{ position: 'sticky', left: 0, backgroundColor: 'inherit', zIndex: 1 }}>
        {name ?? '-'}
      </TableCell>
      <TableCell align="left" sx={{ color: '#777777', height: 56 }}>{unit_count ?? '-'}</TableCell>
      <TableCell align="left" sx={{ color: '#777777', height: 56 }}>{getYear(founded_at)}</TableCell>
      <TableCell align="center">
        {full_registered === 1 && (
          <Chip label="Aktif" sx={{ backgroundColor: '#C2F1D6', color: '#1D8348' }} />
        )}
        {full_registered === 0 && (
          <Chip label="Belum Aktif" sx={{ backgroundColor: '#F9CFCF', color: '#E41F1F' }} />
        )}
        {!full_registered && (
          <Chip label="Tidak Ada Data" sx={{ backgroundColor: '#EAEBEB', color: '#292929' }} />
        )}
      </TableCell>
      <TableCell align="center">
        {full_registered === 1 && (
          <Chip label="Aktif" sx={{ backgroundColor: '#C2F1D6', color: '#1D8348' }} />
        )}
        {full_registered === 0 && (
          <Chip label="Belum Aktif" sx={{ backgroundColor: '#F9CFCF', color: '#E41F1F' }} />
        )}
        {!full_registered && (
          <Chip label="Tidak Ada Data" sx={{ backgroundColor: '#EAEBEB', color: '#292929' }} />
        )}
      </TableCell>
      <TableCell align="left" sx={{ color: '#777777', height: 56 }}>{profitabilitas ? `${profitabilitas}%` : '-'}</TableCell>
      <TableCell align="left" sx={{ color: '#777777', height: 56 }}>{luquiditas ? `${luquiditas}%` : '-'}</TableCell>
      <TableCell align="left" sx={{ color: '#777777', height: 56 }}>{solvabilitas ? `${solvabilitas}%` : '-'}</TableCell>
      <TableCell align="left" sx={{ color: '#777777', height: 56 }}>{formatRupiah(total_omset)}</TableCell>
      <TableCell align="left" sx={{ color: '#777777', height: 56 }}>{formatRupiah(laba_rugi)}</TableCell>
      <TableCell align="left" sx={{ color: '#777777', height: 56 }}>{formatRupiah(kas_tunai)}</TableCell>

      <TableCell align="center" sx={{ display: 'flex', justifyContent: 'center' }}>
        <StyledLoadingButton
          // size="small"
          variant="outlined"
          onClick={onViewRow}
          startIcon={<InfoOutlinedIcon />}
        >
          Detail
        </StyledLoadingButton>
      </TableCell>
    </TableRow>
  );
}