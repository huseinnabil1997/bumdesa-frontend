// @mui
import PropTypes from 'prop-types';
import { TableRow, TableCell } from '@mui/material';
//
import ErrorContent from '../ErrorContent';

// ----------------------------------------------------------------------

TableError.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  action: PropTypes.node,
};

export default function TableError({ title, description, action }) {
  return (
    <TableRow>
      <TableCell colSpan={9}>
        <ErrorContent
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
