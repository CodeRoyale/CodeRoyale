import React, { useEffect, useMemo } from "react";
import { Room } from "@coderoyale/common";
import { LeftHeaderController } from "../../components/header/LeftHeaderController";
import { MiddleHeader } from "../../components/header/MiddleHeader";
import { RightHeader } from "../../components/header/RightHeader";
import { LeftColumn } from "../../components/layouts/mainGridLayout/LeftColumn";
import { MainContentColumn } from "../../components/layouts/mainGridLayout/MainContentColumn";
import { MainGridLayout } from "../../components/layouts/mainGridLayout/MainGridLayout";
import { RightColumn } from "../../components/layouts/mainGridLayout/RightColumn";
import { useRoom, useVetoUsers, useVetoVote } from "../../global-stores";
import { ChatController } from "../chat/ChatController";
import { WaitForWsAndAuth } from "../WaitForWsAndAuth";
import { VetoPeopleController } from "./VetoPeopleController";
import { VetoQuestionsController } from "./VetoQuestionsController";

const initializeVetoState = (
  room: Room,
  addVetoUser: (userId: number, teamName: string) => void
) => {
  Object.keys(room.teams).forEach((team) => {
    room.teams[team].forEach((teamMemberId) => {
      addVetoUser(teamMemberId, team);
    });
  });
};

export const VetoPage = () => {
  const room = useRoom((state) => state.room);
  const vetoUsers = useVetoUsers((state) => state.vetoUsers);
  const addVetoUser = useVetoUsers((state) => state.addVetoUser);
  const votes = useVetoVote((state) => state.votes);

  useEffect(() => {
    console.log(votes);
  }, [votes]);

  useMemo(() => {
    if (room && room.state.currMemberCount > vetoUsers.length) {
      initializeVetoState(room, addVetoUser);
    }
  }, [room?.teams]);

  return (
    <WaitForWsAndAuth>
      <MainGridLayout>
        <LeftColumn>
          <LeftHeaderController />
          <VetoPeopleController />
        </LeftColumn>

        <MainContentColumn>
          <MiddleHeader />
          <VetoQuestionsController />
        </MainContentColumn>

        <RightColumn isFixed>
          <RightHeader />
          <ChatController />
        </RightColumn>
      </MainGridLayout>
    </WaitForWsAndAuth>
  );
};
