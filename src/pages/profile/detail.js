import { Box, Card, Container, Stack, Typography } from '@mui/material';
import useSettings from '../../hooks/useSettings';
import Layout from '../../layouts';
import Page from '../../components/Page';
import { ProfileInfo, ProfileInfoForm, ProfileInfoFormUnit, ProfileInfoUnit } from 'src/sections/profile';
import { useEffect, useState } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import { useGetProfile } from 'src/query/hooks/profile/useGetProfile';
import { useGetUnitById } from 'src/query/hooks/units/useGetUnitById';

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

  const userData = JSON.parse(localStorage.getItem('userData'));

  const { data, refetch } = useGetProfile(userData?.bumdesa_id)

  const { data: unitData, refetch: refetchUnit } = useGetUnitById(userData?.unit_id);

  useEffect(() => {
    if (userData?.unit_id !== 0) {
      refetchUnit();
    }
  }, [userData?.unit_id])

  return (
    <Page title="Profil: Detail">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Box
          sx={{
            backgroundColor: '#DDEFFC',
            border: 'solid 1px #56ADF2',
            minHeight: '66px',
            borderRadius: '4px',
            p: '12px',
            my: 2,
          }}
        >
          <Stack spacing={0.5}>
            <Stack direction="row" display="flex" alignItems="center" spacing={0.5}>
              <Box width={20} direction="row" display="flex" alignItems="center">
                <InfoIcon fontSize="13.33px" sx={{ color: '#1078CA' }} />
              </Box>
              <Typography fontWeight={700} color="#3D3D3D" fontSize="14px">
                Informasi
              </Typography>
            </Stack>
            <Stack direction="row" display="flex" alignItems="center" spacing={0.5}>
              <Box width={20} direction="row" display="flex" alignItems="center" />
              <Typography variant="caption" fontSize="12px" fontWeight={500} color="#525252">
                ID BUM Desa
                <span style={{ fontSize: '12px', fontWeight: 700 }}>
                  {' '}
                  tidak dapat diubah.
                  {' '}
                </span>
                ID BUM Desa diambil dari data
                <span style={{ fontSize: '12px', fontWeight: 700 }}>
                  {' '}
                  Kemendes
                  {' '}
                </span>
                untuk memvalidasi keabsahan sebuah BUM Desa.
              </Typography>
            </Stack>
          </Stack>
        </Box>

        <Card sx={userData?.unit_id !== 0 ? { ...styles.card, minHeight: 520 } : styles.card}>
          <Stack direction="column">
            <Stack sx={styles.segment.title}>
              <Typography sx={styles.segment.title.text}>Informasi BUM Desa</Typography>
            </Stack>
            <Stack minHeight={461}>
              {isEdit && userData?.unit_id === 0 ? (
                <ProfileInfoForm
                  data={data}
                  setIsEdit={() => {
                    setIsEdit(!isEdit);
                    refetch();
                  }}
                />
              ) : (
                <ProfileInfo
                  data={data}
                  isEdit={isEdit}
                  setIsEdit={() => setIsEdit(!isEdit)}
                />
              )}
            </Stack>
          </Stack>
        </Card>

        {userData?.unit_id !== 0 && <Card sx={userData?.unit_id !== 0 ? { ...styles.card, minHeight: 520, mt: 2 } : styles.card}>
          <Stack direction="column">
            <Stack sx={styles.segment.title}>
              <Typography sx={styles.segment.title.text}>Informasi Unit Usaha</Typography>
            </Stack>
            <Stack minHeight={461}>
              {isEdit ? (
                <ProfileInfoFormUnit
                  data={unitData}
                  setIsEdit={() => {
                    setIsEdit(!isEdit);
                    refetch();
                    refetchUnit();
                  }}
                />
              ) : (
                <ProfileInfoUnit
                  data={unitData}
                  isEdit={isEdit}
                  setIsEdit={() => setIsEdit(!isEdit)}
                />
              )}
            </Stack>
          </Stack>
        </Card>}
      </Container>
    </Page >
  );
}
