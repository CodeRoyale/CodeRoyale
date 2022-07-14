import React from 'react';

interface MainContentColumnProps {
  isFixed?: boolean;
  children: React.ReactNode;
}

export const MainContentColumn: React.FC<MainContentColumnProps> = ({
  isFixed = false,
  children,
}) => {
  if (isFixed) {
    return (
      <div>
        <div className="fixed h-screen" style={{ width: '640px' }}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen" style={{ width: '640px' }}>
      {children}
    </div>
  );
};
