import React, { useContext } from "react";
import { VetoControlPanel } from "../../components/VetoControlPanel";
import { useRoom, useVetoVote } from "../../global-stores";
import { registerVotes } from "../../service/vetoSocket";
import { userCanVote } from "../../utils/userCanVote";
import { WebSocketContext } from "../ws/WebSocketProvider";

export const VetoControlPanelController: React.FC = () => {
  const { conn } = useContext(WebSocketContext);
  const room = useRoom((state) => state.room);
  const setRoom = useRoom((state) => state.setRoom);
  const votes = useVetoVote((state) => state.votes);

  const handleConfirmVote = async () => {
    try {
      if (votes.length > 0) {
        const result = await registerVotes(conn, votes);
        if (result.data) {
          setRoom(result.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <VetoControlPanel
      timeLimit={room?.competition.veto.timeLimit!}
      confirmVoteBtnIsDisabled={!userCanVote()}
      confirmVoteOnClick={handleConfirmVote}
    />
  );
};
