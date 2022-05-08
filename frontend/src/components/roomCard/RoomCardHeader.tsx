import React from 'react';

interface RoomCardHeaderProps {
  title: string;
  adminUserName: string;
}

export const RoomCardHeader: React.FC<RoomCardHeaderProps> = ({
  title,
  adminUserName,
}) => (
  <div className="flex flex-col border-b border-primary-600 py-4 px-3">
    <h1 className="text-lg text-primary-100 font-semibold">{title}</h1>
    <div className="text-xs mt-0.5">
      <span className="text-primary-300">
        By <span className="text-primary-100">{adminUserName}</span>
      </span>
    </div>
  </div>
);
