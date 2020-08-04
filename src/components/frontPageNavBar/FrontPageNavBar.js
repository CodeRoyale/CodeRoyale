import React from 'react';
import LogoContainer from '../logoContainer/LogoContainer';
import { useHistory } from 'react-router-dom';
import './FrontPageNavBar.css';
import Button from '../button/Button';

function FrontPageNavBar() {
  // Redirect to /signin
  const history = useHistory();
  const loginRedirect = () => {
    let path = `signin`;
    history.push(path);
  };

  // Redirect for /signup
  const signUpRedirect = () => {
    let path = `signup`;
    history.push(path);
  };

  return (
    <div data-testid='frontpage-navbar' className='frontpage-navbar'>
      <LogoContainer />
      <div
        data-testid='frontpage-navbar-links'
        className='frontpage-navbar-links'
      >
        <ul>
          <li>
            Play
            <div data-testid='play-menu' className='play-menu'>
              <div
                data-testid='play-menu-options'
                className='play-menu-options'
              >
                <div
                  data-testid='play-item-with-friend'
                  className='play-item-with-friend'
                >
                  <img
                    data-testid='image-front-navbar-friends'
                    alt='programming'
                    src='images/friends.svg'
                    width='150px'
                    height='150px'
                  />
                  <h4>Play with a friend</h4>
                  <p>Challenge a friend to a 1v1 coding competition.</p>
                </div>
                <div
                  data-testid='play-item-with-random'
                  className='play-item-with-random'
                >
                  <img
                    data-testid='image-front-navbvar-random'
                    alt='programming'
                    src='images/random.svg'
                    width='150px'
                    height='150px'
                  />
                  <h4>Play with a random coder</h4>
                  <p>Compete with a random coder from around the globe.</p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div
        data-testid='frontpage-navbar-signin'
        className='frontpage-navbar-signin'
      >
        <Button
          type='button'
          onClick={loginRedirect}
          buttonStyle='btn--primary--signin'
          buttonSize='btn--small'
        >
          Sign in
        </Button>
      </div>
      <Button
        type='button'
        onClick={signUpRedirect}
        buttonStyle='btn--primary--normal'
        buttonSize='btn--small'
      >
        Sign up
      </Button>
    </div>
  );
}

export default FrontPageNavBar;
