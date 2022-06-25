import React from 'react';
import { LeftHeaderController } from '../../components/header/LeftHeaderController';
import { MiddleHeader } from '../../components/header/MiddleHeader';
import { RightHeader } from '../../components/header/RightHeader';
import { LeftColumn } from '../../components/layouts/mainGridLayout/LeftColumn';
import { MainContentColumn } from '../../components/layouts/mainGridLayout/MainContentColumn';
import { MainGridLayout } from '../../components/layouts/mainGridLayout/MainGridLayout';
import { RightColumn } from '../../components/layouts/mainGridLayout/RightColumn';
import { PeopleController } from '../PeopleController';
import { WaitForWsAndAuth } from '../WaitForWsAndAuth';
import { MeCardController } from '../MeCardController';
import { RoomInvitesController } from '../RoomInvitesController';
import { PublicRoomsController } from './PublicRoomsController';

export const DashboardPage = () => {
  return (
    <WaitForWsAndAuth>
      <MainGridLayout>
        <LeftColumn>
          <LeftHeaderController />
          <PeopleController />
        </LeftColumn>

        <MainContentColumn>
          <MiddleHeader />
          <PublicRoomsController />
        </MainContentColumn>

        <RightColumn>
          <RightHeader />
          <MeCardController />
          <RoomInvitesController />
        </RightColumn>
      </MainGridLayout>
    </WaitForWsAndAuth>
  );
};

// className='relative grid gap-3 justify-center w-screen h-screen px-16'
// style={{ gridTemplateColumns: '1fr 2fr 1fr' }}
