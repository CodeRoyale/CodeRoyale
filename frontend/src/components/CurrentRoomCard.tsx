import React from 'react';
import { Button } from './Button';
import { IconButton } from './IconButton';

interface CurrentRoomCardProps {
  title: string;
  creatorUsername: string;
  launchOnClick: () => void;
  leaveRoomOnClick: () => void;
}

export const CurrentRoomCard: React.FC<CurrentRoomCardProps> = ({
  title,
  creatorUsername,
  launchOnClick,
  leaveRoomOnClick,
}) => {
  return (
    <div className="flex flex-col border border-button-primary-default p-4 rounded-md">
      <span className="text-primary-100 text-xl break-words">{title}</span>
      <span className="text-primary-300 text-sm">by {creatorUsername}</span>
      <div className="flex items-center mt-4">
        <IconButton icon="launch" onClick={launchOnClick} />
        <div className="ml-2 w-full self-stretch">
          <Button
            buttonClass="primary"
            size="normal"
            stretch={true}
            onClick={leaveRoomOnClick}
          >
            Leave
          </Button>
        </div>
      </div>
    </div>
  );
};
