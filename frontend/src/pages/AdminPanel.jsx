
import React, { useState, } from 'react';
import {
  Typography,
  TextField,
  Button,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import API from '../utils/axios'; 


const AdminPanel = () => {
  const [newRole, setNewRole] = useState('');
  const [roles, setRoles] = useState([]);
  const [users] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  const handleCreateRole = async () => {
    if (!newRole) return;
  
    try {
      await API.post('/admin/roles', { roleName: newRole });
      setRoles(prev => [...prev, newRole]);
      setNewRole('');
      alert('Role created!');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to create role');
    }
  };
  
  const handleAssignRole = async () => {
    try {
      await API.post('/admin/assign-role', {
        userId: selectedUser,
        role: selectedRole,
      });
      alert('Role assigned successfully!');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to assign role');
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4">Admin Panel</Typography>

      <Box mt={4}>
        <Typography variant="h6">Create New Role</Typography>
        <TextField
          label="Role Name"
          value={newRole}
          onChange={e => setNewRole(e.target.value)}
        />
        <Button variant="contained" onClick={handleCreateRole} sx={{ ml: 2 }}>
          Create
        </Button>
      </Box>

      <Box mt={6}>
        <Typography variant="h6">Assign Role to User</Typography>

        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>User</InputLabel>
          <Select
            value={selectedUser}
            onChange={e => setSelectedUser(e.target.value)}
            label="User"
          >
            {users.map(user => (
              <MenuItem key={user.id} value={user.id}>
                {user.name} ({user.email})
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Role</InputLabel>
          <Select
            value={selectedRole}
            onChange={e => setSelectedRole(e.target.value)}
            label="Role"
          >
            {roles.map(role => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          onClick={handleAssignRole}
          sx={{ mt: 3 }}
        >
          Assign Role
        </Button>
      </Box>
    </Box>
  );
};

export default AdminPanel;
