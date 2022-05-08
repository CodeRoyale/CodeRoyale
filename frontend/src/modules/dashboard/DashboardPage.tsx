import React from 'react';
import { NextPage } from 'next';
import { LeftHeader } from '../../components/header/LeftHeader';
import { MiddleHeader } from '../../components/header/MiddleHeader';
import { RightHeader } from '../../components/header/RightHeader';
import { LeftColumn } from '../../components/layouts/mainGridLayout/LeftColumn';
import { MainContentColumn } from '../../components/layouts/mainGridLayout/MainContentColumn';
import { MainGridLayout } from '../../components/layouts/mainGridLayout/MainGridLayout';
import { RightColumn } from '../../components/layouts/mainGridLayout/RightColumn';
import { PeopleFollowingController } from '../PeopleFollowingController';
import { ProfileAndRoomInvitesController } from './ProfileAndRoomInvitesController';
import { PublicRoomsController } from './PublicRoomsController';

export const DashboardPage: NextPage<{}> = () => (
  <MainGridLayout>
    <LeftColumn>
      <LeftHeader />
      <PeopleFollowingController />
    </LeftColumn>

    <MainContentColumn>
      <MiddleHeader />
      <PublicRoomsController />
    </MainContentColumn>

    <RightColumn>
      <RightHeader />
      <ProfileAndRoomInvitesController />
    </RightColumn>
  </MainGridLayout>
);

// className='relative grid gap-3 justify-center w-screen h-screen px-16'
// style={{ gridTemplateColumns: '1fr 2fr 1fr' }}
