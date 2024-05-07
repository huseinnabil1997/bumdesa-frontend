import { Box, Container } from '@mui/material';
import useSettings from '../../hooks/useSettings';
import Layout from '../../layouts';
import Page from '../../components/Page';
import { FaqsList, FaqsTableToolbar } from 'src/sections/faqs';
import { useState } from 'react';
import { data } from './data';

// ----------------------------------------------------------------------

FAQs.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function FAQs() {
  const [filterName, setFilterName] = useState('');

  const { themeStretch } = useSettings();

  const handleInputChange = (event) => {
    if (event.key === 'Enter') {
      // refetch();
    }
  };

  return (
    <Page title="FAQs: List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Box maxWidth={424}>
          <FaqsTableToolbar
            filterName={filterName}
            onFilterName={setFilterName}
            handleInputChange={handleInputChange}
          />
        </Box>
        <FaqsList data={data} />
      </Container>
    </Page >
  );
}
