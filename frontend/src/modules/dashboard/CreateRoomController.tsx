import React, { useContext, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { Form, Formik } from 'formik';
import { Button } from '../../components/Button';
import { InputField } from '../../components/InputField';
import { Modal } from '../../components/Modal';
import { Switch } from '../../components/Switch';
import { Select } from '../../components/Select';
import { WebSocketContext } from '../ws/WebSocketProvider';
import { createRoom } from '../../service/roomSocket';

const maxNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const questionOptions = [1, 2, 3, 4, 5];

export const CreateRoomController: React.FC = () => {
  const client = useApolloClient();
  const conn = useContext(WebSocketContext);
  const [isOpen, setIsOpen] = useState(false);

  const maxQuestionsOptions = questionOptions.map((n) => {
    return n === 1
      ? { option: `${n} question`, value: n }
      : {
          option: `${n} questions`,
          value: n,
        };
  });

  const maxVetoQuestionOptions = maxNumbers
    .filter((q) => {
      if (q === 1) {
        return false;
      }
      return true;
    })
    .map((q) => ({ option: `${q} questions`, value: q }));

  return (
    <>
      <Button
        buttonClass="primary"
        size="normal"
        onClick={() => setIsOpen(true)}
      >
        Create Room
      </Button>
      <Modal
        title="Create Room"
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
      >
        <Formik
          initialValues={{
            title: '',
            private: false,
            maxMembers: 2,
            maxTeams: 2,
            maxMembersPerTeam: 1,
            maxCompQuestions: 3,
            compTimeLimit: 30 * 60 * 1000,
            vetoQuestionCount: 5,
            maxVetoVotesAllowed: 2,
            vetoTimeLimit: 3 * 60 * 1000,
          }}
          onSubmit={async (values, { setErrors }) => {
            console.log('onSubmit: ', values);
            try {
              const response: any = await createRoom(conn, values);

              if (response.data) {
                console.log('CREATE_ROOM: ', response.data);
                setIsOpen(false);
                client.cache.evict({ fieldName: 'rooms:{}' });
              }
            } catch (error) {
              console.log(error);
            }
          }}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form>
              <InputField
                name="title"
                label="Title"
                placeholder="Title"
                type="text"
              />
              <div className="mt-3">
                <Select
                  label="Max members allowed to join room"
                  value={values.maxMembers}
                  onChange={(val) =>
                    setFieldValue('maxMembers', val.target.value)
                  }
                  // need to change to 2,4,6,8
                  options={[
                    { option: '2 members', value: 2 },
                    { option: '3 members', value: 3 },
                    { option: '4 members', value: 4 },
                    { option: '5 members', value: 5 },
                    { option: '6 members', value: 6 },
                    { option: '7 members', value: 7 },
                    { option: '8 members', value: 8 },
                    { option: '9 members', value: 9 },
                    { option: '10 members', value: 10 },
                  ]}
                />
              </div>
              <div className="mt-3">
                <Select
                  label="Total number of questions for competition"
                  value={values.maxCompQuestions}
                  onChange={(val) =>
                    setFieldValue('maxQuestions', val.target.value)
                  }
                  options={maxQuestionsOptions}
                />
              </div>
              <div className="mt-3 grid grid-cols-2 grid-rows-3 gap-2">
                <Select
                  label="Max teams allowed in room"
                  value={values.maxTeams}
                  onChange={(val) =>
                    setFieldValue('maxTeams', val.target.value)
                  }
                  options={[
                    { option: '2 teams', value: 2 },
                    { option: '3 teams', value: 3 },
                    { option: '4 teams', value: 4 },
                    { option: '5 teams', value: 5 },
                    { option: '6 teams', value: 6 },
                    { option: '7 teams', value: 7 },
                    { option: '8 teams', value: 8 },
                    { option: '9 teams', value: 9 },
                    { option: '10 teams', value: 10 },
                  ]}
                />
                <Select
                  label="Max members allowed per team"
                  value={values.maxMembersPerTeam}
                  onChange={(val) =>
                    setFieldValue('maxMembersPerTeam', val.target.value)
                  }
                  options={[
                    { option: '1 member', value: 1 },
                    { option: '2 members', value: 2 },
                    { option: '3 members', value: 3 },
                    { option: '4 members', value: 4 },
                    { option: '5 members', value: 5 },
                    { option: '6 members', value: 6 },
                    { option: '7 members', value: 7 },
                    { option: '8 members', value: 8 },
                    { option: '9 members', value: 9 },
                    { option: '10 members', value: 10 },
                  ]}
                />
                <Select
                  label="Number of questions for veto"
                  value={values.vetoQuestionCount}
                  onChange={(val) =>
                    setFieldValue('vetoQuestionCount', val.target.value)
                  }
                  options={maxVetoQuestionOptions}
                />
                <Select
                  label="Max number of votes allowed"
                  value={values.maxVetoVotesAllowed}
                  onChange={(val) =>
                    setFieldValue('maxVetoVoteAllowed', val.target.value)
                  }
                  options={[
                    { option: '2 questions', value: 2 },
                    { option: '3 questions', value: 3 },
                    { option: '4 questions', value: 4 },
                    { option: '5 questions', value: 5 },
                    { option: '6 questions', value: 6 },
                    { option: '7 questions', value: 7 },
                    { option: '8 questions', value: 8 },
                    { option: '9 questions', value: 9 },
                    { option: '10 questions', value: 10 },
                  ]}
                />
                <Select
                  label="Veto time limit"
                  value={values.vetoTimeLimit}
                  onChange={(val) =>
                    setFieldValue('vetoTimeLimit', val.target.value)
                  }
                  options={[
                    { option: '3 minutes', value: 3 * 60 * 1000 },
                    { option: '5 minutes', value: 4 * 60 * 1000 },
                    { option: '7 minutes', value: 6 * 60 * 1000 },
                    { option: '9 minutes', value: 8 * 60 * 1000 },
                    { option: '11 minutes', value: 10 * 60 * 1000 },
                    { option: '13 minutes', value: 10 * 60 * 1000 },
                    { option: '15 minutes', value: 10 * 60 * 1000 },
                  ]}
                />
                <Select
                  label="Competition time limit"
                  value={values.compTimeLimit}
                  onChange={(val) =>
                    setFieldValue('compTimeLimit', val.target.value)
                  }
                  options={[
                    { option: '30 minutes', value: 30 * 60 * 1000 },
                    { option: '1 hour', value: 1 * 60 * 60 * 1000 },
                    { option: '3 hours', value: 3 * 60 * 60 * 1000 },
                    { option: '6 hours', value: 6 * 60 * 60 * 1000 },
                    { option: '9 hours', value: 9 * 60 * 60 * 1000 },
                    { option: '12 hours', value: 12 * 60 * 60 * 1000 },
                  ]}
                />
              </div>
              <div className="mt-3">
                <Switch
                  label="Will this be a private room?"
                  value={values.private}
                  onChange={(val) => setFieldValue('private', val)}
                />
              </div>
              <Button
                type="submit"
                buttonClass="primary"
                size="normal"
                style={{ marginTop: '2em' }}
                loading={isSubmitting}
                loadingText={isSubmitting ? 'Creating a Room' : null}
              >
                Create Room
              </Button>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};
