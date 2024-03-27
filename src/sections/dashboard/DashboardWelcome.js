// @mui
import { styled } from '@mui/material/styles';
import { Typography, Card, CardContent } from '@mui/material';
//
import Image from 'src/components/Image';

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
  return (
    <RootStyle>
      <CardContent>
        <Typography gutterBottom variant="h4" sx={{ m: 0 }}>
          BUM Desa Gunungsari Berkah Gunungsari
        </Typography>
        <Typography variant="body2" sx={{ maxWidth: 480, mx: 'auto' }}>
          Bumiaji, Kota Batu, Malang, Jawa Timur
        </Typography>
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
