import React, { useState } from 'react';
import { useUserManagement } from '../hooks/useAdminControls';

const ContentPage = () => {
  const { getDMCA, getPrivacy, getAUP, isLoading, error } = useUserManagement();
  const [dmcaContent, setDMCAContent] = useState('Click Button Above to See Latest DMCA Content');
  const [privacyContent, setPrivacyContent] = useState('Click Button Above to See Latest Privacy Content');
  const [aupContent, setAUPContent] = useState('Click Button Above to See Latest AUP Content');

  const handleGetDMCA = async () => {
    const content = await getDMCA();
    if (content) {
      setDMCAContent(content);
    }
  };

  const handleGetPrivacy = async () => {
    const content = await getPrivacy();
    if (content) {
      setPrivacyContent(content);
    }
  };

  const handleGetAUP = async () => {
    const content = await getAUP();
    if (content) {
      setAUPContent(content);
    }
  };

  return (
    <div>
      <h2>Content Page</h2>
      <div>
        <button onClick={handleGetDMCA} disabled={isLoading}>
          Get DMCA Content
        </button>
        {dmcaContent && <p>{dmcaContent}</p>}
      </div>
      <div>
        <button onClick={handleGetPrivacy} disabled={isLoading}>
          Get Privacy Content
        </button>
        {privacyContent && <p>{privacyContent}</p>}
      </div>
      <div>
        <button onClick={handleGetAUP} disabled={isLoading}>
          Get AUP Content
        </button>
        {aupContent && <p>{aupContent}</p>}
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default ContentPage;
