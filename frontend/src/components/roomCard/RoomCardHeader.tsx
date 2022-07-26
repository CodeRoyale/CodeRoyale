import React from "react";

interface RoomCardHeaderProps {
  title: string;
  creatorUsername: string;
  creatorUsernameOnClick: () => void;
}

export const RoomCardHeader: React.FC<RoomCardHeaderProps> = ({
  title,
  creatorUsername,
  creatorUsernameOnClick,
}) => (
  <div className="flex flex-col border-b border-primary-600 py-4 px-3">
    <h1 className="text-lg text-primary-100 font-semibold">{title}</h1>
    <div className="text-xs mt-0.5">
      <span className="text-primary-300">
        By{" "}
        <span
          className="text-primary-100 cursor-pointer"
          onClick={creatorUsernameOnClick}
        >
          {creatorUsername}
        </span>
      </span>
    </div>
  </div>
);
