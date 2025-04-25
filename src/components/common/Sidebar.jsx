import React, { useContext } from 'react'

import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../backend/context/Auth';

const Sidebar = () => {
  const { logout } = useContext(AuthContext)
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  }

  return (
    <div className="card shadow border-0">
      <div className="card-bod p-4 sidebar">
        <h4>Sidebar</h4>
        <ul>
          <li><a href="#">Dashboard</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Projects</a></li>
          <li><a href="#">Articles</a></li>
          <li>
            <button className='btn btn-primary mt-4' onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
