import React, { useRef } from 'react';
import { Whisper, Tooltip } from 'rsuite';

function CopyRoomCodeView({ /*room_id*/ config }) {
  let admin = 'Mayur';
  let room_id = 'Xp4Er13r79WfvDNQQt5';
  if (config !== null) {
    admin = config.admin;
  }
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
      <div className='copy-room-code-admin-container'>{admin}</div>
      <div
        className='copy-room-code-room_id-container'
        ref={copyTextRef}
        onClick={onClickCopyToClipboard}
      >
        <Whisper
          trigger='hover'
          placement='bottom'
          speaker={<Tooltip>Copy Room ID to Clipboard</Tooltip>}
        >
          <div>{room_id}</div>
        </Whisper>
      </div>
    </div>
  );
}

export default CopyRoomCodeView;
