import React from "react";
import { VetoControlPanel } from "../../components/VetoControlPanel";
import { useQuestionsQuery } from "../../generated/graphql";
import { useRoom } from "../../global-stores";
import { VetoQuestionCardController } from "./VetoQuestionCardController";

export const VetoQuestionsController: React.FC = () => {
  const room = useRoom((state) => state.room);
  const { data, loading } = useQuestionsQuery({
    variables: { questionIds: room?.competition.veto.questionIds! },
  });

  return (
    <div className="mt-8 px-4">
      <VetoControlPanel />
      {loading && !data ? (
        <span className="text-primary-200">Loading...</span>
      ) : (
        data?.questions.map((question, index) => (
          <VetoQuestionCardController
            key={index}
            questionId={question.id}
            title={question.title}
            description={question.description}
            marginTop="mt-6"
          />
        ))
      )}
    </div>
  );
};
