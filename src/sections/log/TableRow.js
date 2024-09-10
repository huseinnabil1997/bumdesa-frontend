import PropTypes from 'prop-types';
// @mui
import { useTheme } from '@mui/material/styles';
import { TableRow, TableCell, Typography, Tooltip, Box } from '@mui/material';
// components
import moment from 'moment';
import { AccessTime, Info, Today } from '@mui/icons-material';
import TextMaxLine from 'src/components/TextMaxLine';
import { StyledButton } from 'src/theme/custom/Button';

// ----------------------------------------------------------------------

UserTableRow.propTypes = {
  row: PropTypes.object,
  index: PropTypes.number,
  onClickDetail: PropTypes.func,
};

export default function UserTableRow({ row, selected, onClickDetail, index }) {
  const theme = useTheme();

  const { description, timestamp, modul, user_agent, url } = row;

  return (
    <>
      <TableRow
        hover
        selected={selected}
        sx={{
          backgroundColor: index % 2 !== 0 ? theme.palette.grey[100] : 'white',
        }}
      >
        <TableCell>
          <Tooltip title={description}>
            <TextMaxLine variant="body2" line={3}>
              {description}
            </TextMaxLine>
          </Tooltip>
        </TableCell>
        <TableCell>
          <Box display="flex">
            <Today color="primary" fontSize="small" sx={{ mr: 1 }} />
            <Typography fontSize={12} fontWeight={400}>
              {moment(timestamp).format('DD/MM/yyyy')}
            </Typography>
          </Box>
          <Box display="flex" sx={{ mt: 0.5 }}>
            <AccessTime color="primary" fontSize="small" sx={{ mr: 1 }} />
            <Typography fontSize={12} fontWeight={400}>
              {moment(timestamp).utc().format('HH:mm')}
            </Typography>
          </Box>
        </TableCell>
        <TableCell sx={{ textTransform: 'capitalize' }}>{modul}</TableCell>
        <TableCell>
          <Tooltip title={user_agent}>
            <TextMaxLine variant="caption" line={2}>
              {user_agent}
            </TextMaxLine>
          </Tooltip>
        </TableCell>
        <TableCell align="right">
          {url && (
            <StyledButton color="primary" onClick={onClickDetail} variant="outlined">
              <Info fontSize="small" sx={{ mr: 1 }} />
              Detail
            </StyledButton>
          )}
        </TableCell>
      </TableRow>
    </>
  );
}
