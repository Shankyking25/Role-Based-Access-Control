import React from 'react';
import { Typography, Box } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" textAlign="center" py={2} bgcolor="#f5f5f5">
      <Typography variant="body2">&copy; 2025 Role Based App. All rights reserved.</Typography>
    </Box>
  );
};

export default Footer;