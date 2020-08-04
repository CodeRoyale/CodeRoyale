import React from 'react';
import './OutroMain.css';
import { useHistory } from 'react-router-dom';
import Button from '../../components/button/Button';

function OutroContent() {
  // Redirect to /home
  const history = useHistory();
  const homeRedirect = () => {
    let path = `/`;
    history.push(path);
  };

  return (
    <div data-test='outro-content'>
      <center>
        <img
          data-test='outro-image'
          className='outro-image'
          alt='coder programming'
          src='/images/sad.svg'
        />
        <p data-test='outro-text' className='outro-text'>
          We are sorry to see you go!
        </p>
        <div data-test='outro-button' className='outro-button'>
          <Button
            type='button'
            onClick={homeRedirect}
            buttonStyle='btn--primary--normal'
            buttonSize='btn--large'
          >
            Home
          </Button>
        </div>
      </center>
    </div>
  );
}

export default OutroContent;
