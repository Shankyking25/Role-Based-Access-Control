import React, { useState } from 'react';
import { Container, TextField, Button, Snackbar, Alert, Typography } from '@mui/material';
import API from '../utils/axios';

const CreateRole = () => {
  const [name, setName] = useState('');
  const [snack, setSnack] = useState({ open: false, msg: '', severity: 'success' });

  const handleSubmit = async () => {
    if (!name) return setSnack({ open: true, msg: 'Role name is required', severity: 'error' });

    try {
        console.log(name)
      const { data } = await API.post('/roles/create', { name });
      console.log(data)
      console.log(data.role.name)
      setSnack({ open: true, msg: `Role created: ${data.role.name}`, severity: 'success' });
      setName('');
    } catch (err) {
      setSnack({ open: true, msg: err.response?.data?.message || 'Failed to create role', severity: 'error' });
    }
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>Create a Role</Typography>
      <TextField
        label="Role Name"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Create Role
      </Button>
      <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack({ ...snack, open: false })}>
        <Alert severity={snack.severity}>{snack.msg}</Alert>
      </Snackbar>
    </Container>
  );
};

export default CreateRole;
