import PropTypes from 'prop-types';
// @mui
import { Grid, Box, Card, Button, Typography, Stack } from '@mui/material';
// utils
import { fCurrency } from '../../utils/formatNumber';
// _mock_
import { _ecommerceLatestProducts } from '../../_mock';
//
import Image from '../../components/Image';
import Scrollbar from '../../components/Scrollbar';
import { ColorPreview } from '../../components/color-utils';
import { useTheme } from '@emotion/react';
import { Book, LocalFireDepartment, StarHalf } from '@mui/icons-material';

// ----------------------------------------------------------------------

export default function DashboardLatestProducts() {
  return (
    <Stack>
      <Typography variant="h5" sx={{ mb: 1 }}>
        Konten Edukasi
      </Typography>
      <Scrollbar>
        <Grid spacing={2} container sx={{ pb: 3, pt: 1 }}>
          {[1, 2, 3].map((product, i) => (
            <Grid item xs={12} lg={4} xl={3} key={product}>
              <ProductItem product={_ecommerceLatestProducts[i]} />
            </Grid>
          ))}
        </Grid>
      </Scrollbar>
    </Stack>
  );
}

// ----------------------------------------------------------------------

ProductItem.propTypes = {
  product: PropTypes.shape({
    colors: PropTypes.arrayOf(PropTypes.string),
    image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    priceSale: PropTypes.number,
  }),
};

ProductItem.propTypes = {
  product: PropTypes.shape({
    colors: PropTypes.arrayOf(PropTypes.string),
    image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    priceSale: PropTypes.number,
  }),
};

function ProductItem({ product }) {
  const { name } = product;

  const theme = useTheme();

  return (
    <Card elevation={0} sx={{ borderRadius: 1.5, border: `1px solid${theme.palette.grey[300]}` }}>
      <Stack sx={{ flexGrow: 1, minWidth: 200, p: 2 }} spacing={1}>
        <Stack direction="row" alignItems="center">
          <Box
            sx={{
              backgroundColor: theme.palette.error.lighter,
              borderRadius: '50%',
              width: 25,
              height: 25,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '8px',
            }}
          >
            <LocalFireDepartment sx={{ color: theme.palette.error.light }} fontSize="small" />
          </Box>
          <Typography variant="caption" color="gray">
            Gratis
          </Typography>
        </Stack>

        <Typography variant="h6" sx={{ pb: 3 }}>
          {name}
        </Typography>

        <Stack
          spacing={3}
          sx={{ backgroundColor: theme.palette.primary.lighter, borderRadius: 1.5, px: 1, py: 2 }}
        >
          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row" alignItems="center">
              <StarHalf fontSize="small" color="primary" />
              <Typography variant="caption" sx={{ color: 'text.secondary', ml: 0.5 }}>
                4.8 (49)
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center">
              <Book fontSize="small" color="primary" />
              <Typography variant="caption" sx={{ color: 'text.secondary', ml: 0.5 }}>
                Materi
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <ColorPreview limit={4} colors={product.colors} sx={{ minWidth: 72, ml: 1.5 }} />
            <Button variant="contained" size="small">
              Lihat Modul
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
