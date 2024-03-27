// @mui
import { useTheme } from '@mui/material/styles';
import {
  Card,
  Table,
  Typography,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  CardHeader,
  Stack,
  TableContainer,
  Button,
} from '@mui/material';
// utils
import { fCurrency } from '../../utils/formatNumber';
// _mock_
import { _ecommerceBestSalesman } from '../../_mock';
// components
import Scrollbar from '../../components/Scrollbar';
import moment from 'moment';
import { ArrowDownward, ArrowUpward, Refresh } from '@mui/icons-material';

// ----------------------------------------------------------------------

export default function DashboardBestSalesman() {
  const theme = useTheme();

  return (
    <Card elevation={0} sx={{ border: `1px solid ${theme.palette.grey[300]}` }}>
      <CardHeader
        title="Pemasukan Pengeluaran Unit Usaha"
        subheader={
          <Stack direction="row" alignItems="center">
            <Typography variant="caption">(Last Update 29/09/2023 21:42 WIB)</Typography>
            <Button startIcon={<Refresh fontSize="small" />} sx={{ p: 0, ml: 3, fontWeight: 500 }}>
              Refresh
            </Button>
          </Stack>
        }
      />
      <Scrollbar>
        <TableContainer sx={{ minWidth: 600 }}>
          <Table sx={{ td: { fontSize: '12px' } }}>
            <TableHead>
              <TableRow>
                <TableCell>Tanggal</TableCell>
                <TableCell>Unit Cabang</TableCell>
                <TableCell>Pemasukan</TableCell>
                <TableCell>Pengeluaran</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {_ecommerceBestSalesman.map((row) => (
                <TableRow key={row.name}>
                  <TableCell>{moment().format('DD MMM yyyy')}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>
                    <Stack direction={'row'}>
                      {fCurrency(row.total)}
                      <ArrowUpward fontSize="small" sx={{ ml: 1 }} color="success" />
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack direction={'row'}>
                      {fCurrency(row.total)}
                      <ArrowDownward fontSize="small" sx={{ ml: 1 }} color="error" />
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
    </Card>
  );
}
