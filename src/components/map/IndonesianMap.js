import { SVGMap } from 'react-svg-map';
import Indonesia from "@svg-maps/indonesia";
import "react-svg-map/lib/index.css";
import { styled } from '@mui/material/styles';

const StyledSVGMap = styled(SVGMap)(({ theme }) => ({
  '& .svg-map__location': {
    fill: '#1078CA',
    stroke: '#1078CA',
  },
  '& .svg-map__location:hover': {
    fill: '#56ADF2',
    stroke: '#56ADF2',
  },
  '& .svg-map__location:active, & .svg-map__location--selected': {
    fill: 'red',
    stroke: 'red',
  },
}));

export default function IndonesianMap() {
  const handleLocationClick = (event) => {
    const locations = document.querySelectorAll('.svg-map__location');
    locations.forEach((location) => location.classList.remove('svg-map__location--selected'));
    event.currentTarget.classList.add('svg-map__location--selected');
  };

  return (
    <StyledSVGMap map={Indonesia} onLocationClick={handleLocationClick} />
  )
}