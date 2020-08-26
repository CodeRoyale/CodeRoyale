import React from 'react';
import { useHistory } from 'react-router-dom';
import './FrontPageNavBar.css';
import Button from '../button/Button';
import LogoContainer from '../logoContainer/LogoContainer';

const FrontPageNavBar = () => {
  // Redirect to /signin
  const history = useHistory();
  const loginRedirect = () => {
    let path = `login`;
    history.push(path);
  };

  // Redirect for /signup
  // const signUpRedirect = () => {
  //   let path = `signup`;
  //   history.push(path);
  // };

  return (
    <div className='frontpage-navbar'>
      <header className='frontpage-navbar-header'>
        <LogoContainer />
        <nav>
          <ul className='frontpage-navlinks'>
            <li>
              <a href='https://github.com/CodeRoyale/codeRoyale-frontend/'>
                About
              </a>
            </li>
            <li>
              <a href='https://github.com/CodeRoyale/codeRoyale-frontend/'>
                FAQ
              </a>
            </li>
          </ul>
        </nav>
        <div>
          <a className='frontpage-nav-signup' href='/signup'>
            Sign up
          </a>
          <Button
            type='button'
            onClick={loginRedirect}
            buttonStyle='btn--primary--signin'
            buttonSize='btn--small'
          >
            Login
          </Button>
        </div>
      </header>
    </div>
  );
};

export default FrontPageNavBar;
