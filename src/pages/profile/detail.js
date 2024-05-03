import { Card, Container, Stack, Typography } from '@mui/material';
import useSettings from '../../hooks/useSettings';
import Layout from '../../layouts';
import Page from '../../components/Page';
import { useForm } from 'react-hook-form';
import { useTheme } from '@mui/material/styles';
import { ProfileInfo, ProfileInfoForm } from 'src/sections/profile';
import { useState } from 'react';

// ----------------------------------------------------------------------

const styles = {
  card: {
    maxWidth: 960,
    minHeight: 605
  },
  segment: {
    title: {
      height: 56,
      justifyContent: 'center',
      p: '20px 24px 20px 24px',
      borderBottom: 'solid 4px #1078CA',
      text: {
        color: '#292929',
        fontSize: '14px',
        fontWeight: 600,
      }
    },
    content: {
      height: 461
    },
    action: {
      height: 80,
      p: '16px 24px 16px 24px',
      borderTop: 'solid 1px #EAEBEB',
      justifyContent: 'center',
      alignItems: 'flex-end',
      button: {
        width: 160,
        height: 48
      }
    }
  }
}

DetailProfil.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function DetailProfil() {
  const [isEdit, setIsEdit] = useState(false)

  const { themeStretch } = useSettings();
  const theme = useTheme();

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
        <Card sx={styles.card}>
          <Stack direction="column">
            <Stack sx={styles.segment.title}>
              <Typography sx={styles.segment.title.text}>Informasi BUM Desa</Typography>
            </Stack>
            <Stack height={461}>
              {isEdit ? (
                <ProfileInfoForm setIsEdit={() => setIsEdit(!isEdit)} />
              ) : (
                <ProfileInfo isEdit={isEdit} setIsEdit={() => setIsEdit(!isEdit)} />
              )}
            </Stack>
          </Stack>
        </Card>
      </Container>
    </Page >
  );
}
