import React from 'react';
import copy from 'copy-to-clipboard';

function SharableLink(props) {
  const matchLink = props.matchLink;

  const onClickCopy = () => {
    copy(matchLink);
  };

  return (
    <div className='sharable-link'>
      <b>Match Link</b>
      <div className='match-link' onClick={onClickCopy}>
        <p>{matchLink}</p>
        <span class='tooltip-text'>Copy Link</span>
      </div>
    </div>
  );
}

export default SharableLink;
