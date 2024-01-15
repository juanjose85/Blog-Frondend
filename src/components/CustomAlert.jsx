import * as React from 'react';
import Alert from '@mui/material/Alert';
import { Box, Collapse } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const CustomAlert = ({ open, type, message, onClose }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={open}>
        <Alert
          severity={type}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={onClose}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {message}
        </Alert>
      </Collapse>
    </Box>
  );
}

export default CustomAlert;