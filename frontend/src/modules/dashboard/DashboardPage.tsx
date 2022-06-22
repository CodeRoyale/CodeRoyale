import React, { useContext, useEffect } from 'react';
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
import { WebSocketContext } from '../ws/WebSocketProvider';
import { PublicRoomsController } from './PublicRoomsController';

export const DashboardPage = () => {
  const conn = useContext(WebSocketContext);

  useEffect(() => {
    if (conn) {
      console.log('emit');
      conn.emit(
        'CREATE_ROOM',
        {
          config: {
            title: 'Joels room',
            description: 'sample',
            private: true,
            maxTeams: 2,
            maxMembersPerTeam: 2,
            maxMembers: 4,
          },
          competition: {
            timeLimit: 200000,
            maxQuestions: 20,
          },
          veto: {
            questionCount: 30,
            maxVoteAllowed: 2,
            timeLimit: 12121212,
          },
        },
        (data: any) => {
          console.log('CREATE_ROOM_DATA', data);
        }
      );
    }
  }, [conn]);

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
