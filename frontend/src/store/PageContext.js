import React, { useState, useContext } from "react";
const PageContext = React.createContext();
const PatientData = React.createContext();

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

export const usePatientData = () => {
  return useContext(PatientData);
};

export const PatientDataProvider = ({ children }) => {
  const [patientId, setPatientId] = useState("abcd");

  return (
    <PatientData.Provider value={{ patientId, setPatientId }}>
      {children}
    </PatientData.Provider>
  );
};
