import React, { createContext, useState } from 'react';

export const CaptainDataContext = createContext();

export const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const value = {
    captain,
    setCaptain,
    isLoading,
    setIsLoading,
    error,
    setError,
  };

  return (
    <CaptainDataContext.Provider value={value}>
      {children}
    </CaptainDataContext.Provider>
  );
};

export const useCaptain = () => {
  const context = React.useContext(CaptainDataContext);
  if (!context) {
    throw new Error('useCaptain must be used within CaptainProvider');
  }
  return context;
};

export default CaptainContext;
