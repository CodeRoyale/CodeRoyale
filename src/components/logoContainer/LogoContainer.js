import React from 'react';
import { useHistory } from 'react-router-dom';
import './LogoContainer.css';

function LogoContainer() {
  // Go to CodeRoyale
  const history = useHistory();
  const codeRoyale = () => {
    let path = `/`;
    history.push(path);
  };

  return (
    <div className='header-logo' onClick={codeRoyale}>
      <h2>CodeRoyale</h2>
    </div>
  );
}

export default LogoContainer;
