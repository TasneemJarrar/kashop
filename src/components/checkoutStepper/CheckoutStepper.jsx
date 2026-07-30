import { styled } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

const CheckoutConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 16,
    left: 'calc(-50% + 25px)',
    right: 'calc(50% + 25px)',
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.divider,
    borderTopWidth: 2,
  },
}));

const StepCircle = styled('div')(({ theme, ownerState }) => ({
  width: 32,
  height: 32,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 14,
  fontWeight: 600,
  backgroundColor: ownerState.active
    ? theme.palette.primary.main
    : theme.palette.mode === 'light'
      ? '#e4e3e7'
      : theme.palette.grey[800],
  color: ownerState.active
    ? theme.palette.primary.contrastText
    : theme.palette.text.secondary,
}));

function CustomStepIcon({ active, icon }) {
  return <StepCircle ownerState={{ active }}>{icon}</StepCircle>;
}

export default function CheckoutStepper({ activeStep, steps }) {
  return (
    <Stepper alternativeLabel activeStep={activeStep} 
      connector={<CheckoutConnector />} sx={{ mb: 5 }}>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel slots={{ stepIcon: CustomStepIcon }}
            sx={{
              '& .MuiStepLabel-label': {
                mt: 1,
                fontSize: 13,
                color: 'text.secondary',
                '&.Mui-active': { color: 'primary.main', fontWeight: 600 },
              },
            }}
          >
            {label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}