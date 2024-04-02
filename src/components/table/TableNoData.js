// @mui
import PropTypes from 'prop-types';
import { TableRow, TableCell } from '@mui/material';
//
import EmptyContent from '../EmptyContent';

// ----------------------------------------------------------------------

TableNoData.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  action: PropTypes.node,
  isNotFound: PropTypes.bool,
};

export default function TableNoData({ title, description, action, isNotFound }) {
  if (isNotFound) {
    return (
      <TableRow>
        <TableCell colSpan={9}>
          <EmptyContent
            title={title}
            description={description}
            action={action}
            sx={{
              '& span.MuiBox-root': { height: 160 },
            }}
          />
        </TableCell>
      </TableRow>
    );
  } 
  return null;
}
