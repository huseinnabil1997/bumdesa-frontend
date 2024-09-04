import { Breadcrumbs, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { ArrowBack, NavigateNext } from '@mui/icons-material';
import { StyledButton } from 'src/theme/custom/Button';

export default function Header() {
  const router = useRouter();
  const { area, province, city, district } = router.query;

  return (
    <Stack direction="row">
      <StyledButton variant="contained" onClick={() => router.back()}>
        <ArrowBack fontSize="small" sx={{ mr: 1 }} />
        Kembali
      </StyledButton>
      <Breadcrumbs sx={{ mt: 1, ml: 3 }} separator={<NavigateNext fontSize="small" />}>
        <Typography fontSize={14} onClick={() => router.push('/kanpus/dashboard')}>
          Dashboard
        </Typography>
        <Typography
          fontSize={14}
          color={!province && 'text.primary'}
          fontWeight={!province ? 600 : 400}
          sx={{ cursor: 'pointer' }}
          onClick={() => router.push('/kanpus/summary')}
        >
          Demografi BUMDesa
        </Typography>
        {province && (
          <Typography
            fontSize={14}
            color={!city && 'text.primary'}
            fontWeight={!city ? 600 : 400}
            sx={{ cursor: 'pointer' }}
            onClick={() => router.push(`/kanpus/summary/${province}?area=${area}`)}
          >
            {province}
          </Typography>
        )}
        {city && (
          <Typography
            fontSize={14}
            color={!district && 'text.primary'}
            fontWeight={!district ? 600 : 400}
            sx={{ cursor: 'pointer' }}
            onClick={() => router.push(`/kanpus/summary/${city}?area=${area}`)}
          >
            {city}
          </Typography>
        )}
        {district && (
          <Typography fontSize={14} color="text.primary" fontWeight={600}>
            {district}
          </Typography>
        )}
      </Breadcrumbs>
    </Stack>
  );
}
