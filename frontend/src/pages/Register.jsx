import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Snackbar, Alert } from '@mui/material';
import { registerUser } from '../api/authApi'; // ✅ import the function
import { useNavigate } from 'react-router-dom';



const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [snack, setSnack] = useState({ open: false, msg: '', severity: 'success' });

// Inside your component
const navigate = useNavigate();

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePassword = (password) => /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/.test(password);

  const handleSubmit = async () => {
    const { name, email, password } = form;
    console.log("--- Register.js ----")
    console.log(name ,email, password )

    if (!name || !email || !password) {
      return setSnack({ open: true, msg: 'All fields are required', severity: 'error' });
    }
    if (!validateEmail(email)) {
      return setSnack({ open: true, msg: 'Invalid email format', severity: 'error' });
    }
    if (!validatePassword(password)) {
      return setSnack({ open: true, msg: 'Password must have 1 number, 1 special char, 6+ chars', severity: 'error' });
    }

    try {
      const data = await registerUser(form); // ✅ call the API
      
      console.log(data)

      setSnack({ open: true, msg: data.message || 'Registration successful!', severity: 'success' });
      setForm({ name: '', email: '', password: '' }); // clear form after success


    // ✅ Navigate to login after short delay
    setTimeout(() => {
      navigate('/login');
    }, 1000); // optional delay to show the success message

    } catch (error) {
      const msg = error.response?.data?.message || 'Registration failed';
      setSnack({ open: true, msg, severity: 'error' });
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Register</Typography>
      <TextField label="Name" fullWidth margin="normal" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <TextField label="Email" fullWidth margin="normal" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <TextField label="Password" type="password" fullWidth margin="normal" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <Button variant="contained" onClick={handleSubmit}>Register</Button>
      <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack({ ...snack, open: false })}>
        <Alert severity={snack.severity}>{snack.msg}</Alert>
      </Snackbar>
    </Container>
  );
};

export default Register;
