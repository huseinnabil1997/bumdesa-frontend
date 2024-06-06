// @mui
import { styled } from '@mui/material/styles';
import { Typography, Card, CardContent, CircularProgress } from '@mui/material';
//
import Image from 'src/components/Image';
import { useGetProfile } from 'src/query/hooks/profile/useGetProfile';

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

export default function DashboardWelcome() {
  const { data, isLoading } = useGetProfile();

  return (
    <RootStyle>
      <CardContent>
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
