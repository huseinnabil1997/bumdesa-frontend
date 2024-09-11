import { Breadcrumbs, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { ArrowBack, NavigateNext } from '@mui/icons-material';
import { StyledButton } from 'src/theme/custom/Button';

export default function Header() {
  const router = useRouter();
  const { area, province, city, district } = router.query;

  const url = '/kanpus/summary';
  const detailUrl = `${url}/detail`;

  return (
    <Stack direction="row">
      <StyledButton variant="contained" onClick={() => router.back()}>
        <ArrowBack fontSize="small" sx={{ mr: 1 }} />
        Kembali
      </StyledButton>
      <Breadcrumbs sx={{ mt: 1, ml: 3 }} maxItems={4} separator={<NavigateNext fontSize="small" />}>
        <Typography fontSize={14} onClick={() => router.push('/kanpus/dashboard')}>
          Dashboard
        </Typography>
        <Typography
          fontSize={14}
          fontWeight={400}
          sx={{ cursor: 'pointer' }}
          onClick={() => router.push(url)}
        >
          Demografi BUM Desa
        </Typography>
        <Typography
          fontSize={14}
          fontWeight={400}
          sx={{ cursor: 'pointer' }}
          onClick={() =>
            router.push(`${detailUrl}?area=${area.substring(0, 2)}&province=${province}`)
          }
        >
          {province}
        </Typography>
        <Typography
          fontSize={14}
          fontWeight={400}
          sx={{ cursor: 'pointer' }}
          onClick={() =>
            router.push(
              `${detailUrl}?area=${area.substring(0, 4)}&city=${city}&province=${province}`
            )
          }
        >
          {city}
        </Typography>
        <Typography
          fontSize={14}
          fontWeight={400}
          sx={{ cursor: 'pointer' }}
          onClick={() =>
            router.push(
              `${detailUrl}?area=${area.substring(
                0,
                6
              )}&city=${city}&province=${province}&district=${district}`
            )
          }
        >
          {district}
        </Typography>
        <Typography fontSize={14} color="text.primary" fontWeight={600}>
          Daftar BUM Desa
        </Typography>
      </Breadcrumbs>
    </Stack>
  );
}
