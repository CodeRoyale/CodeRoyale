import React from "react";
import { LeftHeaderController } from "../../components/header/LeftHeaderController";
import { MiddleHeader } from "../../components/header/MiddleHeader";
import { RightHeader } from "../../components/header/RightHeader";
import { LeftColumn } from "../../components/layouts/mainGridLayout/LeftColumn";
import { MainContentColumn } from "../../components/layouts/mainGridLayout/MainContentColumn";
import { MainGridLayout } from "../../components/layouts/mainGridLayout/MainGridLayout";
import { RightColumn } from "../../components/layouts/mainGridLayout/RightColumn";
import { ChatController } from "../chat/ChatController";
import { WaitForRoom } from "../WaitForRoom";
import { WaitForWsAndAuth } from "../WaitForWsAndAuth";
import { VetoPeopleController } from "./VetoPeopleController";
import { VetoQuestionsController } from "./VetoQuestionsController";

export const VetoPage = () => {
  return (
    <WaitForWsAndAuth>
      <WaitForRoom>
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
      </WaitForRoom>
    </WaitForWsAndAuth>
  );
};
