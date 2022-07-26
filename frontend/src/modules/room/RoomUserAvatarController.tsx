import React from "react";
import { Menu } from "@headlessui/react";
import { Float } from "headlessui-float-react";
import {
  RoomUserAvatar,
  RoomUserAvatarProps,
} from "../../components/avatar/Avatar";
import { RoomUserAvatarPopupController } from "./RoomUserAvatarPopupController";

export const RoomUserAvatarController: React.FC<RoomUserAvatarProps> = ({
  profilePicture,
  username,
}) => {
  return (
    <Menu>
      <Float
        placement="right"
        offset={8}
        flip
        shift={6}
        portal
        enter="transition duration-200 ease-out"
        enterFrom="scale-95 opacity-0"
        enterTo="scale-100 opacity-100"
        leave="transition duration-150 ease-in"
        leaveFrom="scale-100 opacity-100"
        leaveTo="scale-95 opacity-0"
        tailwindcssOriginClass
      >
        <Menu.Button>
          <RoomUserAvatar username={username} profilePicture={profilePicture} />
        </Menu.Button>
        <Menu.Items className="mt-2">
          <RoomUserAvatarPopupController username={username} />
        </Menu.Items>
      </Float>
    </Menu>
  );
};
