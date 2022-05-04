import React from 'react';

interface RightColumnProps {
  children: React.ReactNode;
}

const RightColumn: React.FC<RightColumnProps> = ({ children }) => (
  <div>
    <div className="fixed h-full" style={{ width: '325px' }}>
      {children}
    </div>
  </div>
);

export default RightColumn;
