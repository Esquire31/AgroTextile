import { createContext, useContext, useState } from 'react';

const ErrorContext = createContext(null);

export function ErrorProvider({ children }) {
  const [isErrorPage, setIsErrorPage] = useState(false);
  return (
    <ErrorContext.Provider value={{ isErrorPage, setIsErrorPage }}>
      {children}
    </ErrorContext.Provider>
  );
}

export function useErrorPage() {
  return useContext(ErrorContext);
}