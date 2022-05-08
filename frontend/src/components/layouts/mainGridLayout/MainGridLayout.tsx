import React from 'react';

/* 
  - The grid is a 3 column grid
  - The left and right column elements are display: fixed
*/

interface MainGridLayoutProps {
  children: React.ReactNode;
}

export const MainGridLayout: React.FC<MainGridLayoutProps> = ({ children }) => (
  <div className="px-16">
    <div
      className="grid gap-5"
      style={{ gridTemplateColumns: '235px 640px 325px', margin: '0 auto' }}
    >
      {children}
    </div>
  </div>
);
