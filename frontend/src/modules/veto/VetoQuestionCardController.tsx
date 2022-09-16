import React, { useState } from "react";
import { VetoQuestionCard } from "../../components/VetoQuestionCard";
import { useRoom, useVetoVote } from "../../global-stores";

interface VetoQuestionCardControllerProps {
  questionId: number;
  title: string;
  description: string;
  marginTop?: string;
}

export const VetoQuestionCardController: React.FC<
  VetoQuestionCardControllerProps
> = ({ questionId, description, title, marginTop }) => {
  const room = useRoom((state) => state.room);
  const votes = useVetoVote((state) => state.votes);
  const deleteVote = useVetoVote((state) => state.deleteVote);
  const addVote = useVetoVote((state) => state.addVote);
  const [isSelected, setIsSelected] = useState(votes.includes(questionId));

  const handleQuestionVote = () => {
    if (isSelected) {
      deleteVote(questionId);
      setIsSelected(false);
    } else if (
      votes.length < room?.competition.veto.maxVoteAllowed! &&
      !votes.includes(questionId) &&
      !isSelected
    ) {
      addVote(questionId);
      setIsSelected(true);
    } else {
      console.log("max vote reached: ", room?.competition.veto.maxVoteAllowed);
      setIsSelected(false);
    }
  };

  return (
    <VetoQuestionCard
      description={description}
      title={title}
      marginTop={marginTop}
      isSelected={isSelected}
      voteQuestionOnClick={handleQuestionVote}
    />
  );
};
