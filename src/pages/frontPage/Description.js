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
    <div>
      <div className='desc-container-head'>
        <div className='desc-text-container'>
          <p className='desc-heading'>A new way to compete in coding</p>
          <p className='desc-text'>
            Challenge teams/individuals to a coding match today.
          </p>
          <div className='desc-signin'>
            <Button
              type='button'
              onClick={signUpRedirect}
              buttonStyle='btn--primary--circle'
              buttonSize='btn--extra--large'
            >
              Sign up now
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
      <div className='desc-container-what'>
        <p className='desc-what'>What is CodeRoyale?</p>
        <p className='desc-what-text'>
          CodeRoyale is a competitive programming platform that lets coders from
          around the World create teams/solo to compete with other coders.
        </p>
        <img
          className='desc-what-image'
          alt='what is coderoyale'
          src='/images/test1.svg'
        />
      </div>
      <div className='desc-container-how'>
        <div className='desc-text-container'>
          <p className='desc-how'>How does it work?</p>
          <p className='desc-how-text'>
            1. Create a room
            <br />
            2. Make teams
            <br />
            3. Select a question to fight
            <br />
            4. Code away!
            <br />
          </p>
        </div>
        <div className='desc-separator'></div>
        <img
          className='desc-how-image'
          alt='coder programming'
          src='/images/test2.svg'
        />
      </div>
      <div className='desc-container-sign-up'>
        <p className='desc-sign-up'>
          It takes only 1 min to sign up <br />
          and <span>it's free!</span>
        </p>
        <center>
          <div className='desc-sign-up-btn'>
            <Button
              type='button'
              onClick={signUpRedirect}
              buttonStyle='btn--primary--circle'
              buttonSize='btn--extra--large'
            >
              Sign up
            </Button>
          </div>
        </center>
      </div>
    </div>
  );
}

export default Description;
