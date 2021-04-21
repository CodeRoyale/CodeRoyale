import React, { useEffect } from 'react';
import { ERROR_MSG } from '../../utils/constants';
import { connect } from 'react-redux';
import { veto, resetVetoAction } from '../../actions/vetoActions';
import { Button, useToast } from '@chakra-ui/react';

const StartCompetitionButton = ({
  socketData,
  vetoData,
  veto,
  resetVetoAction,
}) => {
  const socket = socketData.socket;
  const toast = useToast();

  const onClickStartCompetition = () => {
    veto(socket);
  };

  // Starting veto error handling
  useEffect(() => {
    if (vetoData.error) {
      toast({
        title: 'Error on Veto',
        description: ERROR_MSG,
        status: 'error',
        position: 'top-right',
        duration: 4000,
        isClosable: true,
      });
      resetVetoAction();
    }
  }, [vetoData.error, resetVetoAction, toast]);

  let content = (
    <Button
      colorScheme='orange'
      size='sm'
      onClick={onClickStartCompetition}
      isLoading={vetoData.vetoRequested}
      loadingText='Waiting for veto to start'
    >
      Start Competition
    </Button>
  );

  return content;
};

const mapStateToProps = (state) => ({
  socketData: state.socketData,
  vetoData: state.vetoData,
});

export default connect(mapStateToProps, { veto, resetVetoAction })(
  StartCompetitionButton
);
