import React from 'react';

export const AvatarDropdownMenu: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className="rounded-lg">{children}</div>;
};
