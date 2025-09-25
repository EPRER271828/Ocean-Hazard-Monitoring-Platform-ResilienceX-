import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import SearchBar from './SearchBar';
import AuthButtons from '../auth/AuthButtons';

const Navigation = () => {
  const { user, role } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>🌊 OceanSafe</h2>
      </div>
      
      <SearchBar />
      
      <AuthButtons user={user} role={role} />
    </nav>
  );
};

export default Navigation;