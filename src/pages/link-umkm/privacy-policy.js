// @mui
import { Container, Typography } from '@mui/material';
// hooks
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
import useSettings from 'src/hooks/useSettings';
import { useEffect, useState } from 'react';
import axios from 'axios';

// ----------------------------------------------------------------------

PrivacyPolicy.getLayout = function getLayout(page) {
  return <Layout title="Kebijakan Privasi LinkUMKM">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function PrivacyPolicy() {
  const { themeStretch } = useSettings();
  const [html, setHtml] = useState('');

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_BUMDESA_ASSET}privacy-policy/privacy-policy-link-umkm.html`)
      .then(res => {
        setHtml(res.data)
      })
      .catch(err => {
        console.log('err:', err);
      });
  }, [html]);

  return (
    <Page>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Typography>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </Typography>
      </Container>
    </Page>
  );
}