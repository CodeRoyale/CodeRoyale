import React from 'react';
import { LeftHeaderController } from '../../components/header/LeftHeaderController';
import { MiddleHeader } from '../../components/header/MiddleHeader';
import { RightHeader } from '../../components/header/RightHeader';
import { LeftColumn } from '../../components/layouts/mainGridLayout/LeftColumn';
import { MainContentColumn } from '../../components/layouts/mainGridLayout/MainContentColumn';
import { MainGridLayout } from '../../components/layouts/mainGridLayout/MainGridLayout';
import { RightColumn } from '../../components/layouts/mainGridLayout/RightColumn';
import { PeopleFollowingController } from '../PeopleFollowingController';
import { ProfileCardController } from '../ProfileCardController';
import { RoomInvitesController } from '../RoomInvitesController';
import { SettingsCardController } from './SettingsFormController';

export const SettingsPage = () => {
  return (
    <MainGridLayout>
      <LeftColumn>
        <LeftHeaderController />
        <PeopleFollowingController />
      </LeftColumn>

      <MainContentColumn>
        <MiddleHeader />
        <SettingsCardController />
      </MainContentColumn>

      <RightColumn>
        <RightHeader />
        <ProfileCardController />
        <RoomInvitesController />
      </RightColumn>
    </MainGridLayout>
  );
};
