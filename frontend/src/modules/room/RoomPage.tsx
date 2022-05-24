import React from 'react';
import { LeftHeader } from '../../components/header/LeftHeader';
import { MiddleHeader } from '../../components/header/MiddleHeader';
import { RightHeader } from '../../components/header/RightHeader';
import { LeftColumn } from '../../components/layouts/mainGridLayout/LeftColumn';
import { MainContentColumn } from '../../components/layouts/mainGridLayout/MainContentColumn';
import { MainGridLayout } from '../../components/layouts/mainGridLayout/MainGridLayout';
import { RightColumn } from '../../components/layouts/mainGridLayout/RightColumn';
import { PeopleFollowingController } from '../PeopleFollowingController';

export const RoomPage = () => (
  <MainGridLayout>
    <LeftColumn>
      <LeftHeader />
      <PeopleFollowingController />
    </LeftColumn>

    <MainContentColumn>
      <MiddleHeader />
    </MainContentColumn>

    <RightColumn>
      <RightHeader />
    </RightColumn>
  </MainGridLayout>
);
