import React, { useRef } from 'react';
import { Whisper, Tooltip } from 'rsuite';

function CopyRoomCodeView({ room_id, admin }) {
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
      <div className='copy-room-code-admin-container'>
        {
          //admin
          'Mayur'
        }
      </div>
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
          <div>
            {
              //room_id
              'dasaca768fasc'
            }
          </div>
        </Whisper>
      </div>
    </div>
  );
}

export default CopyRoomCodeView;
