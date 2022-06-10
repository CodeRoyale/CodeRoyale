import React from 'react';

export const PeopleCardMenu: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className="rounded-lg shadow-2xl">{children}</div>;
};
