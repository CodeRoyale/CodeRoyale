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
      <header>
        {/* <h2 className='frontpage-logo'>CodeRoyale</h2> */}
        <LogoContainer />
        <nav>
          <ul className='frontpage-navlinks'>
            <li>
              <a href='https://www.google.com/'>About</a>
            </li>
            <li>
              <a href='https://www.google.com/'>FAQ</a>
            </li>
          </ul>
        </nav>
        <div>
          <a className='frontpage-nav-signup' href='https://www.google.com/'>
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
