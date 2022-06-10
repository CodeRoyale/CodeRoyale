import React, { HTMLAttributes } from 'react';

type PeopleCardProps = HTMLAttributes<HTMLDivElement> & {
  profilePicture: string;
  name: string;
  matchStatus?: boolean;
  online: boolean;
};

export const PeopleCard: React.FC<PeopleCardProps> = ({
  profilePicture,
  name,
  matchStatus = false,
  online,
  ...props
}) => (
  <div
    className="flex items-center cursor-pointer -ml-3 px-3 py-3 transition duration-200 ease-in-out hover:bg-primary-800 focus:outline focus:outline-offset-2 focus:outline-focus-outline rounded-md"
    tabIndex={1}
    {...props}
  >
    <img
      className="rounded-full"
      alt={name}
      src={profilePicture}
      width={45}
      height={45}
    />
    <div className="flex flex-col ml-4 justify-center">
      <span className="text-primary-100 text-base font-medium">{name}</span>
      {online ? null : matchStatus ? (
        <span className="text-primary-300 text-sm">In a Match</span>
      ) : (
        <span className="text-primary-300 text-sm">Available</span>
      )}
    </div>
  </div>
);
