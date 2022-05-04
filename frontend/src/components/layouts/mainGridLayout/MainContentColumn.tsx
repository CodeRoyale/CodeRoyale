import React from 'react';

interface MainContentColumnProps {
  children: React.ReactNode;
}

const MainContentColumn: React.FC<MainContentColumnProps> = ({ children }) => (
  <div className="h-screen" style={{ width: '640px' }}>
    {children}
  </div>
);

export default MainContentColumn;
