import React, { useContext} from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();


  const isAdmin = user?.role === 'Admin'; // Adjust according to how your user object is structured
    
  const isUser = user && !isAdmin;
  
  console.log(isUser)
  console.log(user)
  console.log("----Header.js---")
  console.log(isAdmin)

  

const handleLogout = () => {
  logout();         // clears context + storage
 localStorage.removeItem('token'); // Clear token from localStorage
   navigate('/'); // Redirect to login page
};
  return (
    <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" style={{ flexGrow: 1 }}>
        Role Based App
      </Typography>

      {user ? (
        <>
          {isAdmin && (
            <>
             <Typography variant="body1" style={{ marginRight: 16 }}>
                Welcome, {user.name}
              </Typography>
            <Button
  variant="contained"
  color="primary"
  component={Link}
  to="/create-role"
  sx={{ mr: 2 }} // adds right margin for spacing
>
  Create Role
</Button>

<Button
  variant="contained"
  color="secondary"
  component={Link}
  to="/assign-role"
>
  Assign Role
</Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout Admin
              </Button>
            </>
          )}

          {isUser && (
            <>
              <Typography variant="body1" style={{ marginRight: 16 }}>
                Welcome, {user.name}
              </Typography>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </>
      ) : (
        <>
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
          <Button color="inherit" component={Link} to="/register">
            Register
          </Button>
        </>
      )}
    </Toolbar>
  </AppBar>  );
};

export default Header;
