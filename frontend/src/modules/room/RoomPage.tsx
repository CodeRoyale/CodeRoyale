import React from 'react';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { Chat } from '../../components/chat/Chat';
import { LeftHeaderController } from '../../components/header/LeftHeaderController';
import { MiddleHeader } from '../../components/header/MiddleHeader';
import { RightHeader } from '../../components/header/RightHeader';
import { LeftColumn } from '../../components/layouts/mainGridLayout/LeftColumn';
import { MainContentColumn } from '../../components/layouts/mainGridLayout/MainContentColumn';
import { MainGridLayout } from '../../components/layouts/mainGridLayout/MainGridLayout';
import { RightColumn } from '../../components/layouts/mainGridLayout/RightColumn';
import { useRoom } from '../../global-stores';
import { joinRoom } from '../../service/roomSocket';
import { PeopleController } from '../PeopleController';
import { WaitForWsAndAuth } from '../WaitForWsAndAuth';
import { WebSocketContext } from '../ws/WebSocketProvider';
import { RoomCardController } from './RoomCardController';

export const RoomPage = () => {
  const router = useRouter();
  const { conn } = useContext(WebSocketContext);
  const room = useRoom((state) => state.room);
  const setRoom = useRoom((state) => state.setRoom);

  let body = null;

  useEffect(() => {
    const joinRoomFunction = async () => {
      if (!room && conn) {
        try {
          const result: any = await joinRoom(conn, router.query.id as string);
          if (result.data) {
            setRoom(result.data);
          }
        } catch (error) {
          console.log(error);
          // show toast and push to /dashboard
          router.push('/dashboard');
        }
      }
    };

    joinRoomFunction();
  }, [room, conn]);

  if (room) {
    body = (
      <MainGridLayout>
        <LeftColumn>
          <LeftHeaderController />
          <PeopleController />
        </LeftColumn>

        <MainContentColumn isFixed>
          <MiddleHeader />
          <RoomCardController />
        </MainContentColumn>

        <RightColumn>
          <RightHeader />
          <Chat />
        </RightColumn>
      </MainGridLayout>
    );
  }

  return <WaitForWsAndAuth>{body}</WaitForWsAndAuth>;
};
