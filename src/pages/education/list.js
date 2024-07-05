import { Container, } from '@mui/material';
import useSettings from '../../hooks/useSettings';
import Layout from '../../layouts';
import Page from '../../components/Page';
import React from 'react';
import EducationList from 'src/sections/education/EducationList';
import { data } from 'src/sections/education/data';

// ----------------------------------------------------------------------

Education.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function Education() {

  const { themeStretch } = useSettings();

  return (
    <Page title="Konten Edukasi: List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <EducationList data={data} />
      </Container>
    </Page >
  );
}




