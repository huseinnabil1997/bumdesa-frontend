import { useState } from 'react';
// @mui
import {
  Card,
  CardHeader,
  TextField,
  Stack,
  Typography,
  Grid,
  CardContent,
  Skeleton,
  Box,
} from '@mui/material';
// components
import { useTheme } from '@emotion/react';
import { DatePicker } from '@mui/lab';
import moment from 'moment';
import { useGetFinances } from 'src/query/hooks/dashboard/useGetFinances';
import { InfoOutlined } from '@mui/icons-material';
import ModalProfitInfo from 'src/components/modal/DProf';
import ModalSolvabilitasInfo from 'src/components/modal/DSolv';
import ModalLikuiditasInfo from 'src/components/modal/DLiq';
import { fCurrencyNoSpace } from 'src/utils/formatNumber';

// ----------------------------------------------------------------------

const DEFAULT_SHOW = {
  p: false,
  s: false,
  l: false,
};

export default function DashboardFinancesBumdesKanpus({ id, unit = false }) {
  const theme = useTheme();

  const [seriesData, setSeriesData] = useState(new Date());

  const [show, setShow] = useState(DEFAULT_SHOW);

  const { data, isLoading } = useGetFinances({
    date: moment(seriesData).format('yyyy'),
    ...(unit ? { unit: id } : { bumdesa_id: id }),
  });

  return (
    <Card elevation={0} sx={{ border: `1px solid ${theme.palette.grey[300]}` }}>
      <CardHeader
        sx={{ p: 3, pb: 0 }}
        title="Ratio Keuangan"
        action={
          <DatePicker
            views={['year']}
            label="Tahun"
            value={seriesData}
            onChange={(newValue) => {
              setSeriesData(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} sx={{ width: 160 }} margin="normal" size="small" />
            )}
          />
        }
      />

      <CardContent>
        {!isLoading && data && (
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Stack sx={{ p: 3, backgroundColor: '#DDEFFC', borderRadius: 1.5 }}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="caption" sx={{ color: '#999' }}>
                    Profitabilitas
                  </Typography>
                  <InfoOutlined
                    sx={{ cursor: 'pointer' }}
                    fontSize="small"
                    color="primary"
                    onClick={() => setShow({ ...DEFAULT_SHOW, p: true })}
                  />
                </Box>

                <Typography variant="subtitle2" sx={{ my: 0.5 }}>
                  Tingkat Pengembalian Aset
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  {data.profitabilitas}%
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={4}>
              <Stack sx={{ p: 3, backgroundColor: '#FEEDDF', borderRadius: 1.5 }}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="caption" sx={{ color: '#999' }}>
                    Liquiditas
                  </Typography>
                  <InfoOutlined
                    sx={{ cursor: 'pointer' }}
                    fontSize="small"
                    color="primary"
                    onClick={() => setShow({ ...DEFAULT_SHOW, l: true })}
                  />
                </Box>

                <Typography variant="subtitle2" sx={{ my: 0.5 }}>
                  Rasio Lancar
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  {data.luquiditas}%
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={4}>
              <Stack sx={{ p: 3, backgroundColor: '#E1F8EB', borderRadius: 1.5 }}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="caption" sx={{ color: '#999' }}>
                    Solvabilitas
                  </Typography>
                  <InfoOutlined
                    sx={{ cursor: 'pointer' }}
                    fontSize="small"
                    color="primary"
                    onClick={() => setShow({ ...DEFAULT_SHOW, s: true })}
                  />
                </Box>

                <Typography variant="subtitle2" sx={{ my: 0.5 }}>
                  Rasio Hutang Terhadap Aset
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  {data.solvabilitas}%
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={4}>
              <Stack sx={{ p: 3, backgroundColor: '#FDF8E9', borderRadius: 1.5 }}>
                {/* <Box display="flex" justifyContent="space-between">
                  <Typography variant="caption" sx={{ color: '#999' }}>
                    Profitabilitas
                  </Typography>
                  <InfoOutlined
                    sx={{ cursor: 'pointer' }}
                    fontSize="small"
                    color="primary"
                    onClick={() => setShow({ ...DEFAULT_SHOW, p: true })}
                  />
                </Box> */}

                <Typography variant="subtitle2" sx={{ my: 0.5 }}>
                  Total Omset
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  {fCurrencyNoSpace(data.totalomset)}
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={4}>
              <Stack sx={{ p: 3, backgroundColor: '#F1D8FF', borderRadius: 1.5 }}>
                {/* <Box display="flex" justifyContent="space-between">
                  <Typography variant="caption" sx={{ color: '#999' }}>
                    Liquiditas
                  </Typography>
                  <InfoOutlined
                    sx={{ cursor: 'pointer' }}
                    fontSize="small"
                    color="primary"
                    onClick={() => setShow({ ...DEFAULT_SHOW, l: true })}
                  />
                </Box> */}

                <Typography variant="subtitle2" sx={{ my: 0.5 }}>
                  Laba Rugi
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  {fCurrencyNoSpace(data.labarugi)}
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={4}>
              <Stack sx={{ p: 3, backgroundColor: '#FCE7E7', borderRadius: 1.5 }}>
                {/* <Box display="flex" justifyContent="space-between">
                  <Typography variant="caption" sx={{ color: '#999' }}>
                    Solvabilitas
                  </Typography>
                  <InfoOutlined
                    sx={{ cursor: 'pointer' }}
                    fontSize="small"
                    color="primary"
                    onClick={() => setShow({ ...DEFAULT_SHOW, s: true })}
                  />
                </Box> */}

                <Typography variant="subtitle2" sx={{ my: 0.5 }}>
                  Total Kas Tunai
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  {fCurrencyNoSpace(data.cash)}
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        )}

        {isLoading && (
          <Box display="flex">
            <Skeleton height={200} width="100%" sx={{ mr: 1 }} />
            <Skeleton height={200} width="100%" sx={{ mx: 1 }} />
            <Skeleton height={200} width="100%" sx={{ ml: 1 }} />
          </Box>
        )}

        <ModalProfitInfo open={show.p} onClose={() => setShow(DEFAULT_SHOW)} />
        <ModalSolvabilitasInfo open={show.s} onClose={() => setShow(DEFAULT_SHOW)} />
        <ModalLikuiditasInfo open={show.l} onClose={() => setShow(DEFAULT_SHOW)} />
      </CardContent>
    </Card>
  );
}
