// @mui
import { styled } from '@mui/material/styles';
import { Typography, Card, CardContent, CircularProgress, Chip } from '@mui/material';
//
import Image from 'src/components/Image';
import { useGetProfile } from 'src/query/hooks/profile/useGetProfile';
import { useSelector } from 'react-redux';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  position: 'relative',
  boxShadow: 'none',
  textAlign: 'center',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  height: '110px',
  borderRadius: 16,
  [theme.breakpoints.up('md')]: {
    height: '100%',
    display: 'flex',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

// ----------------------------------------------------------------------

export default function DashboardWelcome({ isUnit }) {
  const userData = useSelector(state => state.user.userData);

  const { data, isLoading } = useGetProfile(userData?.bumdesa_id);

  return (
    <RootStyle>
      <CardContent>
        <Chip
          size="small"
          variant="filled"
          label={isUnit ? 'BUM Desa Unit' : 'BUM Desa Pusat'}
          sx={{ color: 'white', backgroundColor: '#27AE60', fontWeight: 600, fontSize: 12, mb: 1 }}
        />
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            <Typography gutterBottom variant="h4" sx={{ m: 0 }}>
              {data?.name}
            </Typography>
            <Typography variant="body2" sx={{ maxWidth: 480, mx: 'auto' }}>
              {data?.address}
            </Typography>
          </>
        )}
      </CardContent>
      <Image
        visibleByDefault
        disabledEffect
        src="/image/ornament.svg"
        alt="ornament"
        sx={{ height: '100%', position: 'absolute', right: 0 }}
      />
    </RootStyle>
  );
}
