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

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(12, 12),
  flexDirection: 'column',
}));

// ----------------------------------------------------------------------

export default function TermsAndConditions() {
  const [tnc, setTnc] = useState(false);
  const [pnp, setPnp] = useState(false);
  const [mode, setMode] = useState('Syarat & Ketentuan');
  const router = useRouter();

  return (
    <GuestGuard>
      {mode === 'Syarat & Ketentuan' &&
        <Page title="Syarat & Ketentuan">
          <RootStyle>
            <Typography my={2} fontSize='22px' fontWeight={700} color='#1078CA'>Syarat dan Ketentuan BUM Desa</Typography>
            <Stack my={2}>
              <Typography fontSize='18px' fontWeight={600} color='#1078CA'>Pasal 1 - Ketentuan Umum</Typography>
              <Divider sx={{ bgcolor: '#DDEFFC', height: '2px', my: 1 }} />
              <Stack my={1}>
                <Typography color='#3D3D3D' fontSize='18px' fontWeight={600}>1.1</Typography>
                <Typography color='#3D3D3D' fontSize='18px' fontWeight={600}>Website Bumdesa (selanjutnya disebut "Website") dioperasikan oleh Bum Desa. </Typography>
              </Stack>
            </Stack>
            <Stack display='flex' direction='row' alignItems='center' my={2} onClick={() => setTnc(!tnc)}>
              <Checkbox
                checked={tnc}
                sx={{ ml: -1 }}
              />
              <Typography fontSize='14px' fontWeight={400} color="#292929" sx={{ ml: 0.2 }}>
                Saya telah membaca <span style={{ fontWeight: 600, color: '#1078CA' }}> Syarat dan Ketentuan </span> BUM Desa
              </Typography>
            </Stack>
            <Stack display='flex' flexDirection='row' justifyContent='space-between'>
              <StyledLoadingButton fullWidth variant='outlined' sx={{ mr: 2, height: '48px' }} onClick={() => router.push(PATH_AUTH.login)}>Tolak</StyledLoadingButton>
              <StyledLoadingButton disabled={!tnc} fullWidth variant='contained' sx={{ ml: 2, height: '48px' }} onClick={() => setMode('Kebijakan Privasi')}>Selanjutnya</StyledLoadingButton>
            </Stack>
          </RootStyle>
        </Page>
      }
      {mode === 'Kebijakan Privasi' &&
        <Page title="Kebijakan Privasi">
          <RootStyle>
            <Typography my={2} fontSize='22px' fontWeight={700} color='#1078CA'>Kebijakan Privasi BUM Desa</Typography>
            <Stack my={2}>
              <Typography fontSize='18px' fontWeight={600} color='#1078CA'>Pasal 1 - Ketentuan Umum</Typography>
              <Divider sx={{ bgcolor: '#DDEFFC', height: '2px', my: 1 }} />
              <Stack my={1}>
                <Typography color='#3D3D3D' fontSize='18px' fontWeight={600}>1.1</Typography>
                <Typography color='#3D3D3D' fontSize='18px' fontWeight={600}>Website Bumdesa (selanjutnya disebut "Website") dioperasikan oleh Bum Desa. </Typography>
              </Stack>
            </Stack>
            <Stack display='flex' direction='row' alignItems='center' my={2} onClick={() => setPnp(!pnp)}>
              <Checkbox
                checked={pnp}
                sx={{ ml: -1 }}
              />
              <Typography fontSize='14px' fontWeight={400} color="#292929" sx={{ ml: 0.2 }}>
                Saya telah membaca <span style={{ fontWeight: 600, color: '#1078CA' }}> Kebijakan Privasi </span> BUM Desa
              </Typography>
            </Stack>
            <Stack display='flex' flexDirection='row' justifyContent='space-between'>
              <StyledLoadingButton fullWidth variant='outlined' sx={{ mr: 2, height: '48px' }} onClick={() => router.push(PATH_AUTH.login)}>Tolak</StyledLoadingButton>
              <StyledLoadingButton
                disabled={!pnp}
                fullWidth
                variant='contained'
                sx={{ ml: 2, height: '48px' }}
                onClick={() => {
                  router.push({
                    pathname: PATH_AUTH.register,
                    query: { termsAndConditions: true }
                  })
                }}
              >
                Setuju
              </StyledLoadingButton>
            </Stack>
          </RootStyle>
        </Page>
      }
    </GuestGuard>
  );
}
