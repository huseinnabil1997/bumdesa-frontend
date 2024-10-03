// @mui
import { styled } from '@mui/material/styles';
import { Stack, Typography, Checkbox } from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
// hooks
import { useEffect } from 'react';
// guards
import GuestGuard from '../../guards/GuestGuard';
// components
import Page from '../../components/Page';
// sections
import { useRouter } from 'next/router';
import { StyledLoadingButton } from 'src/theme/custom/Button';
import { useState } from 'react';
import { registerForm } from 'src/utils/helperFunction';
import axios from 'axios';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(12, 12),
  flexDirection: 'column',
}));

// ----------------------------------------------------------------------

export default function TermsAndConditions() {
  const [pnp, setPnp] = useState(false);
  const [html, setHtml] = useState('');
  const router = useRouter();

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_BUMDESA_ASSET}privacy-policy/privacy-policy.html`)
      .then(res => {
        setHtml(res.data)
      })
      .catch(err => {
        console.log('err:', err);
      });
  }, [html]);

  return (
    <GuestGuard>
      <Page title="Kebijakan Privasi">
        <RootStyle>
          <Typography my={2} fontSize='22px' fontWeight={700} color='#1078CA'>
            Kebijakan Privasi BUM Desa
          </Typography>
          <Typography>
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </Typography>
          <Stack
            display='flex'
            direction='row'
            alignItems='center'
            my={2}
            onClick={() => setPnp(!pnp)}
            sx={{ cursor: 'pointer' }}
          >
            <Checkbox
              checked={pnp}
              sx={{ ml: -1 }}
            />
            <Typography id="Typography-privacy-policy-kebijakan-privasi" fontSize='14px' fontWeight={400} color="#292929" sx={{ ml: 0.2 }}>
              Saya telah membaca
              <span style={{ fontWeight: 600, color: '#1078CA' }}> Kebijakan Privasi </span>
              BUM Desa
            </Typography>
          </Stack>
          <Stack display='flex' flexDirection='row' justifyContent='space-between'>
            <StyledLoadingButton
              fullWidth
              variant='outlined'
              sx={{ mr: 2, height: '48px' }}
              onClick={() => router.push(PATH_AUTH.login)}
            >
              Tolak
            </StyledLoadingButton>
            <StyledLoadingButton
              disabled={!pnp}
              fullWidth
              variant='contained'
              sx={{ ml: 2, height: '48px' }}
              onClick={() => {
                router.push(PATH_AUTH.register)
                registerForm.privacyPolicy = true;
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