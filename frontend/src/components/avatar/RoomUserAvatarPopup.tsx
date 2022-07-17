import React from 'react';

export const RoomUserAvatarPopup: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return <div className="rounded-lg shadow-2xl">{children}</div>;
};
