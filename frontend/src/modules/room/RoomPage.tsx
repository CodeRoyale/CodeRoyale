import React from 'react';
import { LeftHeaderController } from '../../components/header/LeftHeaderController';
import { MiddleHeader } from '../../components/header/MiddleHeader';
import { RightHeader } from '../../components/header/RightHeader';
import { LeftColumn } from '../../components/layouts/mainGridLayout/LeftColumn';
import { MainContentColumn } from '../../components/layouts/mainGridLayout/MainContentColumn';
import { MainGridLayout } from '../../components/layouts/mainGridLayout/MainGridLayout';
import { RightColumn } from '../../components/layouts/mainGridLayout/RightColumn';
import { PeopleController } from '../PeopleController';

export const RoomPage = () => (
  <MainGridLayout>
    <LeftColumn>
      <LeftHeaderController />
      <PeopleController />
    </LeftColumn>

    <MainContentColumn>
      <MiddleHeader />
    </MainContentColumn>

    <RightColumn>
      <RightHeader />
    </RightColumn>
  </MainGridLayout>
);
