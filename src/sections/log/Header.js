import { Breadcrumbs, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { ArrowBack, NavigateNext } from '@mui/icons-material';
import { BtnLightPrimary } from 'src/theme/custom/Button';

export default function Header() {
  const router = useRouter();

  return (
    <Stack direction="row">
      <BtnLightPrimary variant="contained" onClick={() => router.push('/log')}>
        <ArrowBack fontSize="small" sx={{ mr: 1 }} />
        Kembali
      </BtnLightPrimary>
      <Breadcrumbs sx={{ mt: 1, ml: 3 }} separator={<NavigateNext fontSize="small" />}>
        <Typography fontSize={14} sx={{ cursor: 'pointer' }} onClick={() => router.push('/log')}>
          Log Aktivitas
        </Typography>

        <Typography fontSize={14} color="text.primary" fontWeight={600}>
          Semua Log Aktivitas
        </Typography>
      </Breadcrumbs>
    </Stack>
  );
}
