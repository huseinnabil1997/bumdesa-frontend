import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { styled } from '@mui/material';
import PropTypes from 'prop-types';

const steps = [
  { label: 'Informasi BUM Desa' },
  { label: 'Data Pengurus BUM Desa' },
  { label: 'Informasi Unit Usaha' },
  { label: 'Data Manager Unit Usaha' },
];

const StyledStepper = styled(Stepper)(() => ({
  '.MuiStepIcon-root': {
    color: '#cccccc00 !important',
    border: '2px solid #fff',
    borderRadius: '50%',
    text: { fill: 'white' },
    opacity: 0.5,
  },
  '.MuiStepIcon-root.Mui-active': {
    opacity: 1,
  },
  '.MuiStepIcon-root.Mui-completed': {
    opacity: 1,
    color: '#fff !important',
    border: 'none',
  },
  '.MuiStepLabel-label ': { color: 'white !important', opacity: 0.7, fontWeight: 600 },
  '.Mui-active': { opacity: `1 !important`, fontWeight: 700 },
  '.Mui-completed': { opacity: `1 !important` },
  '.MuiStepConnector-line': { borderColor: 'white', height: 22, borderLeft: '1.5px solid white' },
  '.Mui-disabled .MuiStepConnector-line': { borderLeft: '1.5px dashed white', opacity: 0.7 },
}));

VerticalLinearStepper.propTypes = {
  activeStep: PropTypes.number,
};

export default function VerticalLinearStepper({ activeStep = 0 }) {
  return (
    <Box sx={{ maxWidth: 300, mx: 'auto', mt: 5 }}>
      <StyledStepper activeStep={activeStep} orientation="vertical">
        {steps.map((step) => (
          <Step key={step.label}>
            <StepLabel sx={{ '.MuiStepLabel-label': { color: 'white' } }}>{step.label}</StepLabel>
          </Step>
        ))}
      </StyledStepper>
    </Box>
  );
}
