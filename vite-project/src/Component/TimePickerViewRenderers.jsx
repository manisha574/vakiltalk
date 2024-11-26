import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import dayjs from 'dayjs';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiPopper: {
      styleOverrides: {
        root: {
          top: '50% !important',       // Vertically center
          left: '50% !important',      // Horizontally center
          transform: 'translate(-50%, -50%) !important', // Ensure proper centering
          zIndex: '1300 !important',   // Ensure it stays on top
        },
      },
    },
  },
});

export default function TimePickerViewRenderers({ selectedTime, onTimeChange }) {
  const [localSelectedTime, setLocalSelectedTime] = React.useState(selectedTime || dayjs());

  const handleTimeChange = (newTime) => {
    setLocalSelectedTime(newTime);
    if (onTimeChange) {
      onTimeChange(newTime);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <DemoContainer components={['TimePicker']}>
          <TimePicker
            label="With Time Clock"
            value={selectedTime || localSelectedTime}
            onChange={handleTimeChange}
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
              seconds: renderTimeViewClock,
            }}
          />
        </DemoContainer>
      </ThemeProvider>
    </LocalizationProvider>
  );
}
