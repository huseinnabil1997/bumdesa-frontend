import { useState } from 'react';

// @mui
import { Card, Table, TableBody, Container, TableContainer } from '@mui/material';
// hooks
import useSettings from '../../../hooks/useSettings';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import Scrollbar from '../../../components/Scrollbar';
import { TableHeadCustom, TableNoData, TableSkeleton } from '../../../components/table';
import AlertDeleteVendor from '../../../components/modal/DeleteVendor';
// sections
import { UserTableRow } from '../../../sections/report/profit';
import { FormProvider } from 'src/components/hook-form';
import { useForm } from 'react-hook-form';
import { PROFIT_HEAD } from 'src/utils/constant';
import { useTheme } from '@mui/material/styles';
import { StyledButton } from 'src/theme/custom/Button';
import { Add } from '@mui/icons-material';
import { LabaRugiHeader } from 'src/sections/report/profit';
import Iconify from 'src/components/Iconify';
import { AkunForm } from 'src/sections/profile/detail';
// import { useGetProfit } from 'src/query/hooks/report/profit/useGetProfit';

// ----------------------------------------------------------------------

const infoCardStyle = {
  display: 'flex',
  maxWidth: 960,
  height: 56,
  borderLeftColor: '#F87304',
  alignItems: 'center',
  borderLeftWidth: '6px',
  borderStyle: 'solid',
  borderTopWidth: 0,
  borderBottomWidth: 0,
  borderRightWidth: 0,
  padding: '16px 32px 16px 32px',
  fontWeight: 600,
  fontSize: '14px',
  color: '#292929',
  justifyContent: 'space-between',
  borderRadius: '8px'
}

const akunCardStyle = {
  display: 'flex',
  maxWidth: 960,
  height: 56,
  borderLeftColor: '#F87304',
  alignItems: 'center',
  borderLeftWidth: '6px',
  borderStyle: 'solid',
  borderTopWidth: 0,
  borderBottomWidth: 0,
  borderRightWidth: 0,
  padding: '16px 32px 16px 32px',
  fontWeight: 600,
  fontSize: '14px',
  color: '#292929',
  justifyContent: 'space-between',
  mb: 3,
  borderRadius: '8px'
}

DetailProfil.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function DetailProfil() {

  const { themeStretch } = useSettings();
  const theme = useTheme();

  // const { data, isLoading } = useGetProfit();

  // const [filterName, setFilterName] = useState('');
  const [openInfo, setOpenInfo] = useState(null);
  const [openAkun, setOpenAkun] = useState(false);

  // const handleDeleteRow = (id) => {};

  // const handleEditRow = (row) => {};

  // const handleViewRow = (row) => {};

  const methods = useForm({
    defaultValues: { unit: null, year: null },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <Page title="Profil: Detail">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        {openAkun ? (
          <AkunForm open={openAkun} onOpen={() => setOpenAkun(!openAkun)}/>
        ) : (
          <Card
            onClick={() => setOpenAkun(!openAkun)}
            sx={akunCardStyle}
          >
            Akun BUM Desa
            {openAkun ?
              <Iconify color="#1078CA" width={15} height={15} icon={'mdi:chevron-down-box'} />
              :
              <Iconify color="#1078CA" width={15} height={15} icon={'mdi:chevron-right-box'} />
            }
          </Card>
        )}


        <Card
          onClick={() => setOpenInfo(!openInfo)}
          sx={infoCardStyle}
        >
          Informasi BUM Desa
          {openInfo ?
            <Iconify color="#1078CA" width={15} height={15} icon={'mdi:chevron-down-box'} />
            :
            <Iconify color="#1078CA" width={15} height={15} icon={'mdi:chevron-right-box'} />
          }
        </Card>
      </Container>
    </Page >
  );
}
