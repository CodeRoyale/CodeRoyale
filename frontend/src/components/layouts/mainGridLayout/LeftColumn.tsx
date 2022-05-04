import React from 'react';

interface LeftColumnProps {
  children: React.ReactNode;
}

const LeftColumn: React.FC<LeftColumnProps> = ({ children }) => (
  <div>
    <div className="fixed h-full" style={{ width: '235px' }}>
      {children}
    </div>
  </div>
);

export default LeftColumn;
