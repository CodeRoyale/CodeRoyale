import React from 'react';
import { useRouter } from 'next/router';
import { Menu } from '@headlessui/react';
import { Float } from 'headlessui-float-react';
import { useMeQuery } from '../../generated/graphql';
import { Button } from '../Button';
import { AvatarDropdownMenuController } from '../avatarDropdownMenu/AvatarDropdownMenuController';
import { UserAvatar } from './Avatar';

export const UserAvatarController = () => {
  const router = useRouter();
  const { data, loading } = useMeQuery();

  if (loading) {
  }
  // user is logged in
  else if (data?.me) {
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
              avatarImage={data.me.profilePicture}
            />
          </Menu.Button>
          <Menu.Items className="mt-2">
            <AvatarDropdownMenuController />
          </Menu.Items>
        </Float>
      </Menu>
    );
  }

  return (
    <Button
      buttonClass="primary"
      size="normal"
      onClick={() => router.push('/')}
    >
      Login / Register
    </Button>
  );
};
