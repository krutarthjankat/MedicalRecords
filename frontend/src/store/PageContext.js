import React, { useState, useContext } from "react";
const PageContext = React.createContext();

export const usePageContext = () => {
  return useContext(PageContext);
};

export const PageContextProvider = ({ children }) => {
  const [dimLogin, setDimLogin] = useState({ height: 558, width: 318 });
  const [dimSignUp, setDimSignUp] = useState({ height: 598, width: 428 });

  return (
    <PageContext.Provider
      value={{ dimLogin, setDimLogin, dimSignUp, setDimSignUp }}
    >
      {children}
    </PageContext.Provider>
  );
};
