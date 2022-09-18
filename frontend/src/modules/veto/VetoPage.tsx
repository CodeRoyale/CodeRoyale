import React from "react";
import { useRouter } from "next/router";
import { Room } from "@coderoyale/common";
import { useContext, useEffect } from "react";
import { LeftHeaderController } from "../../components/header/LeftHeaderController";
import { MiddleHeader } from "../../components/header/MiddleHeader";
import { RightHeader } from "../../components/header/RightHeader";
import { LeftColumn } from "../../components/layouts/mainGridLayout/LeftColumn";
import { MainContentColumn } from "../../components/layouts/mainGridLayout/MainContentColumn";
import { MainGridLayout } from "../../components/layouts/mainGridLayout/MainGridLayout";
import { RightColumn } from "../../components/layouts/mainGridLayout/RightColumn";
import { useRoom } from "../../global-stores";
import { ChatController } from "../chat/ChatController";
import { WaitForRoom } from "../WaitForRoom";
import { WaitForWsAndAuth } from "../WaitForWsAndAuth";
import { WebSocketContext } from "../ws/WebSocketProvider";
import { VetoPeopleController } from "./VetoPeopleController";
import { VetoQuestionsController } from "./VetoQuestionsController";

export const VetoPage = () => {
  const { conn } = useContext(WebSocketContext);
  const setRoom = useRoom((state) => state.setRoom);
  const router = useRouter();

  const handleRoomUpdated = (room: Room) => {
    setRoom(room);
  };

  const handleVetoStopped = (room: Room) => {
    router.push(`/arena/${room.config.id}`);
    setRoom(room);
  };

  useEffect(() => {
    conn?.on("roomUpdated", handleRoomUpdated);

    return () => {
      conn?.off("roomUpdated", handleRoomUpdated);
    };
  }, []);

  useEffect(() => {
    conn?.on("vetoStopped", handleVetoStopped);

    return () => {
      conn?.off("vetoStopped", handleVetoStopped);
    };
  }, []);

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
