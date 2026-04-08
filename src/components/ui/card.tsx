import React from 'react';
export const Button = ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button {...props} className="px-4 py-2 bg-blue-500 text-white rounded">{children}</button>
);
export const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-4 border rounded shadow ${className}`}>{children}</div>
);
export const CardHeader = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => <div className={`font-bold mb-2 ${className}`}>{children}</div>;
export const CardTitle = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => <h3 className={`text-lg ${className}`}>{children}</h3>;
export const CardDescription = ({ children }: { children: React.ReactNode }) => <p className="text-sm text-gray-500">{children}</p>;
export const CardContent = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => <div className={className}>{children}</div>;
