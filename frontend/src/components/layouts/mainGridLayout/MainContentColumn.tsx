import React from 'react';

interface MainContentColumnProps {
  children: React.ReactNode;
}

export const MainContentColumn: React.FC<MainContentColumnProps> = ({
  children,
}) => (
  <div className="h-screen" style={{ width: '640px' }}>
    {children}
  </div>
);
