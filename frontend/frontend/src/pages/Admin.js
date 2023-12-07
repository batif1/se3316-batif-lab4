import React, { useState } from 'react';
import { useUserManagement } from '../hooks/useAdminControls'

const Admin = () => {
  const [email, setEmail] = useState('');
  const { enableUser, disableUser, isLoading, error } = useUserManagement();

  const handleEnableUser = () => {
    enableUser(email);
  };

  const handleDisableUser = () => {
    disableUser(email);
  };

  return (
    <div>
      <h2>User Management</h2>
      <div>
        <input
          type="text"
          placeholder="Enter user email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleEnableUser} disabled={isLoading}>
          Enable User
        </button>
        <button onClick={handleDisableUser} disabled={isLoading}>
          Disable User
        </button>
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default Admin;
