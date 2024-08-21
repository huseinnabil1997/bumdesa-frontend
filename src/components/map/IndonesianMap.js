import { SVGMap } from 'react-svg-map';
import { scaleQuantize } from 'd3-scale';
import { useEffect, useState } from 'react';
import { Box, Typography, styled } from '@mui/material';
import 'react-svg-map/lib/index.css';
import { path } from './path';

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
      <Typography variant="subtitle2">{content}</Typography>
    </Box>
  );
};

export default function IndonesianMap({ data }) {
  const [tooltipContent, setTooltipContent] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const colorScale = scaleQuantize()
    .domain([0, 5])
    .range([
      '#deebf7',
      '#c6dbef',
      '#9ecae1',
      '#6baed6',
      '#4292c6',
      '#2171b5',
      '#08519c',
      '#08306b',
    ]);

  const handleLocationClick = (event) => {
    const locations = document.querySelectorAll('.svg-map__location');
    locations.forEach((location) => location.classList.remove('svg-map__location--selected'));
    event.currentTarget.classList.add('svg-map__location--selected');
  };

  const handleMouseOver = (event) => {
    const region = event.target;
    if (region.classList.contains('svg-map__location')) {
      const content = region.getAttribute('data-info');
      setTooltipContent(content);
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
    if (data?.length > 0) {
      const locations = document.querySelectorAll('.svg-map__location');
      locations.forEach((location) => {
        const find = data.find((row) => row.id === location.id);
        const color = colorScale(find.total_bumdesa);
        location.classList.remove('svg-map__location');
        location.style.fill = color || '#333';
        location.style.stroke = color || '#333';
        location.classList.add('svg-map__location');
        location.setAttribute('data-info', `${location.ariaLabel}: ${find.total_bumdesa}`);

        return location;
      });
    }
  }, [data]);

  console.log(data);

  return (
    <Box
      id="map"
      onMouseOver={handleMouseOver}
      onMouseMove={handleMouseMove}
      onMouseOut={handleMouseOut}
    >
      <StyledSVGMap map={path} onLocationClick={handleLocationClick} />
      <Tooltip content={tooltipContent} position={tooltipPosition} />
    </Box>
  );
}
