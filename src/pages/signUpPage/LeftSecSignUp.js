import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import './SignUpMain.css';

function LeftSecSignUp() {
  // Go back to front page
  const history = useHistory();
  const cancelSignup = () => {
    let path = `/`;
    history.push(path);
  };

  return (
    <div className='left-signup-container'>
      <CloseOutlined onClick={cancelSignup} className='left-signup-close ' />
      <div className='left-signup-content'>
        <img
          className='left-signup-image'
          alt='login'
          src='/images/signup.svg'
          width='350px'
          height='350px'
        />
      </div>
    </div>
  );
}

export default LeftSecSignUp;
