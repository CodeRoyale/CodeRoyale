import React from 'react';
import './Description.css';
import { useHistory } from 'react-router-dom';
import Button from '../../../components/button/Button';

function Description() {
  // Redirect to /login
  const history = useHistory();
  const loginRedirect = () => {
    let path = `login`;
    history.push(path);
  };

  return (
    <div className='desc-container'>
      <div className='desc-text-container'>
        <p className='desc-heading'>Compete with other coders</p>
        <p className='desc-text'>
          Challenge your friends to a coding match or play <br /> against random
          coders from around the globe.
        </p>
        <div className='desc-signin'>
          <Button
            type='button'
            onClick={loginRedirect}
            buttonStyle='btn--primary--normal'
            buttonSize='btn--small'
          >
            Sign in
          </Button>
        </div>
      </div>
      <div className='desc-separator'></div>
      <img
        className='desc-image'
        alt='coder programming'
        src='/images/programming.svg'
      />
    </div>
  );
}

export default Description;
