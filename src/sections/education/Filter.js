import React from 'react';
import { Button, Grid, Rating } from '@mui/material';
import { styled } from '@mui/system';
import StarIcon from '@mui/icons-material/Star';
import StoreIcon from '@mui/icons-material/Store';
import SvgIconStyle from 'src/components/SvgIconStyle';

const ButtonStyled = styled(Button)(({ theme, selected }) => ({
  textTransform: 'none',
  margin: theme.spacing(0.5),
  padding: '12px 16px 12px 16px',
  backgroundColor: selected ? theme.palette.primary.main : 'inherit',
  color: selected ? theme.palette.primary.contrastText : 'inherit',
  minWidth: '220px',
  minHeight: '66px',
  justifyContent: 'space-around',
  alignItems: 'center',
  fontSize: '14px',
  fontWeight: 700,
}));

const IconWrapper = styled('div')(({ theme, selected }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 40,
  height: 40,
  borderRadius: '50%',
  backgroundColor: selected ? 'white' : 'inherit',
  color: selected ? theme.palette.primary.main : theme.palette.primary.light,
}));

const Filter = ({ selected, setSelected }) => {
  const handleButtonClick = (filter) => {
    setSelected(filter);
  };

  return (
    <Grid container justifyContent="space-between">
      <Grid item>
        <ButtonStyled
          selected={selected === 'Pelatihan Umum'}
          onClick={() => handleButtonClick('Pelatihan Umum')}
        >
          <IconWrapper selected={selected === 'Pelatihan Umum'}>
            <SvgIconStyle src={`/icons/ic_book.svg`} />
          </IconWrapper>
          Pelatihan Umum
        </ButtonStyled>
      </Grid>
      <Grid item>
        <ButtonStyled
          selected={selected === 'Modul Rekomendasi'}
          onClick={() => handleButtonClick('Modul Rekomendasi')}
        >
          <IconWrapper selected={selected === 'Modul Rekomendasi'}>
            <Rating
              value={0.5}
              max={1}
              precision={0.01}
              readOnly
              size="large"
              icon={
                <StarIcon sx={{ color: '#1078CA', fontSize: 'inherit', borderRadius: '50%' }} />
              }
              emptyIcon={
                <StarIcon sx={{ color: '#BBDEFA', fontSize: 'inherit', borderRadius: '50%' }} />
              }
            />
          </IconWrapper>
          Modul Rekomendasi
        </ButtonStyled>
      </Grid>
      <Grid item>
        <ButtonStyled
          selected={selected === 'Modul Ultra Mikro'}
          onClick={() => handleButtonClick('Modul Ultra Mikro')}
        >
          <IconWrapper selected={selected === 'Modul Ultra Mikro'}>
            <StoreIcon />
          </IconWrapper>
          Modul Ultra Mikro
        </ButtonStyled>
      </Grid>
      <Grid item>
        <ButtonStyled
          selected={selected === 'Modul Desa Brilian'}
          onClick={() => handleButtonClick('Modul Desa Brilian')}
        >
          <IconWrapper selected={selected === 'Modul Desa Brilian'}>
            <SvgIconStyle src={`/icons/ic_desa_brillian.svg`} />
          </IconWrapper>
          Modul Desa Brilian
        </ButtonStyled>
      </Grid>
    </Grid>
  );
};

export default Filter;
