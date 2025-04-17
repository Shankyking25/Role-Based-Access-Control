import React, { useState, useContext } from 'react';
import { TextField, Button, Container, Typography, Snackbar, Alert } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import API from '../utils/axios'; 


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [snack, setSnack] = useState({ open: false, msg: '', severity: 'success' });


  const handleSubmit = async () => {
    if (!email || !password) {
      return setSnack({ open: true, msg: 'All fields are required', severity: 'error' });
    }
  
    try {
      const res = await API.post('/auth/login', { email, password });
      const { token, user } = res.data;
  
      login(token, user); // store token + user in context/localStorage
      setSnack({ open: true, msg: 'Login successful', severity: 'success' });
  
      const userRole = user?.role;
      console.log("--------------");
      console.log("User Role:", userRole);
  
      if (userRole?.toLowerCase() === 'admin') {
        navigate('/admin-profile');
      } else {
        navigate('/profile');
      }
  
    } catch (err) {
      console.error(err);
      setSnack({
        open: true,
        msg: err.response?.data?.message || 'Login failed',
        severity: 'error',
      });
    }
  };
  


  return (<>
    <Container>
      <Typography variant="h4" gutterBottom>Login</Typography>
      <TextField label="Email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button variant="contained" onClick={handleSubmit}>Login</Button>
      <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack({ ...snack, open: false })}>
        <Alert severity={snack.severity}>{snack.msg}</Alert>
      </Snackbar>
    </Container>
  
</>);
};

export default Login;
