import React from "react";
import { VetoControlPanel } from "../../components/VetoControlPanel";
import { VetoQuestionCard } from "../../components/VetoQuestionCard";
import { useQuestionsQuery } from "../../generated/graphql";
import { useRoom, useVetoUsers } from "../../global-stores";

export const VetoQuestionController: React.FC = () => {
  const room = useRoom((state) => state.room);
  const { data, loading } = useQuestionsQuery({
    variables: { questionIds: room?.competition.veto.questionIds! },
  });

  const vetoUsers = useVetoUsers((state) => state.vetoUsers);

  console.log("vetoUsers: ", vetoUsers);

  return (
    <div className="mt-8 px-4">
      <VetoControlPanel />
      {loading && !data ? (
        <span className="text-primary-200">Loading...</span>
      ) : (
        data?.questions.map((question, index) => (
          <VetoQuestionCard
            key={index}
            title={question.title}
            description={question.description}
            marginTop="mt-6"
          />
        ))
      )}
    </div>
  );
};
