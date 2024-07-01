// @mui
import { styled } from '@mui/material/styles';
import { Stack, Typography, Divider, Checkbox } from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
// hooks
// guards
import GuestGuard from '../../guards/GuestGuard';
// components
import Page from '../../components/Page';
// sections
import { useRouter } from 'next/router';
import { StyledLoadingButton } from 'src/theme/custom/Button';
import { useState } from 'react';
import { termsAndConditions } from 'src/sections/auth/terms-and-conditions/data';
import { registerForm } from 'src/utils/helperFunction';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(12, 12),
  flexDirection: 'column',
}));

// ----------------------------------------------------------------------

export default function TermsAndConditions() {
  const [tnc, setTnc] = useState(false);
  const router = useRouter();

  return (
    <GuestGuard>
      <Page title="Syarat & Ketentuan">
        <RootStyle>
          <Typography my={2} fontSize='22px' fontWeight={700} color='#1078CA'>
            Syarat dan Ketentuan BUM Desa
          </Typography>
          {termsAndConditions.map((item, index) => (
            <Stack my={2} key={index}>
              <Typography fontSize='18px' fontWeight={600} color='#1078CA'>
                {item.title}
              </Typography>
              <Divider sx={{ bgcolor: '#DDEFFC', height: '2px', my: 1 }} />
              {item.list.map((item, index) => (
                <Stack my={1} key={index}>
                  {item.point && <Typography color='#3D3D3D' fontSize='18px' fontWeight={600}>
                    {item.point}
                  </Typography>}
                  <Typography color='#3D3D3D' fontSize='16px' fontWeight={500}>
                    {item.description}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          ))}
          <Stack
            display='flex'
            direction='row'
            alignItems='center'
            my={2}
            onClick={() => setTnc(!tnc)}
            sx={{ cursor: 'pointer' }}
          >
            <Checkbox
              checked={tnc}
              sx={{ ml: -1 }}
            />
            <Typography fontSize='14px' fontWeight={400} color="#292929" sx={{ ml: 0.2 }}>
              Saya telah membaca
              <span style={{ fontWeight: 600, color: '#1078CA' }}> Syarat dan Ketentuan </span>
              BUM Desa
            </Typography>
          </Stack>
          <Stack display='flex' flexDirection='row' justifyContent='space-between'>
            <StyledLoadingButton
              fullWidth variant='outlined'
              sx={{ mr: 2, height: '48px' }}
              onClick={() => router.push(PATH_AUTH.login)}
            >
              Tolak
            </StyledLoadingButton>
            <StyledLoadingButton
              disabled={!tnc}
              fullWidth
              variant='contained'
              sx={{ ml: 2, height: '48px' }}
              onClick={() => {
                router.push(PATH_AUTH.register)
                registerForm.termsAndConditions = true;
              }}
            >
              Setuju
            </StyledLoadingButton>
          </Stack>
        </RootStyle>
      </Page>

    </GuestGuard>
  );
}
