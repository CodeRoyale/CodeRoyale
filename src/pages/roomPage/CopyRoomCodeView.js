import React, { useRef } from 'react';
import Button from '../../components/button/Button';

function CopyRoomCodeView({ room_id }) {
  const copyTextRef = useRef(null);
  const onClickCopyToClipboard = () => {
    var range = document.createRange();
    range.selectNode(copyTextRef.current);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
  };
  return (
    <div className='copy-room-code'>
      <div className='copy-room-code-text'>
        <b>Room Code</b>
      </div>
      <div ref={copyTextRef} className='copy-room-code-room_id'>
        {room_id}
      </div>
      <div className='copy-room-code-button'>
        <Button
          type='button'
          buttonStyle='btn--primary--normal'
          buttonSize='btn--medium'
          onClick={onClickCopyToClipboard}
        >
          Copy to Clipboard
        </Button>
      </div>
    </div>
  );
}

export default CopyRoomCodeView;
