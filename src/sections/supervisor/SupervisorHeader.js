import PropTypes from 'prop-types';
import { Add, Search } from '@mui/icons-material';
import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { RHFTextField } from 'src/components/hook-form';
import { StyledButton } from 'src/theme/custom/Button';
import { searchRegexWithEmail } from 'src/utils/regex';
import { useSelector } from 'react-redux';

SupervisorHeader.propTypes = {
  filter: PropTypes.object,
  isEmpty: PropTypes.bool,
  value: PropTypes.string,
};

export default function SupervisorHeader({ value }) {
  const userData = useSelector((state) => state.user.userData);
  const router = useRouter();

  const handleClick = () => {
    router.push('/management/supervisor/create');
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <RHFTextField
          sx={{ width: 420 }}
          fullWidth
          size="small"
          error={!searchRegexWithEmail.test(value) && value !== ''}
          helperText={!searchRegexWithEmail.test(value) && value !== '' ? 'Pencarian tidak valid' : ''}
          placeholder="Cari berdasarkan nama atau email pengawas"
          name="search"
          InputProps={{
            endAdornment: <Search sx={{ color: '#777' }} />,
          }}
        />
        {userData?.role !== 4 && (
          <StyledButton
            sx={{ width: 200 }}
            startIcon={<Add />}
            variant="contained"
            onClick={handleClick}
          >
            Tambah Pengawas
          </StyledButton>
        )}
      </Stack>
    </>
  );
}
