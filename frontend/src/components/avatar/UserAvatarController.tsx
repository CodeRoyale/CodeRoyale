import React from 'react';
import { useRouter } from 'next/router';
import { Menu } from '@headlessui/react';
import { Float } from 'headlessui-float-react';
import { useMeQuery } from '../../generated/graphql';
import { Button } from '../Button';
import { AvatarDropdownMenuController } from '../avatarDropdownMenu/AvatarDropdownMenuController';
import { UserAvatar } from './Avatar';

export const UserAvatarController: React.FC<{}> = () => {
  const router = useRouter();
  const { data, loading } = useMeQuery();

  let body = null;

  if (loading) {
  } else if (!data?.me) {
    body = (
      <Button
        buttonClass="primary"
        size="normal"
        onClick={() => router.push('/')}
      >
        Login / Register
      </Button>
    );
  }
  // user is logged in
  else {
    body = (
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
              profilePicture={data.me.profilePicture}
              width={45}
              height={45}
            />
          </Menu.Button>
          <Menu.Items className="mt-2">
            <AvatarDropdownMenuController />
          </Menu.Items>
        </Float>
      </Menu>
    );
  }

  return <>{body}</>;
};
