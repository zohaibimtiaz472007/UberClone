import React, { createContext, useState, useContext } from "react";

export const CaptainDataContext = createContext(null);

export const CaptainProvider = ({ children }) => {
  const [captain, setCaptain] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <CaptainDataContext.Provider
      value={{
        captain,
        setCaptain,
        loading,
        setLoading,
        error,
        setError,
      }}
    >
      {children}
    </CaptainDataContext.Provider>
  );
};

// safe hook
export const useCaptain = () => {
  const context = useContext(CaptainDataContext);
  if (!context) {
    throw new Error("CaptainProvider is missing in the tree");
  }
  return context;
};

export default CaptainProvider;
