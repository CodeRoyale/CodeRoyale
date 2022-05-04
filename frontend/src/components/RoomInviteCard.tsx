import React from 'react';
import Button from './Button';

interface RoomInviteCardProps {
  avatarUrl: string;
  fullName: string;
  userName: string;
  marginTop?: string | null;
}

const RoomInviteCard: React.FC<RoomInviteCardProps> = ({
  avatarUrl,
  fullName,
  userName,
  marginTop = null,
}) => (
  <div className={`bg-primary-800 rounded-md p-6 ${marginTop}`}>
    <div className="flex justify-start">
      <img className="rounded-full w-12 h-12" alt={userName} src={avatarUrl} />

      <div className="ml-4">
        <span className="text-primary-100 font-medium text-lg">{fullName}</span>

        <p className="text-primary-300 text-xs mt-0.5">{`@${userName} invited you to a match`}</p>

        <div className="flex justify-between mt-3">
          <Button buttonClass="secondary" size="normal">
            Accept
          </Button>

          <Button buttonClass="transparent" size="normal">
            Decline
          </Button>
        </div>
      </div>
    </div>
  </div>
);

export default RoomInviteCard;
