import { createContext, useContext, ReactNode } from 'react';

const ToastContext = createContext({});

export const Toaster = () => <div id="toast-container" />;
