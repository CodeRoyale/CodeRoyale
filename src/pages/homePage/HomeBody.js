import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../components/button/Button';
import Footer from '../../components/footer/Footer';
import './HomeMain.css';

const HomeBody = () => {
  // Redirect to /signup
  const history = useHistory();
  const signUpRedirect = () => {
    let path = `signup`;
    history.push(path);
  };

  return (
    <div>
      <div className='home-body-container-head'>
        <div className='home-body-text-container'>
          <p className='home-body-heading'>
            A new way to compete in{' '}
            <span className='home-body-span'>coding</span>
          </p>
          <p className='home-body-text'>
            Challenge teams/individuals to a coding match today.
          </p>
          <div className='home-body-signin'>
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
        <div className='home-body-separator'></div>
        <img
          className='home-body-image'
          alt='coder programming'
          src='/images/winning.svg'
        />
      </div>
      <div className='home-body-container-what'>
        <p className='home-body-what'>
          What is <span className='desc-span'>CodeRoyale?</span>
        </p>
        <p className='home-body-what-text'>
          CodeRoyale is a competitive programming platform that lets coders from
          around the World create teams/solo to compete with other coders.
        </p>
        <img
          className='home-body-what-image'
          alt='what is coderoyale'
          src='/images/laptop-coding.svg'
        />
      </div>
      <div className='home-body-container-how'>
        <div className='home-body-text-container'>
          <p className='home-body-how'>
            How does it <span className='home-body-span'>work?</span>
          </p>
          <p className='home-body-how-text'>
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
        <div className='home-body-separator'></div>
        <img
          className='home-body-how-image'
          alt='coder programming'
          src='/images/laptop.svg'
        />
      </div>
      <div className='home-body-container-sign-up'>
        <p className='home-body-sign-up'>
          It takes only 1 min to sign up <br />
          and <span className='home-body-span'>it's free!</span>
        </p>
        <center>
          <div className='home-body-sign-up-btn'>
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
      <Footer />
    </div>
  );
};

export default HomeBody;
