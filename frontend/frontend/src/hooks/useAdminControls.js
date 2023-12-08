import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useUserManagement = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const enableUser = async (email) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/user/admin/enable', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const json = await response.json();
        setError(json.error);
      } else {
        // User enabled successfully
        setIsLoading(false);
      }
    } catch (error) {
      setError('An error occurred while enabling the user.');
    }
  };

  const disableUser = async (email) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/user/admin/disable', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const json = await response.json();
        setError(json.error);
      } else {
        // User disabled successfully
        setIsLoading(false);
      }
    } catch (error) {
      setError('An error occurred while disabling the user.');
    }
  };

  const grantAdmin = async (email) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/user/admin/grant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const json = await response.json();
        setError(json.error);
      } else {
        // User disabled successfully
        setIsLoading(false);
      }
    } catch (error) {
      setError('An error occurred while disabling the user.');
    }
  };

  const revokeAdmin = async (email) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/user/admin/revoke', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const json = await response.json();
        setError(json.error);
      } else {
        // User disabled successfully
        setIsLoading(false);
      }
    } catch (error) {
      setError('An error occurred while disabling the user.');
    }
  }

  const adminStatus = async (email) => {
    console.log('adminStatus HOOK');
    console.log(email);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/user/admin/status?email=${(email)}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        // Handle non-ok response here, e.g., by setting an error state
        setIsLoading(false);
        setError('Failed to fetch admin status');
        return null; // Return null or handle the error as appropriate
      }

      const json = await response.json();
      console.log(json);
      setIsLoading(false);
      return json;
    } catch (error) {
      // Handle any unexpected errors here
      console.error(error);
      setIsLoading(false);
      setError('An error occurred while fetching admin status');
      return null; // Return null or handle the error as appropriate
    }
  };



  const updateDMCA = async (newDMCA) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/privacy/DMCA', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ DMCA: newDMCA }),
      });

      if (!response.ok) {
        const json = await response.json();
        setError(json.error);
      } else {
        // DMCA content updated successfully
        setIsLoading(false);
      }
    } catch (error) {
      setError('An error occurred while updating DMCA content.');
    }
  };

  const getDMCA = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/privacy/DMCA', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        // Handle non-ok response here, e.g., by setting an error state
        setIsLoading(false);
        setError('Failed to fetch DMCA content');
        return null; // Return null or handle the error as appropriate
      }

      const content = await response.json();
      setIsLoading(false);
      return content;
    } catch (error) {
      // Handle any unexpected errors here
      console.error(error);
      setIsLoading(false);
      setError('An error occurred while fetching DMCA content');
      return null; // Return null or handle the error as appropriate
    }
  };

  return { enableUser, disableUser,adminStatus,revokeAdmin,grantAdmin,getDMCA,updateDMCA, isLoading, error };
};
