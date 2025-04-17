import React, { useState } from 'react';
import {
  Button, Dialog, DialogTitle, DialogContent, TextField,
  DialogActions, Snackbar, Alert, Box
} from '@mui/material';
import API from '../utils/axios';

const AdminActions = () => {
  const [createOpen, setCreateOpen] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);
  const [roleName, setRoleName] = useState('');
  const [assignData, setAssignData] = useState({ userId: '', role: '' });
  const [snack, setSnack] = useState({ open: false, msg: '', severity: 'success' });

  const handleCreateRole = async () => {
    try {
      const res = await API.post('/roles/create', { name: roleName });
      setSnack({ open: true, msg: `Role "${res.data.name}" created`, severity: 'success' });
      setCreateOpen(false);
      setRoleName('');
    } catch (err) {
      setSnack({
        open: true,
        msg: err.response?.data?.message || 'Failed to create role',
        severity: 'error',
      });
    }
  };

  const handleAssignRole = async () => {
    try {
      const res = await API.post('/roles/assign', assignData);
      console.log(res)
      setSnack({ open: true, msg: `Role assigned successfully`, severity: 'success' });
      setAssignOpen(false);
      setAssignData({ userId: '', role: '' });
    } catch (err) {
      setSnack({
        open: true,
        msg: err.response?.data?.message || 'Failed to assign role',
        severity: 'error',
      });
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Button variant="contained" onClick={() => setCreateOpen(true)} sx={{ mr: 2 }}>
        Create Role
      </Button>
      <Button variant="contained" color="secondary" onClick={() => setAssignOpen(true)}>
        Assign Role
      </Button>

      {/* Create Role Dialog */}
      <Dialog open={createOpen} onClose={() => setCreateOpen(false)}>
        <DialogTitle>Create New Role</DialogTitle>
        <DialogContent>
          <TextField
            label="Role Name"
            fullWidth
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateOpen(false)}>Cancel</Button>
          <Button onClick={handleCreateRole} variant="contained">Create</Button>
        </DialogActions>
      </Dialog>

      {/* Assign Role Dialog */}
      <Dialog open={assignOpen} onClose={() => setAssignOpen(false)}>
        <DialogTitle>Assign Role to User</DialogTitle>
        <DialogContent>
          <TextField
            label="User ID"
            fullWidth
            value={assignData.userId}
            onChange={(e) => setAssignData({ ...assignData, userId: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Role Name"
            fullWidth
            value={assignData.role}
            onChange={(e) => setAssignData({ ...assignData, role: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAssignOpen(false)}>Cancel</Button>
          <Button onClick={handleAssignRole} variant="contained">Assign</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack({ ...snack, open: false })}>
        <Alert severity={snack.severity}>{snack.msg}</Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminActions;
