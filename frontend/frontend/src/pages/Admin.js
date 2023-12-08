import React, { useState } from 'react';
import { useUserManagement } from '../hooks/useAdminControls';

const Admin = () => {
  const [email, setEmail] = useState('');
  const { enableUser, disableUser, grantAdmin, revokeAdmin, adminStatus, getDMCA, updateDMCA, isLoading, error } = useUserManagement(); // User management hooks
  const [adminStatusResult, setAdminStatusResult] = useState('');
  const [newDMCA, setNewDMCA] = useState(''); // State to store the new DMCA content
  const [dmcaContent, setDMCAContent] = useState('Click Button Above to See Latest DMCA Content'); // Provide your initial DMCA content here


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
    if (result) {
      setAdminStatusResult('User has admin privileges.');
    } else {
      setAdminStatusResult('User does not have admin privileges.');
    }
  };

  const handleGetDMCA = async () => {
    const content = await getDMCA();
    if (content) {
      // Set the DMCA content to the state variable
      setDMCAContent(content);
    }
  };


  const handleUpdateDMCA = async () => {
    try {
      await updateDMCA(newDMCA);
      // Handle success, e.g., display a success message or update UI
    } catch (error) {
      // Handle the error, e.g., display an error message
      console.error('Failed to update DMCA content', error);
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
      <div>
        <button onClick={handleAdminStatus} disabled={isLoading}>
          Check Admin Status
        </button>
        {adminStatusResult && <p>{adminStatusResult}</p>}
      </div>
      <div>
        <button onClick={handleGetDMCA} disabled={isLoading}>
          Get DMCA Content
        </button>
        {dmcaContent && <p>{dmcaContent}</p>}
      </div>

      <div>
        <input
          type="text"
          placeholder="Enter new DMCA content"
          value={newDMCA}
          onChange={(e) => setNewDMCA(e.target.value)}
        />
        <button onClick={handleUpdateDMCA} disabled={isLoading}>
          Update DMCA Content
        </button>
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default Admin;
