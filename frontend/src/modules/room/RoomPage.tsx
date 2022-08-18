import React from "react";
import { LeftHeaderController } from "../../components/header/LeftHeaderController";
import { MiddleHeader } from "../../components/header/MiddleHeader";
import { RightHeader } from "../../components/header/RightHeader";
import { LeftColumn } from "../../components/layouts/mainGridLayout/LeftColumn";
import { MainContentColumn } from "../../components/layouts/mainGridLayout/MainContentColumn";
import { MainGridLayout } from "../../components/layouts/mainGridLayout/MainGridLayout";
import { RightColumn } from "../../components/layouts/mainGridLayout/RightColumn";
import { ChatController } from "../chat/ChatController";
import { PeopleController } from "../PeopleController";
import { WaitForWsAndAuth } from "../WaitForWsAndAuth";
import { JoinRoom } from "./JoinRoom";
import { RoomCardController } from "./RoomCardController";

export const RoomPage = () => {
  return (
    <WaitForWsAndAuth>
      <JoinRoom>
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
            <ChatController />
          </RightColumn>
        </MainGridLayout>
      </JoinRoom>
    </WaitForWsAndAuth>
  );
};
