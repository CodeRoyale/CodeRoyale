import React from "react";
import { Button } from "./Button";

interface RoomInviteCardProps {
  profilePicture: string;
  name: string;
  username: string;
  marginTop?: string | null;
  acceptBtnOnClick: () => void;
  declineBtnOnClick: () => void;
  nameOrUsernamebtnOnClick: () => void;
}

export const RoomInviteCard: React.FC<RoomInviteCardProps> = ({
  profilePicture,
  name,
  username,
  marginTop = null,
  acceptBtnOnClick,
  declineBtnOnClick,
  nameOrUsernamebtnOnClick,
}) => (
  <div className={`bg-primary-800 rounded-md p-6 ${marginTop}`}>
    <div className="flex justify-start">
      <img
        className="rounded-full w-12 h-12"
        alt={username}
        src={profilePicture}
      />

      <div className="ml-4">
        <span
          className="text-primary-100 font-medium text-lg cursor-pointer"
          onClick={nameOrUsernamebtnOnClick}
        >
          {name}
        </span>

        <p className="text-primary-300 text-xs mt-0.5">
          <span
            className="cursor-pointer"
            onClick={nameOrUsernamebtnOnClick}
          >{`@${username}`}</span>{" "}
          invited you to a match
        </p>

        <div className="flex justify-between mt-3">
          <Button
            buttonClass="secondary"
            size="normal"
            onClick={acceptBtnOnClick}
          >
            Accept
          </Button>

          <Button
            buttonClass="transparent"
            size="normal"
            onClick={declineBtnOnClick}
          >
            Decline
          </Button>
        </div>
      </div>
    </div>
  </div>
);
