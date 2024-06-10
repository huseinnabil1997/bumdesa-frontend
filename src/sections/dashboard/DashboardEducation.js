import PropTypes from 'prop-types';
// @mui
import { Grid, Box, Card, Button, Typography, Stack } from '@mui/material';
// _mock_
import { _ecommerceLatestProducts } from '../../_mock';
//
import Scrollbar from '../../components/Scrollbar';
import { ColorPreview } from '../../components/color-utils';
import { useTheme } from '@emotion/react';
import { ArrowForwardIos, ElectricBolt, StarHalfRounded } from '@mui/icons-material';
import { StyledButton } from 'src/theme/custom/Button';

// ----------------------------------------------------------------------

export default function DashboardLatestProducts() {
  return (
    <Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.5 }}>
        <Typography variant="h5" sx={{ mb: 1 }}>
          Konten Edukasi
        </Typography>
        <StyledButton variant="outlined" endIcon={<ArrowForwardIos fontSize="small" />}>
          Lihat Semua
        </StyledButton>
      </Stack>
      <Box>
        <Grid spacing={2} container sx={{ pb: 3, pt: 1 }}>
          {[1, 2, 3].map((product, i) => (
            <Grid item xs={12} lg={4} xl={3} key={product}>
              <ProductItem product={_ecommerceLatestProducts[i]} />
            </Grid>
          ))}
        </Grid>
      </Box>
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
    description: PropTypes.string,
    price: PropTypes.number,
    priceSale: PropTypes.number,
  }),
};

function ProductItem({ product }) {
  const { name, description } = product;

  const theme = useTheme();

  return (
    <Card elevation={0} sx={{ borderRadius: 1.5, border: `1px solid${theme.palette.grey[300]}` }}>
      <Stack sx={{ flexGrow: 1, minWidth: 200, p: 2 }} spacing={1}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" alignItems="center">
            <Box
              sx={{
                backgroundColor: theme.palette.primary.lighter,
                borderRadius: '50%',
                width: 25,
                height: 25,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '8px',
              }}
            >
              <ElectricBolt sx={{ color: theme.palette.primary.main }} fontSize="small" />
            </Box>
            <Typography fontSize={16} fontWeight={500} sx={{ ml: 0.5 }}>
              BUM Desa
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center">
            <StarHalfRounded color="primary" />
            <Typography fontWeight={600} sx={{ color: 'text.secondary', ml: 0.5 }}>
              <b style={{ color: '#111' }}>4.8</b>
              <span style={{ fontSize: 12, marginLeft: 4 }}>(49)</span>
            </Typography>
          </Stack>
        </Stack>

        <Typography variant="h6" sx={{ pb: 3 }}>
          {name}
        </Typography>
        <Typography variant="body2" sx={{ pb: 3 }}>
          {description}
        </Typography>

        <Stack
          spacing={3}
          sx={{ backgroundColor: theme.palette.primary.lighter, borderRadius: 1.5, px: 1, py: 2 }}
        >
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
