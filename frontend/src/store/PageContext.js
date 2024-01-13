import React, { useState, useContext } from "react";
const PageContext = React.createContext();
const UserData = React.createContext();

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

export const useUserData = () => {
  return useContext(UserData);
};

export const UserDataProvider = ({ children }) => {
  const [userId, setUserId] = useState("abcd");

  return (
    <UserData.Provider
      value={{ userId, setUserId}}
    >
      {children}
    </UserData.Provider>
  );
};
