import React, { useRef } from 'react';
import { Menu, Dropdown } from 'antd';

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
  const menu = (
    <Menu className='copy-room-code-menu'>
      <Menu.Item className='copy-room-code-menu-item'>
        <div onClick={onClickCopyToClipboard}>Copy to Clipboard</div>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className='copy-room-code'>
      <div className='copy-room-code-text'>
        <b>Room Code</b>
      </div>
      <Dropdown overlay={menu} placement='bottomCenter'>
        <div
          onClick={onClickCopyToClipboard}
          ref={copyTextRef}
          className='copy-room-code-room_id'
        >
          {room_id}
        </div>
      </Dropdown>
    </div>
  );
}

export default CopyRoomCodeView;
