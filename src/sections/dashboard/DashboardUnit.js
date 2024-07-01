import PropTypes from 'prop-types';
import NextLink from 'next/link';
// @mui
import { Link, Card, Typography, Stack, Chip, IconButton, Box, Skeleton } from '@mui/material';
//
import Image from '../../components/Image';
import Scrollbar from '../../components/Scrollbar';
import { useTheme } from '@emotion/react';
import { AddBox, ArrowForwardIos, Verified } from '@mui/icons-material';
import { StyledButton } from 'src/theme/custom/Button';
import { useRouter } from 'next/router';
import { useGetUnits } from 'src/query/hooks/units/useGetUnits';

const CDN_URL = process.env.NEXT_PUBLIC_BUMDESA_ASSET;

// ----------------------------------------------------------------------

export default function DashboardUnit() {
  const router = useRouter();

  const { data, isLoading, isFetched } = useGetUnits({ page: 1, limit: 3 });

  return (
    <Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.5 }}>
        <Typography variant="h5" sx={{ mb: 1 }}>
          Daftar Unit Usaha Terkini
        </Typography>
        <StyledButton
          onClick={() => router.push('/unit/list')}
          variant="outlined"
          endIcon={<ArrowForwardIos fontSize="small" />}
        >
          Lihat Semua
        </StyledButton>
      </Stack>
      <Scrollbar>
        {!isLoading && (
          <Stack spacing={2} direction="row" sx={{ pb: 1, pt: 1, pr: 1, minWidth: 900 }}>
            <CreateItem />
            {isFetched &&
              data?.data &&
              data?.data?.map((row) => <ProductItem key={row.id} data={row} />)}
          </Stack>
        )}

        {isLoading && (
          <Stack direction="row" spacing={3}>
            <Skeleton height={250} width={250} />
            <Skeleton height={250} width={250} />
            <Skeleton height={250} width={250} />
            <Skeleton height={250} width={250} />
          </Stack>
        )}
      </Scrollbar>
    </Stack>
  );
}

// ----------------------------------------------------------------------

ProductItem.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    status: PropTypes.number,
    address: PropTypes.string,
    sector: PropTypes.string,
    photo: PropTypes.string,
  }),
};

function ProductItem({ data }) {
  const router = useRouter();

  const { name, status, photo, address, sector, id } = data;

  const handleClick = () => {
    router.push(`/unit/detail?id=${id}`);
  };

  const img = `${CDN_URL}unit/${photo}`;

  return (
    <Card
      elevation={3}
      sx={{ width: 360, borderRadius: 1.5, cursor: 'pointer' }}
      onClick={handleClick}
    >
      <Image
        alt={name}
        src={img}
        sx={{ width: '100%', height: 170, borderRadius: `12px 0px 0px`, flexShrink: 0 }}
      />

      <Stack sx={{ flexGrow: 1, minWidth: 200, p: 2 }} spacing={1}>
        <Chip label={sector} color="primary" size="small" sx={{ width: 'fit-content' }} />
        <Box display={'flex'}>
          <Link sx={{ color: 'text.primary', typography: 'subtitle2' }}>{name}</Link>
          {status && <Verified color="primary" fontSize="small" sx={{ ml: 1 }} />}
        </Box>

        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {address}
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

      <NextLink href="/unit/new" passHref>
        <Stack sx={{ m: 'auto', height: '100%' }} alignItems="center" justifyContent="center">
          <IconButton>
            <AddBox sx={{ color: 'white' }} fontSize="large" />
          </IconButton>
          <Typography sx={{ color: 'white' }} variant="h6">
            Tambah Unit Usaha
          </Typography>
        </Stack>
      </NextLink>
    </Card>
  );
}
