import React, { useRef } from 'react';
import Divider from '../../components/divider/Divider';
import { copyToClipboard } from '../../utils/copyToClipboard';
import { Icon, Alert } from 'rsuite';
import profileData from '../../utils/profileData';
import Chat from '../../components/chat/Chat';

function RoomRight({ room_id }) {
  const copyTextRef = useRef(null);
  const userName = profileData().userName;

  const onClickCopy = () => {
    copyToClipboard(copyTextRef);
    Alert.info('Room ID copied...');
  };
  return (
    <div>
      <div className='room-right-header'>
        <span style={{ fontSize: '25px' }}>{userName}</span>
        <div className='room-right-roomId'>
          <p ref={copyTextRef}>{room_id}</p>
          <div onClick={onClickCopy}>
            <Icon icon='copy' />
          </div>
        </div>
      </div>
      {/* <Divider /> */}
      <Chat />
    </div>
  );
}

export default RoomRight;
