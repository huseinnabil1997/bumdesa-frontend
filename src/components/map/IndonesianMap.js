import { SVGMap } from 'react-svg-map';
import Indonesia from '@svg-maps/indonesia';
import { scaleQuantize } from 'd3-scale';
import { useEffect, useState } from 'react';
import { Box, Typography, styled } from '@mui/material';
import 'react-svg-map/lib/index.css';

const colorScale = scaleQuantize()
  .domain([1, 350])
  .range(['#deebf7', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#08519c', '#08306b']);

const StyledSVGMap = styled(SVGMap)(() => ({
  '& .svg-map__location': {
    fill: '#ccc',
    stroke: '#1078CA',
  },
  '& .svg-map__location:hover': {
    fill: '#56ADF2 !important',
    stroke: '#56ADF2 !important',
  },
  '& .svg-map__location:active, & .svg-map__location--selected': {
    fill: 'orange !important',
    stroke: 'orange !important',
  },
}));

const provinceColors = {
  'id-ja': colorScale(100),
  'id-ji': colorScale(200),
  'id-jb': colorScale(Math.floor(Math.random() * (300 - 1 + 1)) + 1),
  'id-ac': colorScale(Math.floor(Math.random() * (300 - 1 + 1)) + 1),
  'id-ba': colorScale(Math.floor(Math.random() * (300 - 1 + 1)) + 1),
  'id-bb': colorScale(Math.floor(Math.random() * (300 - 1 + 1)) + 1),
  'id-be': colorScale(Math.floor(Math.random() * (300 - 1 + 1)) + 1),
  'id-bt': colorScale(Math.floor(Math.random() * (300 - 1 + 1)) + 1),
  'id-go': colorScale(Math.floor(Math.random() * (300 - 1 + 1)) + 1),
  'id-jk': colorScale(Math.floor(Math.random() * (300 - 1 + 1)) + 1),
  'id-jt': colorScale(Math.floor(Math.random() * (300 - 1 + 1)) + 1),
  'id-kb': colorScale(Math.floor(Math.random() * (300 - 1 + 1)) + 1),
  'id-ki': colorScale(Math.floor(Math.random() * (300 - 1 + 1)) + 1),
  'id-kr': colorScale(Math.floor(Math.random() * (300 - 1 + 1)) + 1),
  'id-ks': colorScale(Math.floor(Math.random() * (300 - 1 + 1)) + 1),
  'id-kt': colorScale(Math.floor(Math.random() * (300 - 1 + 1)) + 1),
  'id-ku': colorScale(Math.floor(Math.random() * (300 - 1 + 1)) + 1),
  'id-la': colorScale(Math.floor(Math.random() * (300 - 1 + 1)) + 1),
  'id-ma': colorScale(Math.floor(Math.random() * (300 - 1 + 1)) + 1),
  'id-mu': colorScale(Math.floor(Math.random() * (300 - 1 + 1)) + 1),
  'id-nb': colorScale(Math.floor(Math.random() * (300 - 1 + 1)) + 1),
  'id-nt': colorScale(Math.floor(Math.random() * (300 - 1 + 1)) + 1),
  'id-pa': colorScale(Math.floor(Math.random() * (300 - 1 + 1)) + 1),
  'id-pb': colorScale(Math.floor(Math.random() * (300 - 1 + 1)) + 1),
  'id-ri': colorScale(Math.floor(Math.random() * (300 - 1 + 1)) + 1),
  'id-sa': colorScale(Math.floor(Math.random() * (300 - 1 + 1)) + 1),
  'id-sb': colorScale(Math.floor(Math.random() * (300 - 1 + 1)) + 1),
  'id-sg': colorScale(Math.floor(Math.random() * (300 - 1 + 1)) + 1),
  'id-sn': colorScale(Math.floor(Math.random() * (300 - 1 + 1)) + 1),
  'id-sr': colorScale(Math.floor(Math.random() * (300 - 1 + 1)) + 1),
  'id-ss': colorScale(Math.floor(Math.random() * (300 - 1 + 1)) + 1),
  'id-st': colorScale(Math.floor(Math.random() * (300 - 1 + 1)) + 1),
  'id-su': colorScale(Math.floor(Math.random() * (300 - 1 + 1)) + 1),
  'id-yo': colorScale(Math.floor(Math.random() * (300 - 1 + 1)) + 1),
};

const Tooltip = ({ content, position }) => {
  if (!content) return null;

  const { x, y } = position;
  return (
    <Box
      sx={{
        position: 'absolute',
        background: 'white',
        border: '1px solid black',
        padding: '5px',
        zIndex: '1000' /* Ensure the tooltip is above other elements */,
        pointerEvents: 'none',
        borderRadius: '4px',
      }}
      style={{ left: `${x}px`, top: `${y}px` }}
    >
      <Typography variant="subtitle2">
        Nama Kota: <b>{content}</b>
      </Typography>
    </Box>
  );
};

export default function IndonesianMap() {
  const [tooltipContent, setTooltipContent] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleLocationClick = (event) => {
    const locations = document.querySelectorAll('.svg-map__location');
    locations.forEach((location) => location.classList.remove('svg-map__location--selected'));
    event.currentTarget.classList.add('svg-map__location--selected');
  };

  const handleMouseOver = (event) => {
    const region = event.target;
    if (region.classList.contains('svg-map__location')) {
      const content = region.getAttribute('data-info');
      const id = region.getAttribute('id');
      setTooltipContent(`${content}(${id})`);
      setTooltipPosition({ x: event.pageX + 10, y: event.pageY + 10 });
    }
  };

  const handleMouseMove = (event) => {
    if (tooltipContent) {
      setTooltipPosition({ x: event.pageX + 10, y: event.pageY + 10 });
    }
  };

  const handleMouseOut = () => {
    setTooltipContent(null);
  };

  useEffect(() => {
    const locations = document.querySelectorAll('.svg-map__location');
    locations.forEach((location) => {
      location.classList.remove('svg-map__location');
      location.style.fill = provinceColors[location.id] || '#333';
      location.style.stroke = provinceColors[location.id] || '#333';
      location.classList.add('svg-map__location');
      location.setAttribute('data-info', location.ariaLabel);

      return location;
    });
  }, []);

  return (
    <Box
      id="map"
      onMouseOver={handleMouseOver}
      onMouseMove={handleMouseMove}
      onMouseOut={handleMouseOut}
    >
      <StyledSVGMap map={Indonesia} onLocationClick={handleLocationClick} />
      <Tooltip content={tooltipContent} position={tooltipPosition} />
    </Box>
  );
}
