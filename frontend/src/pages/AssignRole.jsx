import React, { useState,  useEffect } from 'react';
import { Container, TextField, Button, Snackbar, Alert,  MenuItem,
    Select,
    InputLabel,FormControl,Typography } from '@mui/material';
import API from '../utils/axios';

import { useNavigate } from 'react-router-dom';



const AssignRole = () => {
//  const [form, setForm] = useState({ userId: '', role: '' });
  const [form, setForm] = useState({ email: '', role: '' });
  const [snack, setSnack] = useState({ open: false, msg: '', severity: 'success' });
  const [roles, setRoles] = useState([]); // Store roles from the backend

  const [users, setUsers] = useState([]);
  const navigate = useNavigate();


  // ✅ Check login status
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/'); // redirect to home if not logged in
    }
  }, [navigate]);

  // Fetch roles when the component mounts
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await API.get('/roles/allroles'); // Assuming this endpoint gives the roles
        setRoles(response.data.roles);
      } catch (error) {
        setSnack({ open: true, msg: 'Failed to fetch roles', severity: 'error' });
        console.log(error)
      }
    };

    fetchRoles();
  }, []);





  // Fetch users (emails)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await API.get('/users/allUser');
        setUsers(response.data.users); // assuming users have `_id` and `email`
      } catch (error) {
        setSnack({ open: true, msg: 'Failed to fetch users', severity: 'error' });
        console.log(error)
      }
    };
    fetchUsers();
  }, []);


const handleSubmit = async () => {
  const { email, role } = form;
  if (!email || !role) {
    return setSnack({ open: true, msg: 'All fields are required', severity: 'error' });
  }

  try {
    const { data } = await API.post('/roles/assign', { email, role });
    console.log("----- AssignRole.js------")
       console.log(data)
    setSnack({ open: true, msg: `Role assigned to user`, severity: 'success' });
    setForm({ email: '', role: '' });
  } catch (err) {
    setSnack({
      open: true,
      msg: err.response?.data?.message || 'Failed to assign role',
      severity: 'error',
    });
  }
};

  return (
    <Container>
      <Typography variant="h5" gutterBottom>Assign Role to User</Typography>
   

    
      {/* User Email Dropdown */}
      <FormControl fullWidth margin="normal">
        <InputLabel>User Email</InputLabel>
        <Select
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          label="User Email"
        >
          {users.map((user) => (
            <MenuItem key={user._id} value={user.email}>{user.email}</MenuItem>
          ))}
        </Select>
      </FormControl>


   
       {/* Role dropdown */}
       <FormControl fullWidth margin="normal">
        <InputLabel>Role</InputLabel>
        <Select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          label="Role"
        >
          {roles.map((role) => (
            <MenuItem key={role._id} value={role.name}>{role.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

 {/* Submit Button */}
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Assign Role
      </Button>

      {/* Snackbar for success/error */}
      <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack({ ...snack, open: false })}>
        <Alert severity={snack.severity}>{snack.msg}</Alert>
      </Snackbar>
    </Container>
  );
};

export default AssignRole;
