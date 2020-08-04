import React from 'react';
import './FrontPageMain.css';
import { useHistory } from 'react-router-dom';
import Button from '../../components/button/Button';

function Description() {
  // Redirect to /signup
  const history = useHistory();
  const signUpRedirect = () => {
    let path = `signup`;
    history.push(path);
  };

  return (
    <div data-testid='desc-container' className='desc-container'>
      <div data-testid='desc-text-container' className='desc-text-container'>
        <p data-testid='desc-heading' className='desc-heading'>
          Compete with other coders
        </p>
        <p data-testid='desc-text' className='desc-text'>
          Challenge your friends to a coding match or play <br /> against random
          coders from around the globe.
        </p>
        <div data-testid='desc-signin' className='desc-signin'>
          <Button
            type='button'
            onClick={signUpRedirect}
            buttonStyle='btn--primary--normal'
            buttonSize='btn--small'
          >
            Sign up
          </Button>
        </div>
      </div>
      <div data-testid='desc-separator' className='desc-separator'></div>
      <img
        data-testid='desc-image'
        className='desc-image'
        alt='coder programming'
        src='/images/programming.svg'
      />
    </div>
  );
}

export default Description;
