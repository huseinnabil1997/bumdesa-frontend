import { styled, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';

export const BtnLightPrimary = styled(Button)(() => ({
  textTransform: 'none',
  background: '#DDEFFC',
  color: '#1078CA',
}));

export const BtnLightError = styled(Button)(() => ({
  textTransform: 'none',
  background: '#FCE7E7',
  color: '#E84040',
}));

export const StyledButton = styled(Button)(() => ({
  textTransform: 'none',
}));

export const StyledLoadingButton = styled(LoadingButton)(() => ({
  ':hover': { backgroundColor: '#DDEFFC', color: '#1078CA' },
}));
