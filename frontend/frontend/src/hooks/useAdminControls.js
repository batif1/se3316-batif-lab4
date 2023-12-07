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

  return { enableUser, disableUser, isLoading, error };
};
