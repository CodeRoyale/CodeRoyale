import React from 'react';
import Button from '../../components/button/Button';
import { connect } from 'react-redux';
import { veto } from '../../actions/vetoActions';
import { Loader } from 'rsuite';

const StartCompetitionButton = ({ socketData, vetoData, veto }) => {
  const socket = socketData.socket;

  const onClickStartCompetition = () => {
    veto(socket);
  };

  let content = (
    <div className='start-competition-view'>
      <div className='start-competition-view-button'>
        <Button
          type='button'
          onClick={onClickStartCompetition}
          buttonStyle='btn--primary--normal'
          buttonSize='btn--medium'
        >
          Start Competition
        </Button>
      </div>
    </div>
  );

  if (vetoData.vetoRequested) {
    content = (
      <div className='start-competition-view'>
        <Loader size='md' content='Waiting for veto to start..' />
      </div>
    );
  }

  return content;
};

const mapStateToProps = (state) => ({
  socketData: state.socketData,
  vetoData: state.vetoData,
});

export default connect(mapStateToProps, { veto })(StartCompetitionButton);
