import React from 'react';
import { Container, Typography } from '@mui/material';

const Unauthorized = () => {
  return (
    <Container>
      <Typography variant="h4" color="error">Unauthorized Access</Typography>
    </Container>
  );
};

export default Unauthorized;
