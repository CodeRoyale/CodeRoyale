import React from 'react';
import { LeftHeaderController } from '../../components/header/LeftHeaderController';
import { MiddleHeader } from '../../components/header/MiddleHeader';
import { RightHeader } from '../../components/header/RightHeader';
import { LeftColumn } from '../../components/layouts/mainGridLayout/LeftColumn';
import { MainContentColumn } from '../../components/layouts/mainGridLayout/MainContentColumn';
import { MainGridLayout } from '../../components/layouts/mainGridLayout/MainGridLayout';
import { RightColumn } from '../../components/layouts/mainGridLayout/RightColumn';
import { PeopleController } from '../PeopleController';
import { MeCardController } from '../MeCardController';
import { RoomInvitesController } from '../RoomInvitesController';
import { WaitForWsAndAuth } from '../WaitForWsAndAuth';
import { SettingsCardController } from './SettingsFormController';

export const SettingsPage = () => {
  return (
    <WaitForWsAndAuth>
      <MainGridLayout>
        <LeftColumn>
          <LeftHeaderController />
          <PeopleController />
        </LeftColumn>

        <MainContentColumn>
          <MiddleHeader />
          <SettingsCardController />
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
