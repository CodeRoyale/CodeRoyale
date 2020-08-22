import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import './LoginMain.css';

const LeftSecLogin = () => {
  // Go back to front page
  const history = useHistory();
  const cancelLogin = () => {
    let path = `/`;
    history.push(path);
  };

  return (
    <div className='left-login-container'>
      <CloseOutlined onClick={cancelLogin} className='left-login-close' />
      <div className='left-login-content'>
        <img
          className='left-login-image'
          alt='login'
          src='/images/login.svg'
          width='400px'
          height='400px'
        />
      </div>
    </div>
  );
};

export default LeftSecLogin;
