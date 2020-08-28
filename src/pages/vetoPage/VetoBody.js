import React from 'react';
import { Loader } from 'rsuite';
import './VetoMain.css';

const VetoBody = ({ isLoading }) => {
  let content = <div className='veto-body'>Veto Body</div>;

  if (isLoading) {
    content = (
      <div className='veto-body-loading'>
        <Loader size='md' content='Fetching veto questions...' />
      </div>
    );
  }

  return content;
};

export default VetoBody;
