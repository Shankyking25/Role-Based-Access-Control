import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Typography, Container } from '@mui/material';
import AdminActions from './AdminActions'; // path to the component

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const isAdmin = user?.role === 'Admin';
  console.log(user?.role)
  return (
    <Container>
  
{isAdmin && <AdminActions />}
    </Container>
  );
};

export default Dashboard;