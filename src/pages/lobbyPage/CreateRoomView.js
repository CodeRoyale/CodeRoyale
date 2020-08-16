import React, { useState, useEffect } from 'react';
import './LobbyMain.css';
import Button from '../../components/button/Button';
import { Redirect } from 'react-router';

function CreateRoomView({ socket }) {
  const errorMessage = 'Some error occured !';
  const [generateClicked, setGenerateClicked] = useState(false);
  const [room_id, setRoomId] = useState('');
  const [roomCreated, setRoomCreated] = useState(false);
  const [max_teams, setMaxTeams] = useState(2);
  const [max_perTeam, setMaxPerTeam] = useState(1);
  const [max_perRoom, setMaxPerRoom] = useState(2);
  const [timeLimit, setTimeLimit] = useState(0.5 * 60 * 60 * 60);
  const [privateRoom, setPrivateRoom] = useState(true);
  const [arenaTestClicked, setArenaTestClicked] = useState(false);

  const onClickGenerateButton = () => {
    setGenerateClicked(true);
  };
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const times = [0.5, 1, 3, 6, 12, 24, 48];

  // TODO: Have to include code for indicating the creation of room...
  // TODO: Have to refactor code and make use of less useStates...
  // Create room...
  useEffect(() => {
    if (generateClicked) {
      socket.emit(
        'CREATE_ROOM',
        { max_teams, max_perTeam, max_perRoom, timeLimit, privateRoom },
        (data) => {
          if (data !== errorMessage) {
            setRoomId(data.config.id);
            setRoomCreated(true);
          }
          console.log(data);
        }
      );
    }
  }, [
    generateClicked,
    max_perRoom,
    max_perTeam,
    max_teams,
    privateRoom,
    socket,
    timeLimit,
  ]);

  // Testing Arena....
  //**************************************//
  const onClickTestArena = () => {
    setArenaTestClicked(true);
  };
  if (arenaTestClicked) {
    return <Redirect to={{ pathname: '/arena', props: { socket: socket } }} />;
  }
  //**************************************//

  // If room created successfully....
  if (roomCreated) {
    return (
      <Redirect
        to={{ pathname: '/room', props: { room_id: room_id, socket: socket } }}
      />
    );
  }

  // options for creating room....
  const optionNumbers = numbers.map((number) => (
    <option key={number} value={number}>
      {number}
    </option>
  ));

  const maxTeamView = (
    <>
      <div>Maximum team</div>
      <div>
        <select
          value={max_teams}
          onChange={(e) => setMaxTeams(parseInt(e.target.value))}
        >
          {optionNumbers}
        </select>
      </div>
    </>
  );

  const maxPerRoomView = (
    <>
      <div>Maximum players in the room</div>
      <div>
        <select
          value={max_perRoom}
          onChange={(e) => setMaxPerRoom(parseInt(e.target.value))}
        >
          {optionNumbers}
        </select>
      </div>
    </>
  );

  const maxPerTeamView = (
    <>
      <div>Maximum players per team</div>
      <div>
        <select
          value={max_perTeam}
          onChange={(e) => setMaxPerTeam(parseInt(e.target.value))}
        >
          {optionNumbers}
        </select>
      </div>
    </>
  );

  const timeLimitView = (
    <>
      <div>Time Limit</div>
      <div>
        <select
          value={timeLimit}
          onChange={(e) =>
            setTimeLimit(parseInt(e.target.value) * 60 * 60 * 60)
          }
        >
          {times.map((time) => (
            <option key={time} value={time}>
              {
                // Converting time to strings...
                time < 1
                  ? (time * 60).toString() + ' Minutes'
                  : time < 24
                  ? time.toString() + ' Hours'
                  : (time / 24).toString() + ' Day'
              }
            </option>
          ))}
        </select>
      </div>
    </>
  );

  const privateRoomView = (
    <>
      <div>
        <input
          type='checkbox'
          value={privateRoom}
          onChange={() => setPrivateRoom(!privateRoom)}
        />{' '}
        Private Room
      </div>
    </>
  );

  // Main Render...
  return (
    <div>
      <div className='create-room-options-choose-container'>
        {maxTeamView}
        {maxPerRoomView}
        {maxPerTeamView}
        {timeLimitView}
        {privateRoomView}
      </div>
      <div className='create-room-button-container'>
        <Button
          type='button'
          onClick={onClickGenerateButton}
          buttonStyle='btn--primary--normal'
          buttonSize='btn--medium'
        >
          Create Room
        </Button>
      </div>
      {
        /********************************/
        /*This is only for test...*/
        <div className='create-room-button-container'>
          <Button
            type='button'
            onClick={onClickTestArena}
            buttonStyle='btn--primary--normal'
            buttonSize='btn--medium'
          >
            Test Arena
          </Button>
        </div>
        /********************************/
      }
    </div>
  );
}

export default CreateRoomView;
