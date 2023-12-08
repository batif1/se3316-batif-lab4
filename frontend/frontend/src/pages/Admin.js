import React, { useState } from 'react';
import { useUserManagement } from '../hooks/useAdminControls'


const Admin = () => {
  const [email, setEmail] = useState('');
  const { enableUser, disableUser,grantAdmin, revokeAdmin, adminStatus,  isLoading, error } = useUserManagement(); // User management hooks
  const [adminStatusResult, setAdminStatusResult] = useState('');

  const handleEnableUser = () => {
    enableUser(email);
  };

  const handleDisableUser = () => {
    disableUser(email);
  };

  const handleGrantAdmin = async () => {
    await grantAdmin(email);
    // Handle success or error, e.g., display a message or update UI
  };

  const handleRevokeAdmin = async () => {
    await revokeAdmin(email);
    // Handle success or error, e.g., display a message or update UI
  };

  const handleAdminStatus = async () => {
    const result = await adminStatus(email);
    console.log(result)
    console.log(email)
    if (result) {
      setAdminStatusResult('User has admin privileges.');
    } else {
      setAdminStatusResult('User does not have admin privileges.');
    }
  };

  return (
    <div>
      <h2>User and Admin Management</h2>
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
      <div>
        <button onClick={handleGrantAdmin} disabled={isLoading}>
          Grant Admin
        </button>
        <button onClick={handleRevokeAdmin} disabled={isLoading}>
          Revoke Admin
        </button>

      </div>
      {adminStatusResult && <p>{adminStatusResult}</p>}
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default Admin;