import React from 'react';
import { useRouter } from 'next/router';
import { Chat } from '../../components/chat/Chat';
import { LeftHeaderController } from '../../components/header/LeftHeaderController';
import { MiddleHeader } from '../../components/header/MiddleHeader';
import { RightHeader } from '../../components/header/RightHeader';
import { LeftColumn } from '../../components/layouts/mainGridLayout/LeftColumn';
import { MainContentColumn } from '../../components/layouts/mainGridLayout/MainContentColumn';
import { MainGridLayout } from '../../components/layouts/mainGridLayout/MainGridLayout';
import { RightColumn } from '../../components/layouts/mainGridLayout/RightColumn';
import { PeopleController } from '../PeopleController';
import { WaitForWsAndAuth } from '../WaitForWsAndAuth';
import { RoomCardController } from './RoomCardController';

export const RoomPage = () => {
  const router = useRouter();

  console.log(router.query.id); // join room using this id

  return (
    <WaitForWsAndAuth>
      <MainGridLayout>
        <LeftColumn>
          <LeftHeaderController />
          <PeopleController />
        </LeftColumn>

        <MainContentColumn isFixed>
          <MiddleHeader />
          <RoomCardController admin={true} adminUserName="joel" title="yoyo" />
        </MainContentColumn>

        <RightColumn>
          <RightHeader />
          <Chat />
        </RightColumn>
      </MainGridLayout>
    </WaitForWsAndAuth>
  );
};
