import React from 'react';
import { Menu } from '@headlessui/react';
import { Float } from 'headlessui-float-react';
import { AvatarDropdownMenu } from '../avatarDropdownMenu/AvatarDropdownMenu';
import { UserAvatar } from './Avatar';

export const UserAvatarController = () => {
  return (
    <Menu>
      <Float
        placement="bottom-end"
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
          <UserAvatar
            aria-hidden="true"
            avatarImage="https://lh3.googleusercontent.com/a-/AOh14Ghc_V15s5eZUxP0PsKFcNnTX1On7c1UQ4BwSGGW=s96-c"
          />
        </Menu.Button>
        <Menu.Items className="mt-2">
          <AvatarDropdownMenu />
        </Menu.Items>
      </Float>
    </Menu>
  );
};
