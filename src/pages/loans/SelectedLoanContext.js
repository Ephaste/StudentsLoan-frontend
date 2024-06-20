import React, { createContext, useState } from 'react';

const SelectedLoanContext = createContext();

export const SelectedLoanProvider = ({ children }) => {
  const [selectedLoan, setSelectedLoan] = useState(null);

  return (
    <SelectedLoanContext.Provider value={{ selectedLoan, setSelectedLoan }}>
      {children}
    </SelectedLoanContext.Provider>
  );
};

export default SelectedLoanContext;
