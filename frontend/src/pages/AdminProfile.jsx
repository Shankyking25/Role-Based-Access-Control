import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Paper } from '@mui/material';

const AdminProfile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();



useEffect(() => {
  if (!user || user.role !== 'Admin') {
    navigate('/'); // Redirect to home if not admin
  }
}, [user, navigate]);


  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Admin Profile
        </Typography>
        <Typography variant="body1"><strong>Name:</strong> {user?.name}</Typography>
        <Typography variant="body1"><strong>Email:</strong> {user?.email}</Typography>
        <Typography variant="body1"><strong>Role:</strong> {user?.role}</Typography>
      </Paper>
    </Container>
  );
};

export default AdminProfile;
