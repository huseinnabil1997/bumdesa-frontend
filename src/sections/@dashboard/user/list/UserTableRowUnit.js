import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Avatar, Checkbox, TableRow, TableCell, Typography, MenuItem, Chip, Button } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
// components
import Label from '../../../../components/Label';
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';
import moment from 'moment';
import { StyledLoadingButton } from 'src/theme/custom/Button';

// ----------------------------------------------------------------------

UserTableRowUnit.propTypes = {
  id: PropTypes.string,
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onViewRow: PropTypes.func,
};

export default function UserTableRowUnit({ id, row, index, selected, onEditRow, onSelectRow, onDeleteRow, onViewRow }) {
  const theme = useTheme();

  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const handleActionClick = (action) => {
    if (action && action.callback) {
      action.callback(id);
    }
    handleCloseMenu();
  };

  return (
    <TableRow
      hover
      selected={selected}
      sx={{
        border: 1,
        borderRadius: 8,
        borderColor: '#EAEBEB',
        backgroundColor: index % 2 != 0 ? '#F8F9F9' : 'white',
      }}>
      {/* <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell> */}

      {Object.keys(row).map((key) => {
        if (key === 'email' || key === 'year') {
          return (
            <TableCell sx={{ color: '#777777', height: 56, }} key={key}>{row[key]}</TableCell>
          )
        }
        if (key === 'status') {
          return (
            <TableCell sx={{ color: '#777777', height: 56, }} key={key}>
              {row[key] === 1 && (
                <Chip label="Aktif" sx={{ backgroundColor: '#EB5858', color: 'white' }} />
              )}
              {row[key] === 0 && (
                <Chip label="Belum Aktif" sx={{ backgroundColor: '#2ECC71', color: 'white' }} />
              )}
            </TableCell>
          )
        }
        if (key !== 'id') {
          return (
            <TableCell sx={{ color: '#292929', height: 56 }} key={key}>{row[key]}</TableCell>
          );
        }
        return null;
      })}

      <TableCell align="left" sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <StyledLoadingButton
          variant="contained"
          sx={{ backgroundColor: '#1078CA', width: 80, height: 32 }}
          endIcon={<Iconify icon={'lucide:edit'} />}
          onClick={onEditRow}
        >
          Edit
        </StyledLoadingButton>
        <Button
          variant="outlined"
          sx={{ 
            color: '#E84040', 
            borderColor: '#E84040', 
            borderWidth: 1, 
            width: 80, 
            height: 32,
            '&:hover': {
              color: 'white', // Invert text color to white on hover
              backgroundColor: '#E84040', // Use button border color as background on hover
              borderColor: '#E84040', // Keep border color same on hover
            },
          }}
          endIcon={<DeleteOutlineOutlinedIcon />}
          onClick={onDeleteRow}
        >
          Delete
        </Button>
        {/* <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              {[
                { icon: 'eva:trash-2-outline', label: 'Delete', callback: onDeleteRow },
                { icon: 'eva:eye-fill', label: 'View', callback: onViewRow },
                { icon: 'eva:edit-fill', label: 'Edit', callback: onEditRow },
              ].map((action, index) => (
                <MenuItem key={index} onClick={() => handleActionClick(action)}>
                  <Iconify icon={action.icon} />
                  {action.label}
                </MenuItem>
              ))}
            </>
          }
        /> */}
      </TableCell>
    </TableRow>
  );
}
