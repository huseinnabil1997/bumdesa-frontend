import PropTypes from 'prop-types';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import Image from '../Image';

// ----------------------------------------------------------------------

const RootStyle = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

const IconStyle = styled('div')(({ theme }) => ({
  marginLeft: -10,
  borderRadius: '50%',
  width: theme.spacing(3),
  height: theme.spacing(3),
  border: `solid 2px ${theme.palette.background.paper}`,
  boxShadow: `inset -1px 1px 2px ${alpha(theme.palette.common.black, 0.24)}`,
  overflow: 'hidden',
}));

// ----------------------------------------------------------------------

ColorPreview.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string),
  limit: PropTypes.number,
  sx: PropTypes.object,
};

export default function ColorPreview({ colors, limit = 3, sx }) {
  const showColor = colors.slice(0, limit);
  const moreColor = colors.length - limit;

  return (
    <RootStyle component="span" sx={sx}>
      {showColor.map((color, index) => (
        <IconStyle key={color + index} sx={{ bgcolor: color, zIndex: index + 10 }}>
          <Image alt={name} src="/image/login.svg" />
        </IconStyle>
      ))}

      {colors.length > limit && <Typography variant="subtitle2">{`+${moreColor}`}</Typography>}
    </RootStyle>
  );
}
