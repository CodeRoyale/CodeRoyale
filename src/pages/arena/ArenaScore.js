import React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Stack,
} from '@chakra-ui/react';
import QuestionScoreCard from './QuestionScoreCard';
import useRoom from '../../global-stores/useRoom';
import useCompQuestions from '../../global-stores/useCompQuestions';
import useScoreboard from '../../global-stores/useScoreboard';

const ArenaScore = () => {
  const room = useRoom((state) => state.room);
  const compQuestions = useCompQuestions((state) => state.compQuestions);
  const scoreboard = useScoreboard((state) => state.scoreboard);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const teamsList = [];
  if (room) {
    for (const team in room.teams) {
      teamsList.push(team);
    }
  }

  const problemCodes = [];
  if (compQuestions) {
    for (let i = 0; i < compQuestions.length; i++) {
      problemCodes.push(compQuestions[i].problemCode);
    }
  }

  return (
    <>
      <Button
        marginRight='0.8em'
        marginTop='1em'
        marginBottom='1em'
        onClick={onOpen}
      >
        View Score
      </Button>

      <Drawer placement='right' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth='1px'>Score</DrawerHeader>
            <DrawerBody>
              <Stack>
                {problemCodes.map((problemCode, index) => (
                  <QuestionScoreCard
                    key={index}
                    problemCode={problemCode}
                    teamsList={teamsList}
                    scoreboard={scoreboard}
                  />
                ))}
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default ArenaScore;
