import React from "react";
import { LeftHeaderController } from "../../components/header/LeftHeaderController";
import { MiddleHeader } from "../../components/header/MiddleHeader";
import { RightHeader } from "../../components/header/RightHeader";
import { LeftColumn } from "../../components/layouts/mainGridLayout/LeftColumn";
import { MainContentColumn } from "../../components/layouts/mainGridLayout/MainContentColumn";
import { MainGridLayout } from "../../components/layouts/mainGridLayout/MainGridLayout";
import { RightColumn } from "../../components/layouts/mainGridLayout/RightColumn";
import { ChatController } from "../chat/ChatController";
import { WaitForWsAndAuth } from "../WaitForWsAndAuth";

export const VetoPage = () => {
  return (
    <WaitForWsAndAuth>
      <MainGridLayout>
        <LeftColumn>
          <LeftHeaderController />
        </LeftColumn>

        <MainContentColumn>
          <MiddleHeader />
        </MainContentColumn>

        <RightColumn>
          <RightHeader />
          <ChatController />
        </RightColumn>
      </MainGridLayout>
    </WaitForWsAndAuth>
  );
};
