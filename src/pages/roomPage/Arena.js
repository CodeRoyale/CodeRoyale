import React, { useState } from 'react';
import { Redirect } from 'react-router';
import Button from '../../components/button/Button';

function Arena({ socket }) {
  const [arenaClicked, setArenaClicked] = useState(false);
  const onClickArena = () => {
    setArenaClicked(true);
  };
  if (arenaClicked) {
    return <Redirect to={{ pathname: '/arena', props: { socket: socket } }} />;
  }
  return (
    <div>
      <Button
        type='button'
        onClick={onClickArena}
        buttonStyle='btn--primary--normal'
        buttonSize='btn--medium'
      >
        Arena
      </Button>
    </div>
  );
}

export default Arena;
