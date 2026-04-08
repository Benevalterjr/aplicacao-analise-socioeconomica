import { createContext, useContext, ReactNode } from 'react';

const TooltipContext = createContext({});

export const TooltipProvider = ({ children }: { children: ReactNode }) => (
  <TooltipContext.Provider value={{}}>{children}</TooltipContext.Provider>
);
