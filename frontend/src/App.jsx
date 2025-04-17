
import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Unauthorized from './pages/Unauthorized';
import Layout from './components/Layout';
import Home from './pages/Home';
import CreateRole from './pages/CreateRole';
import AssignRole from './pages/AssignRole';
import UserProfile from './pages/UserProfile';
import AdminProfile from './pages/AdminProfile';


export default function App() {

  return ( <>
    <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
  <Route path="/create-role" element={<CreateRole />} />
  <Route path="/assign-role" element={<AssignRole />} />

  <Route path="/profile" element={<UserProfile />} />
  
<Route path="/admin-profile" element={<AdminProfile />} />

  
      <Route path="unauthorized" element={<Unauthorized />} />
    </Route>
  </Routes>
    </> );
}


