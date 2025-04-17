import React, { useContext, useEffect  } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Container, Typography, Paper } from '@mui/material';

import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  console.log(user)

  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!user || user.role === 'Admin') {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user) return null;


  if (!user) {
    return (
      <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
        <Paper elevation={3} style={{ padding: '2rem' }}>
          <Typography variant="h6" color="error">Please login to view your profile.</Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      <Paper elevation={3} style={{ padding: '2rem' }}>
        <Typography variant="h5" gutterBottom>User Profile</Typography>
        <Typography variant="body1"><strong>Name:</strong> {user.name}</Typography>
        <Typography variant="body1"><strong>Email:</strong> {user.email}</Typography>
        <Typography variant="body1"><strong>Role:</strong> {user.role}</Typography>
      </Paper>
    </Container>
  );
};

export default UserProfile;
