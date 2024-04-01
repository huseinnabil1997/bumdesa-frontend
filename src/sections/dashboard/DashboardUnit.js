import PropTypes from 'prop-types';
// @mui
import { Link, Card, Typography, Stack, Chip, IconButton } from '@mui/material';
// _mock_
import { _ecommerceLatestProducts } from '../../_mock';
//
import Image from '../../components/Image';
import Scrollbar from '../../components/Scrollbar';
import { useTheme } from '@emotion/react';
import { AddBox, ArrowForwardIos } from '@mui/icons-material';
import { StyledButton } from 'src/theme/custom/Button';

// ----------------------------------------------------------------------

export default function DashboardUnit() {
  return (
    <Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.5 }}>
        <Typography variant="h5" sx={{ mb: 1 }}>
          Daftar Unit Usaha Terkini
        </Typography>
        <StyledButton variant="outlined" endIcon={<ArrowForwardIos fontSize="small" />}>
          Lihat Semua
        </StyledButton>
      </Stack>
      <Scrollbar>
        <Stack spacing={2} direction="row" sx={{ pb: 1, pt: 1 }}>
          <CreateItem />
          {[1, 2, 3].map((product, i) => (
            <ProductItem key={product} product={_ecommerceLatestProducts[i]} />
          ))}
        </Stack>
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

function ProductItem({ product }) {
  const { name, image } = product;

  return (
    <Card elevation={3} sx={{ width: 360, borderRadius: 1.5 }}>
      <Image
        alt={name}
        src={image}
        sx={{ width: '100%', height: 170, borderRadius: `12px 0px 0px`, flexShrink: 0 }}
      />

      <Stack sx={{ flexGrow: 1, minWidth: 200, p: 2 }} spacing={1}>
        <Chip label="Jasa" color="primary" size="small" sx={{ width: 50 }} />
        <Link sx={{ color: 'text.primary', typography: 'subtitle2' }}>{name}</Link>

        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet repudiandae adipisci harum
          eos.
        </Typography>
      </Stack>
    </Card>
  );
}

function CreateItem() {
  const theme = useTheme();

  return (
    <Card
      elevation={3}
      sx={{
        width: 360,
        borderRadius: 1.5,
        backgroundColor: theme.palette.primary.main,
        position: 'relative',
        cursor: 'pointer',
      }}
    >
      <Image alt={name} src="/image/ornament_small.svg" sx={{ position: 'absolute', bottom: 0 }} />

      <Stack sx={{ m: 'auto', height: '100%' }} alignItems="center" justifyContent="center">
        <IconButton>
          <AddBox sx={{ color: 'white' }} fontSize="large" />
        </IconButton>
        <Typography sx={{ color: 'white' }} variant="h6">
          Tambah Unit Usaha
        </Typography>
      </Stack>
    </Card>
  );
}
