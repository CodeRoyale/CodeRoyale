import React from 'react';

interface RightColumnProps {
  children: React.ReactNode;
}

export const RightColumn: React.FC<RightColumnProps> = ({ children }) => (
  <div>
    <div className="sticky h-full overflow-hidden" style={{ width: '325px' }}>
      {children}
    </div>
  </div>
);
