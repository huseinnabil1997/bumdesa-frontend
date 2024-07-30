import { Breadcrumbs, Link, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { getSessionToken } from 'src/utils/axiosReportService';
import jwtDecode from 'jwt-decode';
import { ArrowBack, NavigateNext } from '@mui/icons-material';
import { StyledButton } from 'src/theme/custom/Button';

export default function Header() {
  const router = useRouter();
  const token = getSessionToken();
  const user = jwtDecode(token);

  return (
    <Stack direction="row">
      <StyledButton variant="contained">
        <ArrowBack fontSize="small" sx={{ mr: 1 }} />
        Kembali
      </StyledButton>
      <Breadcrumbs sx={{ mt: 1, ml: 3 }} separator={<NavigateNext fontSize="small" />}>
        <Typography fontSize={14} onClick={() => router.push('/')}>
          Dashboard
        </Typography>
        ,
        <Typography fontSize={14} color="text.primary" fontWeight={600}>
          Demografi BUMDesa
        </Typography>
      </Breadcrumbs>
    </Stack>
  );
}
