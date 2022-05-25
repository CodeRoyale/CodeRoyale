import React from 'react';
import { LeftHeaderController } from '../../components/header/LeftHeaderController';
import { MiddleHeader } from '../../components/header/MiddleHeader';
import { RightHeader } from '../../components/header/RightHeader';
import { LeftColumn } from '../../components/layouts/mainGridLayout/LeftColumn';
import { MainContentColumn } from '../../components/layouts/mainGridLayout/MainContentColumn';
import { MainGridLayout } from '../../components/layouts/mainGridLayout/MainGridLayout';
import { RightColumn } from '../../components/layouts/mainGridLayout/RightColumn';
import { PeopleFollowingController } from '../PeopleFollowingController';
import { RoomInvitesController } from '../RoomInvitesController';
import { ProfileBannerController } from './ProfileBannerController';
import { ProfileTabsController } from './ProfileTabsController';

export const ProfilePage = () => {
  return (
    <MainGridLayout>
      <LeftColumn>
        <LeftHeaderController />
        <PeopleFollowingController />
      </LeftColumn>

      <MainContentColumn>
        <MiddleHeader />
        <ProfileBannerController />
        <ProfileTabsController />
      </MainContentColumn>

      <RightColumn>
        <RightHeader />
        <RoomInvitesController />
      </RightColumn>
    </MainGridLayout>
  );
};
