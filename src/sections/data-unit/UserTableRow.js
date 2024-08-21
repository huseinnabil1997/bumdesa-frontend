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
  const {
    // unit_id,
    // count_unit,
    year_registered,
    // status_active,
    status_report,
    profitability,
    liquidity,
    solvability,
    omset,
    profit_loss,
    cash,
    unit_name,
    bumdesa_name,
  } = row;
  
  const formatRupiah = (angka) => new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(angka);

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

      <TableCell 
        sx={{ 
          fontWeight: 600, 
          color: '#1078CA', 
          position: 'sticky', 
          left: 0, 
          backgroundColor: index % 2 !== 0 ? '#F8F9F9' : 'white',
          zIndex: 2,
          '&::after': {
            content: '""',
            position: 'absolute',
            right: 0,
            top: 0,
            width: 4,
            height: '100%',
            backgroundColor: 'inherit',
            zIndex: 1
          }
        }}
      >
        {unit_name}
      </TableCell>
      <TableCell align="left" sx={{ color: '#777777', height: 56 }}>{bumdesa_name}</TableCell>
      <TableCell align="left" sx={{ color: '#777777', height: 56 }}>{year_registered}</TableCell>
      <TableCell align="center">
        {status_report === "1" && (
          <Chip label="Aktif" sx={{ backgroundColor: '#C2F1D6', color: '#1D8348' }} />
        )}
        {status_report === "0" && (
          <Chip label="Belum Aktif" sx={{ backgroundColor: '#F9CFCF', color: '#E41F1F' }} />
        )}
        {status_report === "3" && (
          <Chip label="Belum Aktif" sx={{ backgroundColor: '#F9CFCF', color: '#E41F1F' }} />
        )}
      </TableCell>
      <TableCell align="left" sx={{ color: '#777777', height: 56 }}>{profitability}%</TableCell>
      <TableCell align="left" sx={{ color: '#777777', height: 56 }}>{liquidity}%</TableCell>
      <TableCell align="left" sx={{ color: '#777777', height: 56 }}>{solvability}%</TableCell>
      <TableCell align="left" sx={{ color: '#777777', height: 56 }}>{formatRupiah(omset)}</TableCell>
      <TableCell align="left" sx={{ color: '#777777', height: 56 }}>{formatRupiah(profit_loss)}</TableCell>
      <TableCell align="left" sx={{ color: '#777777', height: 56 }}>{formatRupiah(cash)}</TableCell>

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