import React, { HTMLAttributes } from "react";

type VetoUserCardProps = HTMLAttributes<HTMLDivElement> & {
  profilePicture: string;
  name: string;
  teamName: string;
};

export const VetoUserCard: React.FC<VetoUserCardProps> = ({
  profilePicture,
  name,
  teamName,
  ...rest
}) => (
  <div
    className="flex items-center cursor-pointer -ml-3 px-3 py-3 transition duration-200 ease-in-out hover:bg-primary-800 focus:outline focus:outline-offset-2 focus:outline-focus-outline rounded-md"
    tabIndex={1}
    {...rest}
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
      <span className="text-primary-300 text-sm">{teamName}</span>
    </div>
  </div>
);
